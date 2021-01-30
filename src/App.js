import { useState, useEffect } from 'react';

import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import ContactFilter from './components/ContactFilter/ContactFilter';

import shortid from 'shortid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const generateContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      toast(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      toast(`${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      toast.info('Enter the name and phone number!');
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
      toast.error('Enter the correct phone number!');
    } else {
      setContacts(prevContacts =>
        [contact, ...prevContacts].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        }),
      );
    }
  };

  const removeContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const makeVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={generateContact} />
      <h2>Contacts</h2>
      {contacts.length > 1 && (
        <ContactFilter value={filter} onChange={changeFilter} />
      )}
      {contacts.length > 0 ? (
        <ContactList
          contacts={makeVisibleContacts()}
          onDeleteContact={removeContact}
        />
      ) : (
        <p>Your phonebook is empty. Please add contact.</p>
      )}
      <ToastContainer autoClose={3700} />
    </Container>
  );
}

export default App;

import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import {
  getVisibleContacts,
  getContacts,
} from '../../redux/contacts/contacts-selectors';
import popTransition from '../../utils/transitions/pop.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import s from './ContactList.module.css';

function ContactList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(getVisibleContacts);
  const contacts = useSelector(getContacts);

  return (
    <>
      <CSSTransition
        in={!contacts.length}
        timeout={250}
        classNames={popTransition}
        mountOnEnter
        unmountOnExit
      >
        <p>Your phonebook is empty. Please add contact.</p>
      </CSSTransition>
      <TransitionGroup component="ul" className={s.list}>
        {visibleContacts.map(({ id, name, number }) => (
          <CSSTransition
            key={id}
            timeout={250}
            mountOnEnter
            unmountOnExit
            classNames={popTransition}
          >
            <li className={s.item}>
              <p className={s.data}>
                <p>{name}</p>
                <p>{number}</p>
              </p>
              <button
                className={s.button}
                type="button"
                onClick={() => dispatch(deleteContact(id))}
              ></button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}

export default ContactList;

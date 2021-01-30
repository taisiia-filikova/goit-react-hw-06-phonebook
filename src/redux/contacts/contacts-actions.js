import { createAction } from '@reduxjs/toolkit';
import { ADD_CONTACT, DELETE_CONTACT, FILTER_CONTACT } from './contacts-types';
import shortid from 'shortid';

export const addContact = createAction(ADD_CONTACT, (name, number) => ({
  payload: {
    id: shortid.generate(),
    name,
    number,
  },
}));
export const deleteContact = createAction(DELETE_CONTACT);
export const filterContact = createAction(FILTER_CONTACT);

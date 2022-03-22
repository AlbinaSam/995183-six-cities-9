import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('changeCity', (value) => ({payload: value}));

export const addOffers = createAction('addOffers', (value) => ({payload: value}));

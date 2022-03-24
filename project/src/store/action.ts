import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('changeCity', (value) => ({payload: value}));

export const loadOffers = createAction('loadOffers', (value) => ({payload: value}));

export const loadFavotiteOffers = createAction('loadFavoriteOffers', (value) => ({payload: value}));

import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction('changeCity', (value) => ({payload: value}));

export const loadOffers = createAction('loadOffers', (value) => ({payload: value}));

export const loadFavotiteOffers = createAction('loadFavoriteOffers', (value) => ({payload: value}));

export const requireAuthorization = createAction('requireAuthorization', (value) => ({payload: value}));

export const setUserEmail = createAction('addUserEmail', (value) => ({payload: value}));

export const setUserAvatarUrl = createAction('addUserAvatarUrl', (value) => ({payload: value}));

export const redirectToRoute = createAction('redirectToRoute', (value) => ({payload: value}));

export const setReviews = createAction('setReview', (value) => ({payload: value}));

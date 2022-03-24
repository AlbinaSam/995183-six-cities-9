import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers, loadFavotiteOffers} from './action';
import {Offer} from '../types/offer';
import {AuthorizationStatus} from '../consts';

type InitialState = {
  city: string;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  favoriteOffers: Offer[];
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  favoriteOffers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadFavotiteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    });
});

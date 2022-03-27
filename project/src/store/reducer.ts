import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers, loadFavotiteOffers, requireAuthorization, setUserEmail, setUserAvatarUrl} from './action';
import {Offer} from '../types/offer';
import {AuthorizationStatus} from '../consts';

type InitialState = {
  city: string;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
  favoriteOffers: Offer[];
  userEmail: string;
  avatarUrl: string;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  favoriteOffers: [],
  userEmail: '',
  avatarUrl: '',
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(setUserAvatarUrl, (state, action) => {
      state.avatarUrl = action.payload;
    });
});

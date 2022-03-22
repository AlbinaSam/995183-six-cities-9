import {createReducer} from '@reduxjs/toolkit';
import {changeCity, addOffers} from './action';

const initialState = {
  city: 'Paris',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(addOffers, (state, action) => {
      state.offers = action.payload;
    });
});

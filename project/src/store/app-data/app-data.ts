import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { Offer } from '../../types/offer';
import {AppData} from '../../types/state';
import { updateOffersArray } from '../../utils';

const initialState: AppData = {
  offers: [],
  isDataLoaded: false,
  favoriteOffers: [],
  currentOffer: null,
  reviews: [],
  nearbyOffers: [],
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadFavotiteOffers: (state, action) => {
      state.favoriteOffers = action.payload;
    },
    setCurrentOffer: (state, action) => {
      state.currentOffer = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    updateOffers: (state, action) => {

      const nearbyOfferIndex = state.nearbyOffers.findIndex((offer: Offer) => offer.id === action.payload.id);

      if (nearbyOfferIndex >= 0) {
        state.nearbyOffers = updateOffersArray(state.nearbyOffers, action.payload, nearbyOfferIndex);
      }

      if (!action.payload.isFavorite) {
        state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
      }

      const offerIndex = state.offers.findIndex((offer: Offer) => offer.id === action.payload.id);

      state.offers = updateOffersArray(state.offers, action.payload, offerIndex);
    },
  },
});

export const {loadOffers, loadFavotiteOffers, setCurrentOffer, setReviews, updateOffers, loadNearbyOffers} = appData.actions;

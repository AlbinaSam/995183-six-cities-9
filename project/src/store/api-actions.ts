import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, store } from '../store/index';
import { APIRoute } from '../consts';
import { loadOffers, loadFavotiteOffers } from './action';
import {Offer} from '../types/offer';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffers',
  async () => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    store.dispatch(loadOffers(data));
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk(
  'fetchFavoriteOffers',
  async () => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    store.dispatch(loadFavotiteOffers(data));
  },
);

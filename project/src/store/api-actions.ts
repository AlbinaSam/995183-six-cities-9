import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, store } from '../store/index';
import { APIRoute, AuthorizationStatus } from '../consts';
import { loadOffers, loadFavotiteOffers, requireAuthorization, redirectToRoute, setReviews } from './action';
import {Offer} from '../types/offer';
import {Review} from '../types/reviews';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { NewReviewData } from '../types/new-review-data';
import {saveToken, removeToken} from '../services/token';
import {saveUserEmail, removeUserEmail} from '../services/user-email';
import {saveUserAvatarUrl, removeUserAvatarUrl} from '../services/user-avatar-url';
import { AppRoute } from '../consts';
import { errorHandler } from '../services/error-handler';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk(
  'fetchFavoriteOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      store.dispatch(loadFavotiteOffers(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const checkAuthStatusAction = createAsyncThunk(
  'checkAuthStatus',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      saveUserEmail(data.email);
      saveUserAvatarUrl(data.avatarUrl);
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandler(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      removeToken();
      removeUserEmail();
      removeUserAvatarUrl();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'fetchReviews',
  async (offerId : string | undefined) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
      store.dispatch(setReviews(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const addReviewAction = createAsyncThunk(
  'addReview',
  async ({comment, rating, offerId}: NewReviewData) => {
    try {
      const {data} = await api.post<Review[]>(`${APIRoute.Reviews}/${offerId}`, {comment, rating});
      store.dispatch(setReviews(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

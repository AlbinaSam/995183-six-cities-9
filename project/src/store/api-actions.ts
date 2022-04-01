import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus, StorageKeyName } from '../consts';
import { redirectToRoute } from './action';
import { requireAuthorization } from './user-process/user-process';
import { loadFavotiteOffers, loadOffers, setReviews, updateOffers, loadNearbyOffers, setCurrentOffer } from './app-data/app-data';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { NewReviewData } from '../types/new-review-data';
import { FavoriteStatusData } from '../types/favorite-status-data';
import { AppRoute } from '../consts';
import { errorHandler } from '../services/error-handler';
import {AxiosInstance} from 'axios';
import { AppDispatch } from '../types/state';
import { setItem, removeItem } from '../services/storage-service';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'fetchOffers',
  async (_, {extra, dispatch}) => {
    const {api} = extra;
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'fetchFavoriteOffers',
  async (_, {extra, dispatch}) => {
    const {api} = extra;
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      dispatch(loadFavotiteOffers(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const checkAuthStatusAction = createAsyncThunk<void, undefined, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'checkAuthStatus',
  async (_, {extra, dispatch}) => {
    const {api} = extra;
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'login',
  async ({login: email, password}, {extra, dispatch}) => {
    const {api} = extra;
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      setItem(StorageKeyName.AUTH_TOKEN_KEY_NAME, data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      setItem(StorageKeyName.USER_EMAIL_KEY_NAME, data.email);
      setItem(StorageKeyName.USER_AVATAR_KEY_NAME, data.avatarUrl);
      dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandler(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'logout',
  async (_, {extra, dispatch}) => {
    const {api} = extra;
    try {
      await api.delete(APIRoute.Logout);
      removeItem(StorageKeyName.AUTH_TOKEN_KEY_NAME);
      removeItem(StorageKeyName.USER_EMAIL_KEY_NAME);
      removeItem(StorageKeyName.USER_AVATAR_KEY_NAME);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string | undefined, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'fetchReviews',
  async (offerId, {extra, dispatch}) => {
    const {api} = extra;
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
      dispatch(setReviews(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string | undefined, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'fetchNearbyOffers',
  async (offerId, {extra, dispatch}) => {
    const {api} = extra;
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(loadNearbyOffers(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const addReviewAction = createAsyncThunk<void, NewReviewData, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'addReview',
  async ({comment, rating, offerId}, {extra, dispatch}) => {
    const {api} = extra;
    try {
      const {data} = await api.post<Review[]>(`${APIRoute.Reviews}/${offerId}`, {comment, rating});
      dispatch(setReviews(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<void, FavoriteStatusData, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'changeFavoriteStatus',
  async({offerId, offerStatus}, {extra, dispatch}) => {
    const {api} = extra;
    try {
      const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${offerStatus}`);
      dispatch(updateOffers(data));
      dispatch(setCurrentOffer(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

export const fetchCurrentOfferAction = createAsyncThunk<void, string | undefined, {
  extra: {
    api: AxiosInstance
  },
  dispatch: AppDispatch,
}>(
  'fetchCurrentoffer',
  async(offerId, {extra, dispatch}) => {
    const {api} = extra;
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setCurrentOffer(data));
    } catch (error) {
      errorHandler(error);
    }
  },
);

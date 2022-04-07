import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthStatusAction, fetchOffersAction, fetchFavoriteOffersAction, loginAction, logoutAction, fetchReviewsAction, fetchNearbyOffersAction, addReviewAction, changeFavoriteStatusAction, fetchCurrentOfferAction } from './api-actions';
import { requireAuthorization } from './user-process/user-process';
import { APIRoute, StorageKeyName } from '../consts';
import { State } from '../types/state';
import {AuthData} from '../types/auth-data';
import {FavoriteStatusData} from '../types/favorite-status-data';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { NewReviewData } from '../types/new-review-data';
import {mockOffer, mockReview, mockNewReview} from '../test-mocks';
import { loadFavotiteOffers, loadNearbyOffers, loadOffers, setCurrentOffer, setReviews, updateOffers } from './app-data/app-data';

const mockOffers: Offer[] = [mockOffer];

const mockReviews: Review[] = [mockReview];

describe('Async actions', () => {

  const extra = {
    api: createAPI(),
  };
  const mockAPI = new MockAdapter(extra.api);
  const middlewares = [thunk.withExtraArgument({api: extra.api})];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthStatusAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret', email: 'test@test.ru', avatarUrl: 'img/1.png'});

    const store = mockStore();

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(3);
    expect(Storage.prototype.setItem).toBeCalledWith(StorageKeyName.AuthToken, 'secret');
    expect(Storage.prototype.setItem).toBeCalledWith(StorageKeyName.UserEmail, 'test@test.ru');
    expect(Storage.prototype.setItem).toBeCalledWith(StorageKeyName.UserAvatar, 'img/1.png');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(3);
    expect(Storage.prototype.removeItem).toBeCalledWith(StorageKeyName.AuthToken);
    expect(Storage.prototype.removeItem).toBeCalledWith(StorageKeyName.UserEmail);
    expect(Storage.prototype.removeItem).toBeCalledWith(StorageKeyName.UserAvatar);
  });

  it('should dispatch Load_Offers when GET /hotels', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch Load_Favorite_Offers when GET /favorite', async () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavotiteOffers.toString());
  });

  it('should dispatch Load_Nearby_Offers when GET /hotels/{hotelId}/nearby', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${'1'}/nearby`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchNearbyOffersAction('1'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadNearbyOffers.toString());
  });

  it('should dispatch Set_Reviews when GET /comments/{hotelId}', async () => {
    mockAPI
      .onGet(`${APIRoute.Reviews}/${'1'}`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction('1'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setReviews.toString());
  });

  it('should dispatch Set_Reviews when POST /comments/{hotelId}', async () => {
    const {comment, rating, offerId}: NewReviewData = mockNewReview;

    mockAPI
      .onPost(`${APIRoute.Reviews}/${offerId}`)
      .reply(200, mockReview);

    const store = mockStore();

    await store.dispatch(addReviewAction({comment, rating, offerId}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setReviews.toString());
  });

  it('should dispatch Set_Current_Offer when GET /hotels/{hotelId}', async () => {
    const offer: Offer = mockOffer;
    mockAPI
      .onGet(`${APIRoute.Offers}/${'1'}`)
      .reply(200, offer);

    const store = mockStore();

    await store.dispatch(fetchCurrentOfferAction('1'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setCurrentOffer.toString());
  });

  it('should dispatch Update_Offer and Set_Current_Offer when POST /favorite/{hotelId}/{status}', async () => {
    const offer: Offer = mockOffer;
    const statusData: FavoriteStatusData = {
      offerId: 1,
      offerStatus: 1,
    };

    mockAPI
      .onPost(`${APIRoute.Favorite}/${statusData.offerId}/${statusData.offerStatus}`)
      .reply(200, offer);

    const store = mockStore();

    await store.dispatch(changeFavoriteStatusAction(statusData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(updateOffers.toString());
    expect(actions).toContain(setCurrentOffer.toString());
  });

});

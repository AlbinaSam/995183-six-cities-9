import { NameSpace } from '../../consts';
import {State} from '../../types/state';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;

export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;

export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.Data].currentOffer;

export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;

export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Data].nearbyOffers;

import {Offer, City} from './types/offer';

import {MAX_RATING, MAX_PERCENT_RATING, SortingOptionsValues} from './consts';

export const countRatingPercent = (rating: number) => rating * MAX_PERCENT_RATING / MAX_RATING;

export const filterOffers = (offers: Offer[], currentCity: string) => offers.filter((offer) => offer.city.name === currentCity);

export const createCitiesDictionary = (offers: Offer[]) =>
  offers.map((offer) => offer.city)
    .reduce((acc: {[index: string]: City}, citiesItem) => {
      acc[citiesItem.name] = citiesItem;
      return acc;
    }, {});

const sortByPriceDown = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;

const sortByPriceUp = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;

const sortByRating = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;

export const sortOffers = (offers: Offer[], currentSortOption: string | undefined) => {
  switch(currentSortOption) {
    case SortingOptionsValues.Popular:
      return offers;
    case SortingOptionsValues.PriceDown:
      return [...offers].sort(sortByPriceDown);
    case SortingOptionsValues.PriceUp:
      return [...offers].sort(sortByPriceUp);
    case SortingOptionsValues.TopRated:
      return [...offers].sort(sortByRating);
    default:
      return offers;
  }
};

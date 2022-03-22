import {MAX_RATING, MAX_PERCENT_RATING} from './consts';

export const countRatingPercent = (rating) => rating * MAX_PERCENT_RATING / MAX_RATING;

export const filterOffers = (offers, currentCity) => offers.filter((offer) => offer.city.name === currentCity);

export const createCitiesDictionary = (offers) =>
  offers.map((offer) => offer.city)
    .reduce((acc, citiesItem) => {
      acc[citiesItem.name] = citiesItem;
      return acc;
    }, {});

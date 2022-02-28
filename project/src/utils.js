import {MAX_RATING, MAX_PERCENT_RATING} from './consts';

export const countRatingPercent = (rating) => rating * MAX_PERCENT_RATING / MAX_RATING;

export const createOffersDictionary = (cities, offers) =>
  cities.map((city) => ({
    [city]: offers.reduce((acc, offer) => {
      if (city === offer.city.name) {
        acc.push(offer);
      }
      return acc;
    }, []),
  }),
  );

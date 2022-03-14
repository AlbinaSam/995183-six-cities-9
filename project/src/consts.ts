export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Property = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const MAX_RATING = 5;

export const MAX_PERCENT_RATING = 100;

export const MAX_PHOTOS_AMOUNT = 6;

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const MIN_CHARACTERS_NUMBER = 50;

export const REVIEW_TITLES = ['terribly', 'badly', 'not bad', 'good', 'perfect'];

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

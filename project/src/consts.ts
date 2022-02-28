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

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const MIN_CHARACTERS_NUMBER = 50;

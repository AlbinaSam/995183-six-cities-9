export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Property = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const SortingOptionsValues = {
  Popular: 'Popular',
  PriceUp: 'Price: low to high',
  PriceDown: 'Price: high to low',
  TopRated: 'Top rated first',
};

export const MAX_RATING = 5;

export const MAX_PERCENT_RATING = 100;

export const MAX_PHOTOS_AMOUNT = 6;

export const MAX_REVIEWS_AMOUNT = 10;

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const MIN_CHARACTERS_NUMBER = 50;

export const MAX_CHARACTERS_NUMBER = 300;

export const REVIEW_TITLES = ['terribly', 'badly', 'not bad', 'good', 'perfect'];

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export enum MapClasses {
  MainPage = 'cities__map',
  PropertyPage = 'property__map'
}

export const propertyCardClasses = {
  mainPage: {
    placeCardClass: 'cities__place-card',
    imgWrapperClass: 'cities__image-wrapper',
  },
  propertyPage: {
    placeCardClass: 'near-places__card',
    imgWrapperClass: 'near-places__image-wrapper',
  },
};

export enum APIRoute {
  Offers = '/hotels',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
}

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  AppUsing = 'APP_USING'
}

export enum StorageKeyName {
  AuthToken = 'six-cities-token',
  UserAvatar = 'six-cities-user-avatar-url',
  UserEmail = 'six-cities-user-email',
}

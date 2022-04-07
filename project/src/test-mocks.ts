import {address, datatype, image, lorem, name, date} from 'faker';

export const mockCityName = 'Paris';

export const mockOffer = {
  city: {
    name: mockCityName,
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(15),
    },
  },
  previewImage: image.image(),
  images: [image.image(), image.image()],
  title: lorem.sentence(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(5),
  type: lorem.word(),
  bedrooms: datatype.number(5),
  maxAdults: datatype.number(5),
  price: datatype.number(5000),
  goods: [lorem.word(), lorem.word()],
  host: {
    id: datatype.number(500),
    name: lorem.word(),
    isPro: datatype.boolean(),
    avatarUrl: image.image(),
  },
  description: lorem.sentence(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(15),
  },
  id: datatype.number(500),
};

export const mockReview = {
  id: datatype.number(500),
  user: {
    id: datatype.number(500),
    isPro: datatype.boolean(),
    name: name.findName(),
    avatarUrl: image.image(),
  },
  rating: datatype.number(5),
  comment: lorem.sentence(),
  date: date.recent().toISOString(),
};

export const mockNewReview = {
  comment: lorem.sentence(),
  rating: datatype.number(5),
  offerId: String(datatype.number(500)),
};

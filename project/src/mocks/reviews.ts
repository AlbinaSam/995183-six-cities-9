import {Review} from '../types/reviews';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 17,
      isPro: false,
      name: 'Emely',
      avatarUrl: 'https://9.react.pages.academy/static/avatar/8.jpg',
    },
    rating: 4,
    comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
    date: '2021-01-28T15:13:26.371Z',
  },
  {
    id: 2,
    user: {
      id: 14,
      isPro: true,
      name: 'Corey',
      avatarUrl: 'https://9.react.pages.academy/static/avatar/5.jpg',
    },
    rating: 2,
    comment:
      'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2022-07-28T15:13:26.371Z',
  },
];

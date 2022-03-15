import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import {nearbyOffers} from './mocks/nearby-offers';

ReactDOM.render(
  <React.StrictMode>
    <App offers={offers} reviews={reviews} nearbyOffers={nearbyOffers}/>
  </React.StrictMode>,
  document.getElementById('root'));

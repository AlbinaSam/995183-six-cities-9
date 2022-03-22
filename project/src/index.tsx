import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {store} from './store';
import {reviews} from './mocks/reviews';
import {nearbyOffers} from './mocks/nearby-offers';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={reviews} nearbyOffers={nearbyOffers}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

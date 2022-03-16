import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {Offer} from '../../types/offer';
import {Review} from '../../types/reviews';

type AppScreenProps = {
  offers: Offer[];
  reviews: Review[];
  nearbyOffers: Offer[];
}

function App({offers, reviews, nearbyOffers}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}
          element={<MainScreen offers={offers}/>}
        >
        </Route>
        <Route path={AppRoute.Login}
          element={<LoginScreen />}
        >
        </Route>
        <Route path={AppRoute.Property}
          element={<PropertyScreen offers={offers} reviews={reviews} nearbyOffers={nearbyOffers}/>}
        >
        </Route>
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesScreen offers={offers} />
            </PrivateRoute>
          }
        >
        </Route>
        <Route path='*' element={<NotFoundScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

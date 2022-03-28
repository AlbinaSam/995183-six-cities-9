import {Routes, Route} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import {useEffect} from 'react';
import { fetchOffersAction, checkAuthStatusAction } from '../../store/api-actions';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-router/history-router';

function App(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuthStatusAction());
  }, [dispatch]);

  const {authorizationStatus , isDataLoaded} = useAppSelector((state) => state);

  if ((authorizationStatus === AuthorizationStatus.Unknown) || !isDataLoaded) {
    return (
      <LoadingScreen></LoadingScreen>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root}
          element={<MainScreen/>}
        >
        </Route>
        <Route path={AppRoute.Login}
          element={<LoginScreen />}
        >
        </Route>
        <Route path={AppRoute.Property}
          element={<PropertyScreen/>}
        >
        </Route>
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen/>
            </PrivateRoute>
          }
        >
        </Route>
        <Route path='*' element={<NotFoundScreen />}></Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;

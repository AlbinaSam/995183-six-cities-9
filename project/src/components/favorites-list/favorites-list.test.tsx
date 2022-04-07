import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute, CITIES } from '../../consts';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mockOffer } from '../../test-mocks';
import FavoritesList from './favorites-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const offers = [mockOffer];

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <FavoritesList favoriteOffers={offers} cities={CITIES}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('city-link')).toBeInTheDocument();
  });

  it('should redirect to root when user clicked city name', () => {
    history.push('/fake');
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='*'
              element={<FavoritesList favoriteOffers={offers} cities={CITIES} />}
            />
            <Route
              path={AppRoute.Root}
              element={<h1>Main Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('city-link'));
    expect(screen.getByText('Main Screen')).toBeInTheDocument();
  });
});

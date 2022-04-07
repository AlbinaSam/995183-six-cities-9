import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { mockOffer } from '../../test-mocks';
import FavoritesScreen from './favorites-screen';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const offers = [mockOffer];

describe('Component: FavoritesScreen', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('should render correctly', () => {

    render(
      <Provider store={mockStore({
        DATA: {favoriteOffers: offers},
        USER: {authorizationStatus: AuthorizationStatus.Unknown},
      })}
      >
        <HistoryRouter history={history}>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should render FavoritesEmpty Screen when offers array is empty', () => {
    render(
      <Provider store={mockStore({
        DATA: {favoriteOffers: []},
        USER: {authorizationStatus: AuthorizationStatus.Unknown},
      })}
      >
        <HistoryRouter history={history}>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});

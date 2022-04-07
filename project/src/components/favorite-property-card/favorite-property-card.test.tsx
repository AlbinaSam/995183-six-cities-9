import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../consts';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import FavoritePropertyCard from './favorite-property-card';
import { mockOffer } from '../../test-mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const offer = mockOffer;

describe('Component: FavoritePropertyCard', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <FavoritePropertyCard id={'1'} offer={offer}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('favorites-card')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button');
    expect(screen.getByTestId('title-link')).toBeInTheDocument();
  });

  it('should redirect when user clicked image of property', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='*'
              element={<FavoritePropertyCard id={(offer.id.toString())} offer={offer}/>}
            />
            <Route
              path={AppRoute.Property}
              element={<h1>Property Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('img-link'));

    expect(screen.getByText('Property Screen')).toBeInTheDocument();
  });
});

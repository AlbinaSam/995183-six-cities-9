import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import HeaderNavAuth from './header-nav-auth';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: HeaderNavAuth', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <HeaderNavAuth />
        </HistoryRouter>
      </Provider>,
    );

    const linkElement = screen.getByText('Sign out');

    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect to Favorite Screen when user clicked on user details', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='*'
              element={<HeaderNavAuth />}
            />
            <Route
              path={AppRoute.Favorites}
              element={<h1>Favorites Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('profile-link'));

    expect(screen.getByText('Favorites Screen')).toBeInTheDocument();
  });
});

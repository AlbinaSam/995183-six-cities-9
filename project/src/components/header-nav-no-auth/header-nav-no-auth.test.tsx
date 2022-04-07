import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../consts';
import userEvent from '@testing-library/user-event';
import HeaderNavNoAuth from './header-nav-no-auth';
import { Route, Routes } from 'react-router-dom';

const history = createMemoryHistory();

describe('Component: HeaderNavNoAuth', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <HeaderNavNoAuth />
      </HistoryRouter>,
    );

    const linkElement = screen.getByText('Sign in');

    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect when user clicked "Sign in" link', () => {

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='*'
            element={<HeaderNavNoAuth />}
          />
          <Route
            path={AppRoute.Login}
            element={<h1>Login Screen</h1>}
          />
        </Routes>
      </HistoryRouter>,
    );

    userEvent.click(screen.getByText('Sign in'));

    expect(screen.getByText('Login Screen')).toBeInTheDocument();

  });
});

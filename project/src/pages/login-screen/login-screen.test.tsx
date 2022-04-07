import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute } from '../../consts';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import LoginScreen from './login-screen';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: LoginScreen', () => {
  beforeEach(() => {
    history.push(AppRoute.Login);
  });

  it('should render correctly', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveClass('login__submit');

    userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.ru');
    userEvent.type(screen.getByPlaceholderText('Password'), '123456');

    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('should redirect when user clicked image of property', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<LoginScreen />}
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

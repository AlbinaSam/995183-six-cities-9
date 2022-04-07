import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../consts';
import { mockReview } from '../../test-mocks';
import Reviews from './reviews';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const reviews = [mockReview];

describe('Component: Reviews', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore({
        USER: { authorizationStatus: AuthorizationStatus.Auth },
        DATA: { reviews: reviews },
      })}
      >
        <HistoryRouter history={history}>
          <Reviews />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});

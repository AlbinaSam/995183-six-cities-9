import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ReviewForm', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Submit');

    userEvent.type(screen.getByTestId('review'), 'test');

    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
  });
});

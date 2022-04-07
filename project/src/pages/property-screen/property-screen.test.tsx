import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../consts';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockOffer, mockReview } from '../../test-mocks';
import PropertyScreen from './property-screen';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const offer = mockOffer;
const nearbyOffers = [mockOffer];
const reviews = [mockReview];
const offers = [mockOffer];

describe('Component: PropertyScreen', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({
        DATA: {offers: offers, currentOffer: offer, nearbyOffers: nearbyOffers, reviews: reviews},
        USER: {authorizationStatus: AuthorizationStatus.Unknown},
      })}
      >
        <HistoryRouter history={history}>
          <PropertyScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('property-page')).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
  });
});

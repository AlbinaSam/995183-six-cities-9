import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { mockOffer, mockCityName } from '../../test-mocks';
import PlacesContainer from './places-container';
import { AuthorizationStatus } from '../../consts';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const offers = [mockOffer];

describe('Component: PlacesContainer', () => {
  it('should render correctly', () => {

    const currentCity = mockCityName;

    render(
      <Provider store={mockStore({
        APP_USING: {city: currentCity},
        USER: { authorizationStatus: AuthorizationStatus.Unknown },
        DATA: {offers: offers}})}
      >
        <HistoryRouter history={history}>
          <PlacesContainer filteredOffers={offers}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/to stay in/i)).toHaveTextContent(currentCity);
  });
});

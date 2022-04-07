import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { MapClasses } from '../../consts';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockOffer, mockCityName } from '../../test-mocks';
import Map from './map';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const offer = mockOffer;
const offers = [offer];

describe('Component: Map', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({
        DATA: {offers: offers},
      })}
      >
        <HistoryRouter history={history}>
          <Map
            className={MapClasses.MainPage}
            city={mockCityName}
            points={offers}
            activeOffer={offer}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});

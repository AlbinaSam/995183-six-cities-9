import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import NoPlacesAvailable from './no-places-available';
import { mockCityName } from '../../test-mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: NoPlacesAvailable', () => {
  it('should render corrrectly', () => {

    const currentCity = mockCityName;

    render(
      <Provider store={mockStore({APP_USING: {city: currentCity}})}>
        <HistoryRouter history={history}>
          <NoPlacesAvailable />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find/i)).toHaveTextContent(currentCity);
  });
});

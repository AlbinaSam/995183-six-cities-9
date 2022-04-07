import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import LocationList from './location-list';
import { mockCityName } from '../../test-mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: LocationList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({APP_USING: {city: mockCityName}})}>
        <HistoryRouter history={history}>
          <LocationList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('tabs-list')).toBeInTheDocument();
  });
});

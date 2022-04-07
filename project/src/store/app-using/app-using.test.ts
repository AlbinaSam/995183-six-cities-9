import { appUsing } from './app-using';
import { changeCity } from './app-using';
import {address} from 'faker';

describe('Reducer: appUsing', () => {
  it('without additional parametrs should return initial state', () => {
    expect(appUsing.reducer(void 0, {type: 'UNKNOWN ACTION'}))
      .toEqual({city: 'Paris'});
  });

  it ('should change current city by a given value', () => {
    const state = {city: 'Paris'};
    const mockCity = address.cityName();

    expect(appUsing.reducer(state, changeCity(mockCity)))
      .toEqual({city: mockCity});
  });
});

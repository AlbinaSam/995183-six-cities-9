import { renderHook } from '@testing-library/react-hooks';
import { Map } from 'leaflet';
import useMap from './useMap';
import { mockOffer, mockCityName } from '../../test-mocks';

const offers = [mockOffer];

describe('Hook: useMap', () => {
  it('should return Map', () => {
    const target = document.createElement('div');

    const { result } = renderHook(() =>
      useMap({current: target}, mockCityName, offers),
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });
});

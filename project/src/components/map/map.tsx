import {Icon, Marker} from 'leaflet';
import {Offer} from '../../types/offer';
import {useRef, useEffect, memo} from 'react';
import useMap from '../../hooks/useMap/useMap';
import {useAppSelector} from '../../hooks/index';
import { getOffers } from '../../store/app-data/selectors';
import {MarkerUrl, MapClasses} from '../../consts';

type MapProps = {
  className: MapClasses;
  mapStyle?: {width: string, margin: string};
  city: string;
  points: Offer[];
  activeOffer: Offer | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: MarkerUrl.Default,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: MarkerUrl.Current,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({className, city, points, activeOffer, mapStyle}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const offers = useAppSelector(getOffers);
  const map = useMap(mapRef, city, offers);

  useEffect(() => {

    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker.setIcon(
          activeOffer !== null && point.id === activeOffer.id
            ? currentCustomIcon
            : defaultCustomIcon)
          .addTo(map);
      });
    }

  }, [map, points, activeOffer]);

  return (
    <section ref={mapRef} className={`${className} map`} style={mapStyle} data-testid="map"></section>
  );
}

export default memo(Map) ;

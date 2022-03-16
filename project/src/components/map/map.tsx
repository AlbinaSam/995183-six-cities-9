import {Icon, Marker} from 'leaflet';
import {Offer, City} from '../../types/offer';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/useMap/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MapClasses} from '../../consts';

type MapProps = {
  mapClassName: MapClasses;
  mapStyle?: {width: string, margin: string};
  city: City;
  points: Offer[];
  activeOffer: Offer | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({mapClassName, mapStyle, city, points, activeOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

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
    <section ref={mapRef} className={`${mapClassName} map`} style={mapStyle}></section>
  );
}

export default Map;

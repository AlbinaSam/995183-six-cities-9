import {Icon, Marker} from 'leaflet';
import {Offer, City} from '../../types/offer';
import {useRef, useEffect} from 'react';
import useMap from '../../hooks/useMap/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../consts';

type MapProps = {
  city: City;
  offers: Offer[];
  activeOffer: number | null;
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

function Map({city, offers, activeOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {

    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          activeOffer !== undefined && offer.id === activeOffer
            ? currentCustomIcon
            : defaultCustomIcon)
          .addTo(map);
      });
    }

  }, [map, offers, activeOffer]);

  return (
    <section ref={mapRef} className="cities__map map" style={{height: '100%'}}></section>
  );
}

export default Map;

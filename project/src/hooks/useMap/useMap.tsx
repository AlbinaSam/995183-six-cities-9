import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {MutableRefObject, useEffect, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import { Offer } from '../../types/offer';
import {createCitiesDictionary} from '../../utils';


function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: string, offers: Offer[]): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  const citiesDictionary = createCitiesDictionary(offers);

  const currentCity = citiesDictionary[city];

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: currentCity.location.latitude,
          lng: currentCity.location.longitude,
        },
        zoom: currentCity.location.zoom,
      });

      const layer = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

      instance.addLayer(layer);

      setMap(instance);
    }

  }, [mapRef, map, city, currentCity.location.latitude, currentCity.location.longitude, currentCity.location.zoom]);

  return map;

}

export default useMap;

import { CITIES } from '../../consts';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {changeCity} from '../../store/action';

function LocationsList(): JSX.Element {

  const currentCity = useAppSelector((state) => state.city);

  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li key={city} className="locations__item">
          <a onClick={(evt) => {
            evt.preventDefault();
            dispatch(changeCity(city));
          }} className={`locations__item-link ${city === currentCity ? 'tabs__item tabs__item--active' : ''}`} href="/"
          >
            <span>{city}</span>
          </a>
        </li>
      ),
      )}
    </ul>
  );
}

export default LocationsList;

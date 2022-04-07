import FavoritePropertyCard from '../favorite-property-card/favorite-property-card';
import { filterOffers } from '../../utils';
import { AppRoute } from '../../consts';
import { Offer } from '../../types/offer';
import { useAppDispatch } from '../../hooks/index';
import { changeCity } from '../../store/app-using/app-using';
import { useNavigate } from 'react-router-dom';

type FavoriteListProps = {
  favoriteOffers: Offer[];
  cities: string[];
}

function FavoritesList({favoriteOffers, cities}: FavoriteListProps): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (city: string) => {
    dispatch(changeCity(city));
    navigate(AppRoute.Root);
  };

  return (
    <ul className="favorites__list">
      {cities.map((city) => {
        const currentCityOffers = filterOffers(favoriteOffers, city);
        if (currentCityOffers.length > 0) {
          return (
            <li key={city} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a onClick={(evt) => {
                    evt.preventDefault();
                    handleClick(city);
                  }} className="locations__item-link" href="/" data-testid="city-link"
                  >
                    <span>{city}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {currentCityOffers.map((offer) => <FavoritePropertyCard key={offer.id} id={offer.id.toString()} offer={offer}/>)}
              </div>
            </li>
          );
        }

        return '';
      })}
    </ul>
  );
}

export default FavoritesList;

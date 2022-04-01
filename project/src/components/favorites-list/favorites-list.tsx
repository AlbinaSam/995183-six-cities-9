import FavoritePropertyCardsList from '../../components/favorite-property-cards-list/favorite-property-cards-list';
import { filterOffers } from '../../utils';
import { AppRoute, CITIES } from '../../consts';
import { Offer } from '../../types/offer';
import { useAppDispatch } from '../../hooks/index';
import { changeCity } from '../../store/app-using/app-using';
import { useNavigate } from 'react-router-dom';

type FavoriteListProps = {
  favoriteOffers: Offer[];
}

function FavoritesList({favoriteOffers}: FavoriteListProps): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (city: string) => {
    dispatch(changeCity(city));
    navigate(AppRoute.Root);
  };

  return (
    <ul className="favorites__list">
      {CITIES.map((city) => {
        const currentCityOffers = filterOffers(favoriteOffers, city);
        if (currentCityOffers.length > 0) {
          return (
            <li key={city} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a onClick={(evt) => {
                    evt.preventDefault();
                    handleClick(city);
                  }} className="locations__item-link" href="/"
                  >
                    <span>{city}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                <FavoritePropertyCardsList offers={currentCityOffers} />
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

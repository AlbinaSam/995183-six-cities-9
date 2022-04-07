import Header from '../../components/header/header';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import {fetchFavoriteOffersAction} from '../../store/api-actions';
import {useEffect} from 'react';
import { getFavoriteOffers } from '../../store/app-data/selectors';
import { CITIES } from '../../consts';

function FavoritesScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <div className={`page ${favoriteOffers.length === 0 && 'page--favorites-empty'}`}>
      <Header />
      {favoriteOffers.length > 0 ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList favoriteOffers={favoriteOffers} cities={CITIES}></FavoritesList>
            </section>
          </div>
        </main> : <FavoritesEmpty />}
      <footer className={`footer ${favoriteOffers.length > 0 && 'container'}`}>
        <a className="footer__logo-link" href="./" data-testid="footer-logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;

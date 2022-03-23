import Header from '../../components/header/header';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useAppSelector } from '../../hooks/index';
import {store} from '../../store/index';
import {fetchFavoriteOffersAction} from '../../store/api-actions';

function FavoritesScreen(): JSX.Element {

  store.dispatch(fetchFavoriteOffersAction());

  const offers = useAppSelector((state) => state.favoriteOffers);

  return (
    <div className={`page ${offers.length > 0 ? '' : 'page--favorites-empty'}`}>
      <Header />
      {offers.length > 0 ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList></FavoritesList>
            </section>
          </div>
        </main> : <FavoritesEmpty></FavoritesEmpty>}
      <footer className={`footer ${offers.length > 0 ? 'container' : ''}`}>
        <a className="footer__logo-link" href="./">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;

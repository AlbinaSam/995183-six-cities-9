import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import PlacesContainer from '../../components/places-container/places-container';
import NoPlacesAvailable from '../../components/no-places-available/no-places-available';
import { filterOffers } from '../../utils';
import { useAppSelector } from '../../hooks/index';
import { getCity } from '../../store/app-using/selectors';
import { getOffers } from '../../store/app-data/selectors';

function MainScreen(): JSX.Element {

  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const filteredOffers = filterOffers(offers, city);

  return (
    <div className="page page--gray page--main" data-testid="main-page">
      <Header />

      <main className={`page__main page__main--index ${filteredOffers.length === 0 && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          {filteredOffers.length > 0 ? <PlacesContainer filteredOffers={filteredOffers}/> : <NoPlacesAvailable />}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

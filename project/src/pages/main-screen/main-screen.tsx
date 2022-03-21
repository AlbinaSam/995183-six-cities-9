import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import NoPlacesAvailable from '../../components/no-places-available/no-places-available';
import PropertyCardsList from '../../components/property-cards-list/property-cards-list';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { useState } from 'react';
import { propertyCardClasses, MapClasses } from '../../consts';
import { filterOffers } from '../../utils';
import { useAppSelector } from '../../hooks/index';

function MainScreen(): JSX.Element {

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const {city, offers} = useAppSelector((state) => state);

  const filteredOffers = filterOffers(offers, city);

  const handleActiveOfferChoose = (offer: Offer | null) => setActiveOffer(offer);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index ${filteredOffers.length > 0 ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList></LocationsList>
          </section>
        </div>
        <div className="cities">
          {filteredOffers.length > 0 ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} {filteredOffers.length > 1 ? 'places' : 'place'}  to stay in {city}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <PropertyCardsList className={propertyCardClasses.mainPage} offers={filteredOffers} onActiveChoose={handleActiveOfferChoose} />
                </div>
              </section>
              <div className="cities__right-section">
                <Map className={MapClasses.MainPage} city={city} points={filteredOffers} activeOffer={activeOffer} />
              </div>
            </div> : <NoPlacesAvailable></NoPlacesAvailable>}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

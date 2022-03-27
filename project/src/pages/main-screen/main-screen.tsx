import Header from '../../components/header/header';
import LocationsList from '../../components/location-list/location-list';
import NoPlacesAvailable from '../../components/no-places-available/no-places-available';
import PropertyCardsList from '../../components/property-cards-list/property-cards-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { useState } from 'react';
import { propertyCardClasses, MapClasses, SortingOptionsValues } from '../../consts';
import { filterOffers } from '../../utils';
import { useAppSelector } from '../../hooks/index';

function MainScreen(): JSX.Element {

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const [sortingOption, setSortingOption] = useState(SortingOptionsValues.Popular);

  const {city, offers} = useAppSelector((state) => state);

  const filteredOffers = filterOffers(offers, city);

  const handleActiveOfferChoose = (offer: Offer | null) => setActiveOffer(offer);

  const handleSortingOptionChoose = (option: string) => setSortingOption(option);

  return (
    <div className="page page--gray page--main">
      <Header></Header>

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
                <SortingOptions sortingOption={sortingOption} onOptionChange={handleSortingOptionChoose}></SortingOptions>
                <div className="cities__places-list places__list tabs__content">
                  <PropertyCardsList className={propertyCardClasses.mainPage} offers={filteredOffers} onActiveChoose={handleActiveOfferChoose} sortingOption={sortingOption}/>
                </div>
              </section>
              <div className="cities__right-section">
                <Map key={city} className={MapClasses.MainPage} city={city} points={filteredOffers} activeOffer={activeOffer} />
              </div>
            </div> : <NoPlacesAvailable></NoPlacesAvailable>}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

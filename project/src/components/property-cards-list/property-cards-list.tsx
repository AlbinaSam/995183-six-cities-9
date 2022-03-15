import PropertyCard from '../property-card/property-card';
import {Offer} from '../../types/offer';

type PropertyCardsListProps = {
  neededClasses: {placeCardClass: string, imgWrapperClass: string};
  offers: Offer[];
  onActiveChoose : (offer: Offer | null) => void;
}

function PropertyCardsList({neededClasses, offers, onActiveChoose }: PropertyCardsListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => <PropertyCard neededClasses={neededClasses} onActiveChoose={onActiveChoose} key={offer.id} id={offer.id} offer={offer}/>)}
    </>
  );
}

export default PropertyCardsList;

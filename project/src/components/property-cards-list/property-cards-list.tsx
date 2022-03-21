import PropertyCard from '../property-card/property-card';
import {Offer} from '../../types/offer';

type PropertyCardsListProps = {
  className: {placeCardClass: string, imgWrapperClass: string};
  offers: Offer[];
  onActiveChoose : (offer: Offer | null) => void;
}

function PropertyCardsList({className, offers, onActiveChoose }: PropertyCardsListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => <PropertyCard className={className} onActiveChoose={onActiveChoose} key={offer.id} id={offer.id} offer={offer}/>)}
    </>
  );
}

export default PropertyCardsList;

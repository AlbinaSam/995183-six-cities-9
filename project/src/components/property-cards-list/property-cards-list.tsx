import PropertyCard from '../property-card/property-card';
import {Offer} from '../../types/offer';

type PropertyCardsListProps = {
  offers: Offer[];
  onActiveChoose : (id: number | null) => void;
}

function PropertyCardsList({offers, onActiveChoose }: PropertyCardsListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => <PropertyCard onActiveChoose={onActiveChoose} key={offer.id} id={offer.id} offer={offer}/>)}
    </>
  );
}

export default PropertyCardsList;

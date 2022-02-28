import {useState, MouseEvent} from 'react';
import PropertyCard from '../property-card/property-card';
import {Offers} from '../../types/offers';

type PropertyCardsListProps = {
  offers: Offers;
}

function PropertyCardsList({offers}: PropertyCardsListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  const handleActiveChoose = ({target}: MouseEvent<HTMLElement>): void => {

    const newActive = (target as HTMLElement).closest('.cities__place-card ')?.getAttribute('id') as string;

    if (newActive === activeOffer) {
      return;
    }

    setActiveOffer(newActive);
  };

  return (
    <>
      {offers.map((offer) => <PropertyCard onActiveChoose ={handleActiveChoose} key={offer.id} id={offer.id.toString()} offer={offer}/>)}
    </>
  );
}

export default PropertyCardsList;

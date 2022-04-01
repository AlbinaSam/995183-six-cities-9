import PropertyCard from '../property-card/property-card';
import {Offer} from '../../types/offer';
import {sortOffers} from '../../utils';
import { memo } from 'react';

type PropertyCardsListProps = {
  className: {placeCardClass: string, imgWrapperClass: string};
  offers: Offer[];
  onActiveChoose : (offer: Offer | null) => void;
  sortingOption?: string;
}

function PropertyCardsList({className, offers, onActiveChoose, sortingOption }: PropertyCardsListProps): JSX.Element {

  const sortedOffers = sortOffers(offers, sortingOption);

  return (
    <>
      {sortedOffers.map((offer: Offer) => <PropertyCard className={className} onActiveChoose={onActiveChoose} key={offer.id} id={offer.id} offer={offer}/>)}
    </>
  );
}

export default memo(PropertyCardsList);

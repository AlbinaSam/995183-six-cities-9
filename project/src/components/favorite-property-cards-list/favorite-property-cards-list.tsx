import {Offers} from '../../types/offers';
import FavoritePropertyCard from '../favorite-property-card/favorite-property-card';

type FavoritePropertyCardsProps = {
  offers: Offers;
}

function FavoritePropertyCardsList({offers}: FavoritePropertyCardsProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => <FavoritePropertyCard key={offer.id} id={offer.id.toString()} offer={offer}/>)}
    </>
  );
}

export default FavoritePropertyCardsList;

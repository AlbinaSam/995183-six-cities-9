import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { countRatingPercent } from '../../utils';
import {useAppDispatch} from '../../hooks/index';
import {FavoriteStatusData} from '../../types/favorite-status-data';
import {changeFavoriteStatusAction} from '../../store/api-actions';

type FavoritePropertyCardProps = {
  offer: Offer;
  id: string;
}

function FavoritePropertyCard({ id, offer }: FavoritePropertyCardProps): JSX.Element {

  const dispatch = useAppDispatch();

  const handleClick = ({ offerId, offerStatus }: FavoriteStatusData) => {

    dispatch(changeFavoriteStatusAction({
      offerId,
      offerStatus,
    }));
  };

  return (
    <article id={id} className="favorites__card place-card" data-testid="favorites-card">
      {offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`} data-testid="img-link">
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={(evt) => {
            evt.preventDefault();
            handleClick({ offerId: offer.id, offerStatus: Number(!offer.isFavorite) });
          }} className="place-card__bookmark-button place-card__bookmark-button--active button" type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${countRatingPercent(offer.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} data-testid="title-link">{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type[0].toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>
  );
}

export default FavoritePropertyCard;

import {Link, useNavigate} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {countRatingPercent} from '../../utils';
import {useAppSelector, useAppDispatch} from '../../hooks/index';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {AuthorizationStatus, AppRoute} from '../../consts';
import {changeFavoriteStatusAction} from '../../store/api-actions';
import {FavoriteStatusData} from '../../types/favorite-status-data';

type PropertyCardProps = {
  className: {placeCardClass: string, imgWrapperClass: string};
  offer: Offer;
  id: number;
  onActiveChoose: (offer: Offer | null) => void;
}

function PropertyCard({className, onActiveChoose, id, offer}: PropertyCardProps) {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const authorizationstatus = useAppSelector(getAuthorizationStatus);

  const handleClick = ({offerId, offerStatus}: FavoriteStatusData) => {
    authorizationstatus !== AuthorizationStatus.Auth ?
      navigate(AppRoute.Login) :
      dispatch(changeFavoriteStatusAction({
        offerId,
        offerStatus,
      }));
  };

  return (
    <article onMouseEnter={() => onActiveChoose(offer)} onMouseLeave={() => onActiveChoose(null)} id={id.toString()} className={`${className.placeCardClass} place-card`} data-testid="place-card">
      {offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${className.imgWrapperClass} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`} data-testid="img-link">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={(evt) => {
            evt.preventDefault();
            handleClick({offerId: offer.id, offerStatus: Number(!offer.isFavorite)});
          }} className={`place-card__bookmark-button ${offer.isFavorite && 'place-card__bookmark-button--active'}  button`} type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${countRatingPercent(offer.rating)}%`}}></span>
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

export default PropertyCard;

import Header from '../../components/header/header';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PropertyCardsList from '../../components/property-cards-list/property-cards-list';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { Review } from '../../types/reviews';
import { MAX_PHOTOS_AMOUNT, propertyCardClasses, MapClasses } from '../../consts';
import { countRatingPercent } from '../../utils';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/index';

type PropertyScreenProps = {
  reviews: Review[];
  nearbyOffers: Offer[];
}

function getMaxPhotosAmount(offer: Offer): number {
  return Math.min(offer.images.length, MAX_PHOTOS_AMOUNT);
}

function PropertyScreen({ reviews, nearbyOffers }: PropertyScreenProps): JSX.Element | null {

  const offers: Offer[] = useAppSelector((state) => state.offers);

  const params = useParams();

  const offer = offers.find((currentOffer) => currentOffer.id.toString() === params.id);

  if (!offer) {
    return null;
  }

  const {images, type, isPremium, title, rating, bedrooms, maxAdults, price, goods, host, description} = offer;

  const mapStyle = {width: '1144px', margin: '0 auto 50px'};

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, getMaxPhotosAmount(offer)).map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt={type[0].toUpperCase() + type.slice(1)} />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${countRatingPercent(rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type[0].toUpperCase() + type.slice(1)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => <li key={good} className="property__inside-item">{good}</li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                {reviews.length > 0 ?
                  <ReviewsList reviews={reviews}></ReviewsList>
                  : ''}
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map className={MapClasses.PropertyPage} city={offer.city.name} points={nearbyOffers} activeOffer={offer} mapStyle={mapStyle}></Map>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PropertyCardsList className={propertyCardClasses.propertyPage} offers={nearbyOffers} onActiveChoose={()=> null}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyScreen;

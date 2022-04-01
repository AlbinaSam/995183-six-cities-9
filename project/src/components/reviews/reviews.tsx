import { memo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/index/index';
import { fetchReviewsAction } from '../../store/api-actions';
import { getReviews } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { AuthorizationStatus } from '../../consts';
import { useParams } from 'react-router-dom';

function Reviews(): JSX.Element {
  const params = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(getReviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviewsAction(params.id));
  }, [dispatch, params.id]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {reviews.length > 0 && <ReviewsList reviews={reviews} />}
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
}

export default memo(Reviews);

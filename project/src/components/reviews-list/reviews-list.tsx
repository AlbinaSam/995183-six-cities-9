import { Review } from '../../types/review';
import ReviewItem from '../../components/review-item/review-item';
import { ReviewNumber } from '../../consts';
import { getMaxAmount } from '../../utils';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list" data-testid="reviews-list">
      {[...reviews]
        .sort((reviewA: Review, reviewB: Review) => reviewB.date.localeCompare(reviewA.date))
        .slice(0, getMaxAmount(reviews.length, ReviewNumber.MaxAmount))
        .map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
    </ul>
  );
}

export default ReviewsList;

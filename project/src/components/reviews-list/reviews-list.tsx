import { Review } from '../../types/reviews';
import ReviewItem from '../../components/review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review}></ReviewItem>
      ))}
    </ul>
  );
}

export default ReviewsList;

import { render, screen } from '@testing-library/react';
import { mockReview } from '../../test-mocks';
import ReviewItem from './review-item';

const review = mockReview;

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {

    render(
      <ReviewItem review={review}/>,
    );

    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
  });
});

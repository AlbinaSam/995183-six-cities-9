import { render, screen } from '@testing-library/react';
import { mockReview } from '../../test-mocks';
import ReviewsList from './reviews-list';

const reviews = [mockReview];

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {

    render(
      <ReviewsList reviews={reviews}/>,
    );

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });
});

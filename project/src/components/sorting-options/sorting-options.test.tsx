import { render, screen } from '@testing-library/react';
import SortingOptions from './sorting-options';
import { SortingOptionsValues } from '../../consts';

describe('Component: SortingOptions', () => {
  it('should render correctly', () => {

    const currentSortingOption = SortingOptionsValues.Popular;

    render(
      <SortingOptions sortingOption={currentSortingOption} onOptionChange={() => null}/>,
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });
});

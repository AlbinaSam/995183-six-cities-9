import { memo, useState } from 'react';
import { SortingOptionsValues } from '../../consts';

type SortingOptionsProps = {
  sortingOption: string;
  onOptionChange: (option: string) => void;
}

function SortingOptions({ sortingOption, onOptionChange }: SortingOptionsProps): JSX.Element {

  const [optionsState, setOptionsState] = useState(false);

  const options = Object.values(SortingOptionsValues);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOptionsState(!optionsState)}>
        {sortingOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${optionsState && 'places__options--opened'}`}>
        {options.map((option) => (
          <li key={option} className={`places__option ${sortingOption === option && 'places__option--active'}`} tabIndex={0} onClick={() => {
            onOptionChange(option);
            setOptionsState(!optionsState);
          }}
          >{option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(SortingOptions);

import React, { useState, ChangeEvent} from 'react';
import { MIN_CHARACTERS_NUMBER, REVIEW_TITLES } from '../../consts';

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {REVIEW_TITLES.map((title, index) => (
          <React.Fragment key={title}>
            <input className="form__rating-input visually-hidden" name="rating" value={index + 1} id={`${index + 1}-stars`} type="radio" checked={rating === (index + 1).toString()} onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              setRating(target.value);
            }}
            />
            <label htmlFor={`${index + 1}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>)).reverse()}

      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(target.value);
      }}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={comment.length < MIN_CHARACTERS_NUMBER}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;

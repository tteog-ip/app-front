import React, { useState, useEffect } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';

import './ProductReview.scss';

export default function ProductReview() {
  const [reviewInput, setReviewInput] = useState({
    userId: 'Hoon',
    content: '',
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/data/product_review_data.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setReviews(data);
      });
  }, []);
  /*const data = [
    {
      userId: '양요섭',
      content: '여기가 젤 맛있네요',
    },
    {
      userId: '손동운',
      content: '박스도 귀엽고 포장가방도 귀여워요!!',
    },
    {
      userId: '이기광',
      content: '진짜 맛있다!',
    },
    {
      userId: '윤두준',
      content: '우유랑 먹으면 더 맛있습니다.',
    },
  ];*/

  function updateReview(e) {
    const { value } = e.target;
    setReviewInput({ ...reviewInput, content: value });
  }

  function addReview() {
    if (!reviewInput.content) {
      return;
    }
    setReviews(reviews.concat(reviewInput));
    setReviewInput({ ...reviewInput, content: '' });
  }

  function addReviewEnter(e) {
    if (e.key === 'Enter' && reviewInput.content) {
      addReview();
    }
  }

  return (
    <div className="detailWrap">
      <ul className="detailMenu">
        <li>상세정보</li>
        <li>리뷰</li>
        <li>정보안내</li>
      </ul>
      <form className="reviewInputBox">
        <textarea
          className="reviewInput"
          placeholder="새로운 리뷰를 등록해주세요."
          onChange={updateReview}
          onKeyPress={addReviewEnter}
          value={reviewInput.content}
        />
        <button type="button" className="submitBtn" onClick={addReview}>
          <i class="far fa-check-circle" />
          &nbsp; 리뷰 등록하기
        </button>
      </form>
      <div className="reviewsWrap">
        <p className="reviewTitle">리뷰 ({reviews.length})</p>
        <ul className="reviewItems">
          {reviews.map((review, index) => {
            return <ReviewItem key={index} reviews={review} />;
          })}
        </ul>
      </div>
    </div>
  );
}

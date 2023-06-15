import React from 'react';

import './ReviewItem.scss';

export default function ReviewItem({ reviews }) {
  return (
    <li className="reviewItem">
      <div className="reviewContent">{reviews.content}</div>
      <div className="reviewAuthor">
        작성자
        <p className="reviewAuthorId">{reviews.userId}</p>
      </div>
    </li>
  );
}

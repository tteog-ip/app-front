import React from 'react';
import './SlickThumbnail.scss';

export default function SlickThumbnail({
  currentSlideId,
  slideId,
  imgUrl,
  changeSlide,
}) {
  return (
    <li className="thumbnailItem">
      <button
        className={`thumbnailBtn ${currentSlideId === slideId ? 'active' : ''}`}
      >
        <img src={imgUrl} alt={slideId} className="img" onClick={changeSlide} />
      </button>
    </li>
  );
}

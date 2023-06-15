import React from 'react';
import './SlickDot.scss';

function SlickDot({ changeSlide, checkSlideId }) {
  return (
    <li className="slickDot">
      <button
        className={`dotButton ${checkSlideId ? 'clickedDot' : ''}`}
        onClick={changeSlide}
      />
    </li>
  );
}

export default SlickDot;

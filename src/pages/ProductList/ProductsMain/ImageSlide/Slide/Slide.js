import React, { useState, useEffect } from 'react';
import './Slide.scss';

const Slide = ({ slideId, imgUrl }) => {
  const [animation, setAnimation] = useState('openSlide');

  useEffect(() => {
    setTimeout(() => {
      setAnimation('');
    }, 600);
    return () => {
      setAnimation('closeSlide');
      setTimeout(() => {
        setAnimation('');
      }, 600);
    };
  }, []);

  return (
    <div className={`slide ${animation}`}>
      <div className="imgOverflow">
        <img src={imgUrl} alt={`slide${slideId}`} className="slideImg" />
      </div>
    </div>
  );
};

export default Slide;

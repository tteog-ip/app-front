import React, { useState, useEffect } from 'react';
import SlickDot from './SlickDot/SlickDot';
import Slide from './Slide/Slide';
import { SLIDE_DATA } from './SlideData';
import './imageSlide.scss';

const ImageSlide = () => {
  const [currentSlideId, setCurrentSlideId] = useState(0);
  const slideLength = 4;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      const newSlideId = currentSlideId === slideLength ? 0 : prev => prev + 1;
      setCurrentSlideId(newSlideId);
    }, 5000);
    return () => {
      clearInterval(slideInterval);
    };
  }, [currentSlideId]);

  const changeSlide = slideId => {
    setCurrentSlideId(slideId);
  };

  return (
    <div className="imageSlide">
      <div className="slideList">
        {SLIDE_DATA.filter(({ id }) => id === currentSlideId).map(slide => (
          <Slide key={slide.id} slideId={slide.id} imgUrl={slide.imageUrl} />
        ))}
      </div>
      <ul className="slickDotWrapper">
        {SLIDE_DATA.map(({ id }) => (
          <SlickDot
            key={id}
            currentSlideId={currentSlideId}
            slideId={id}
            checkSlideId={currentSlideId === id}
            changeSlide={() => changeSlide(id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageSlide;

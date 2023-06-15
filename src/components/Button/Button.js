import React from 'react';
import '../Button/Button.scss';

const Button = ({ children, btnOnClick, point }) => {
  return (
    <div className="btnWrap">
      <button
        className={`button ${point && 'point'}`}
        type="button"
        onClick={btnOnClick}
      >
        <p className="btnTitle">{children}</p>
      </button>
    </div>
  );
};
export default Button;

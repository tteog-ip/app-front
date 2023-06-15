import React from 'react';
import '../NumBtn/NumBtn.scss';

const NumBtn = ({ minusOne, plusOne, numValue }) => {
  return (
    <div className="numBtn">
      <button className="numBtnMinus aNumBtn" type="button" onClick={minusOne}>
        <i className="fas fa-minus" />
      </button>
      <input className="numValue" type="text" value={numValue} readOnly />
      <button className="numBtnPlus aNumBtn" type="button" onClick={plusOne}>
        <i className="fas fa-plus" />
      </button>
    </div>
  );
};
export default NumBtn;

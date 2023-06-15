import React from 'react';
import './InputInterface.scss';

const InputInterface = ({
  isAlertPop,
  placeholder,
  type,
  inputRef,
  alertWord,
}) => {
  return (
    <div className="inputInterface">
      <input
        className={isAlertPop ? 'alertInput' : 'loginInput'}
        type={type}
        placeholder={placeholder}
        ref={inputRef}
      />
      {isAlertPop && <span className="alertWord">{alertWord}</span>}
    </div>
  );
};

export default InputInterface;

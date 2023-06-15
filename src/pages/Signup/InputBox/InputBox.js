import React, { useState } from 'react';

export default function InputBox({
  type,
  name,
  valid,
  placeholder,
  value,
  validFalseContent,
}) {
  const [isBlurOnce, setIsBlurOnce] = useState(false);

  return (
    <>
      <li>
        <input
          type={type}
          name={name}
          className={`formInput ${!valid && isBlurOnce && 'validBorder'}`}
          placeholder={placeholder}
          value={value}
          onBlur={() => setIsBlurOnce(true)}
        />
      </li>
      {!valid && isBlurOnce && (
        <li>
          <span className="validText">{validFalseContent}</span>
        </li>
      )}
    </>
  );
}

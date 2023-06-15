import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContentWrapper">
        <div className="footerInfoContainer">
          <h3 className="title">떡잎마을 주택공사</h3>
          <div className="subject">
            <h4 className="subTitle">개발자</h4>
            <p className="description">떡잎방범대</p>
          </div>
        </div>
        <div className="footerIconContainer">
          <button className="socialButton">
            <i className="fab fa-github" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;

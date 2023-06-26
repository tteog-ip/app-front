import React, { useEffect } from 'react';
import '../Main/Main.scss';

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mainPage">
      <div className="introduce">
        <h3 className="subTitle">떡잎마을 주택공사</h3>
        <h1 className="mainTitle">내 집 마련의 꿈,</h1>
        <h1 className="mainTitle">뉴:홈으로 해결하세요.</h1>
      </div>
      <div className="back">
        <div className="background">
          <div className="mask" />
          <img className="backgroundImg" src="images/main.jpg" alt="main" />
        </div>
      </div>
    </div>
  );
};
export default Main;

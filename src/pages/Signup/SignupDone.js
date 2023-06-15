import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

import './SignupDone.scss';

export default function SignupDone() {
  return (
    <div className="signupDoneWrap">
      <ul className="registerStep">
        <li className="stepItem">01 정보입력</li>
        <li className="stepItem">02 가입완료</li>
      </ul>
      <h2 className="signupTitle">회원가입</h2>
      <div className="doneBox">
        <p className="content">회원가입이 완료되었습니다.</p>
        <div className="btnWrap">
          <Link to="/login">
            <Button>로그인하기</Button>
          </Link>
          <Link to="/">
            <Button>메인으로</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

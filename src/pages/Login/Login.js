import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { API_ADDRESS } from '../../apiConfig';
import InputInterface from './InputInterface/InputInterface';
import Button from '../../components/Button/Button';
import '../Login/Login.scss';

function Login() {
  const idInputRef = useRef();
  const pwInputRef = useRef();
  const [isAlertPopId, setIsAlertPopId] = useState(false);
  const [isAlertPopPw, setIsAlertPopPw] = useState(false);

  const validateId = () => {
    const idValidRegex = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/g;
    const idValue = idInputRef.current.value;
    const isIdValid = !!idValue.match(idValidRegex);

    return isIdValid;
  };

  const validatePw = () => {
    const pwValidRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
    const pwValue = pwInputRef.current.value;
    const isPwValid = !!pwValue.match(pwValidRegex);

    return isPwValid;
  };

  const alertEachValid = () => {
    setIsAlertPopId(!validateId());
    setIsAlertPopPw(!validatePw());
  };

  const navigate = useNavigate();

  const onValidation = () => {
    if (validateId() && validatePw()) {
      navigate('/');
      alert('로그인 되었습니다! 환영합니다 :)');
    } else {
      alertEachValid();
    }
  };

  const onSignIn = () => {
    fetch(API_ADDRESS.sign_in, {
      method: 'POST',
      body: JSON.stringify({
        email: idInputRef.current.value,
        password: pwInputRef.current.value,
      }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.message === 'SUCCESS') {
          localStorage.setItem('TOKEN', res.access_token);
          onValidation();
        } else {
          alertEachValid();
        }
      });
  };

  const onSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login">
      <h1 className="loginTitle">로그인</h1>
      <div className="loginBox">
        <form className="loginForm">
          <InputInterface
            name="id"
            inputRef={idInputRef}
            placeholder="아이디 또는 이메일"
            type="email"
            isAlertPop={isAlertPopId}
            alertWord="아이디를 입력하세요."
          />
          <InputInterface
            name="pw"
            inputRef={pwInputRef}
            placeholder="비밀번호"
            type="password"
            isAlertPop={isAlertPopPw}
            alertWord="비밀번호를 입력하세요."
          />
        </form>
        <div className="findBtn">
          <span className="findId">아이디 찾기</span>
          <span className="findPw">비밀번호 찾기</span>
        </div>
        <div className="btnWrap">
          <Button btnOnClick={onSignIn}>로그인</Button>
          <Button btnOnClick={onSignUp}>회원가입</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;

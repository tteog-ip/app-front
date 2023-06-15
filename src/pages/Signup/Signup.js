import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import InputBox from './InputBox/InputBox';
import TERMS_DATA from './SignupData';
import { API_ADDRESS } from '../../apiConfig';
import './Signup.scss';

export default function Signup() {
  const [memberInput, setMemberInput] = useState({
    name: '',
    email: '',
    password: '',
    passwordRe: '',
  });
  const { name, email, password, passwordRe, address } = memberInput;
  const [checkedList, setCheckedList] = useState([]);
  const [emailExistCheck, setEmailExistCheck] = useState(false);

  const emailRegex =
    /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g;
  const passwordRegex =
    /(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,}/g;
  const isEmailRegexValid = !!email.match(emailRegex);
  const isPasswordRegexValid = !!password.match(passwordRegex);
  const nameValid = name.length > 0;
  const passwordReValid = password === passwordRe;
  const termsValid = checkedList.includes(1) && checkedList.includes(2);

  const onCheckedAll = checked => {
    const newCheckedList = checked ? TERMS_DATA.map(term => term.id) : [];
    setCheckedList(newCheckedList);
  };

  const onCheckedElement = (checked, termId) => {
    const newCheckedList = checked
      ? [...checkedList, termId]
      : checkedList.filter(el => el !== termId);
    setCheckedList(newCheckedList);
  };

  function handleMemberInput(e) {
    const { name, value } = e.target;
    name === 'isVegan'
      ? setMemberInput({ ...memberInput, isVegan: e.target.checked })
      : setMemberInput({ ...memberInput, [name]: value });
  }

  const isSameLength = checkedList.length === TERMS_DATA.length;

  const submitValid =
    termsValid &&
    nameValid &&
    emailExistCheck &&
    isPasswordRegexValid &&
    passwordReValid;

  const navigate = useNavigate();

  function emailCheck() {
    fetch(API_ADDRESS.id_check, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'EMAIL_EXISTS') {
          alert('이미 존재하는 이메일입니다.');
          setEmailExistCheck(false);
          setMemberInput({ ...memberInput, email: '' });
        } else {
          alert('사용가능한 이메일입니다.');
          setEmailExistCheck(true);
        }
      });
  }

  function onSignup() {
    if (submitValid) {
      fetch(API_ADDRESS.sign_up, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(result =>
          result.message === 'SUCCESS'
            ? navigate('/signupdone')
            : alert('가입실패')
        );
    } else if (!termsValid) {
      alert('필수 약관 동의를 확인해주세요.');
    } else if (!emailExistCheck) {
      alert('이메일 중복체크를 해주세요.');
    } else {
      alert('가입 형식을 확인해주세요.');
    }
  }

  return (
    <div className="signupWrap">
      <ul className="registerStep">
        <li className="stepItem">01 정보입력</li>
        <li className="stepItem">02 가입완료</li>
      </ul>
      <h2 className="signupTitle">회원가입</h2>
      <div className="section">
        <div className="joinTerms">
          <h3 className="termsTitle">이용약관 동의</h3>
          <div className="termsBox">
            <p className="termsContent">
              회원가입 및 정상적인 서비스 이용을 위해
              <br />
              아래 약관을 읽어보시고, 동의 여부를 결정해 주세요.
              <br />
              필수 약관에 동의하셔야 회원가입이 가능합니다.
            </p>
          </div>
          <label
            className={`blockCheckBox ${
              checkedList.length === 5 ? 'checkActive' : ''
            }`}
          >
            <input
              type="checkbox"
              className="allCheck"
              onChange={e => onCheckedAll(e.target.checked)}
              checked={checkedList.length === 0 ? false : isSameLength}
            />
            <i class="fas fa-check" /> &nbsp;필수 항목 및 선택 항목 모두
            동의합니다.
          </label>
          <div className="termsCheckWrap">
            <ul className="termsCheckList">
              {TERMS_DATA.map(term => {
                return (
                  <li key={term.id}>
                    <input
                      type="checkbox"
                      onChange={e =>
                        onCheckedElement(e.target.checked, term.id)
                      }
                      checked={checkedList.includes(term.id) ? true : false}
                    />
                    {term.content}
                  </li>
                );
              })}
            </ul>
            <span className="checkTip">
              * 선택 항목은 동의하지 않더라도 회원가입이 가능합니다.
            </span>
          </div>
        </div>
        <form onChange={handleMemberInput}>
          <ul className="formWrap">
            <li>
              <h3 className="formTitle">회원정보 입력</h3>
            </li>
            <InputBox
              type="text"
              name="name"
              valid={nameValid}
              placeholder="성함"
              value={name}
              validFalseContent="성함을 입력해주세요"
            />
            <div className="emailWrap">
              <div className="email">
                <InputBox
                  type="text"
                  name="email"
                  valid={isEmailRegexValid}
                  placeholder="이메일"
                  value={email}
                  validFalseContent="이메일 형식을 확인 해주세요."
                />
              </div>
              <div className="btnWrap">
                <button
                  type="button"
                  onClick={emailCheck}
                  className="emailCheckBtn"
                >
                  중복확인
                </button>
              </div>
            </div>
            <InputBox
              type="password"
              name="password"
              valid={isPasswordRegexValid}
              placeholder="패스워드 : 영문 대, 소문자, 특수문자 1개 포함 8자리 이상"
              value={password}
              validFalseContent="공백없이 10~20자로 입력해주세요."
            />
            <InputBox
              type="password"
              name="passwordRe"
              valid={passwordReValid}
              placeholder="패스워드를 다시 입력해주세요"
              value={passwordRe}
              validFalseContent="입력한 패스워드와 일치하지 않습니다."
            />
            <li>
              <span className="signTip">
                * 만 14세 미만은 회원 가입 및 서비스 이용이 불가합니다.
              </span>
            </li>
            <li>
              <Button btnOnClick={onSignup}>가입하기</Button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

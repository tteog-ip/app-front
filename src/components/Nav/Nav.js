import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ADDRESS } from '../../apiConfig';
import { ReactComponent as House } from '../../assets/house.svg';
import { ReactComponent as Login } from '../../assets/login.svg';
import { ReactComponent as Logout } from '../../assets/logout.svg';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as HamburgerBar } from '../../assets/HamburgerBar.svg';
import { ReactComponent as Titlelogo } from '../../assets/Titlelogo.svg';
import './Nav.scss';
import { ReactComponent as Xbutton } from '../../assets/Xbutton.svg';
import { useEffect } from 'react';

const Nav = () => {
  const [isExtended, setIsExtended] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [cartProductNum, seCartProductNum] = useState(0);

  const onNavToggled = () => {
    setIsExtended(!isExtended);
  };

  let token = localStorage.getItem('TOKEN') || '';
  const navigate = useNavigate();

  const goToCart = () => {
    if (token) {
      navigate('/order/cart');
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  const goToMyPage = () => {
    if (token) {
      navigate('/order/list');
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  const onLoginButton = () => {
    if (token) {
      localStorage.clear();
      setIsButtonValid(() => !isButtonValid);
      alert('로그아웃 되었습니다');
      navigate('/');
    } else if (!token) {
      navigate('/login');
      setIsButtonValid(() => isButtonValid);
    }
  };

  useEffect(() => {
    token ? setIsButtonValid(true) : setIsButtonValid(false);
  }, [token]);

  const closedNav = () => {
    setIsExtended(false);
  };

  useEffect(() => {
    fetch(API_ADDRESS.order_cart, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(result => seCartProductNum(result.cart_info?.length || 0));
  }, [cartProductNum, token]);

  return (
    <nav className="sideNav">
      <div className={`basicNav ${isExtended && 'toggledNav'}`}>
        <Link to="/">
          <div className={isExtended && 'animationRight'}>
            <button className="navButton home ">
              <Logo />
            </button>
          </div>
        </Link>
        <button
          className="navButton hamburgerBar"
          type="checkbox"
          onClick={onNavToggled}
        >
          {isExtended ? <Xbutton /> : <HamburgerBar />}
        </button>
        <div className="dummyElement" />
        <div className="navButtonContainer">
          <button className="navButton" onClick={goToCart}>
            {cartProductNum !== 0 && (
              <div className="circleCart">
                <p className="cartNum">{cartProductNum}</p>
              </div>
            )}

            <p className="description">
              신청내역
              <div className="div" />
            </p>
            <House />
          </button>

          <button
            className={isButtonValid ? 'navButton signIn' : 'navButton signOut'}
            onClick={onLoginButton}
          >
            {isButtonValid ? (
              <p className="description">
                로그아웃
                <div className="div" />
              </p>
            ) : (
              <p className="description">
                로그인
                <div className="div" />
              </p>
            )}
            {isButtonValid ? <Logout /> : <Login />}
          </button>
        </div>
      </div>
      <nav className={`extensionNav ${isExtended ? '' : 'toggledNav'}`}>
        <div className="extensionNavContainer">
          <ul className="extensionNavButtonWrapper">
            <Link to="/product-list/all">
              <li className="extensionNavButton" onClick={closedNav}>
                주택 확인
              </li>
            </Link>
            <li className="extensionNavButton" onClick={closedNav}>
              청약 신청 방법
            </li>
          </ul>
        </div>
      </nav>
      <div className={`maskOff ${isExtended && 'maskOn'}`} />
    </nav>
  );
};

export default Nav;

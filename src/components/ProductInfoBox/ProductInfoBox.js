import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NumBtn from '../ProductInfoBox/NumBtn/NumBtn';
import Button from '../Button/Button';
import { API_ADDRESS } from '../../apiConfig';
import { TRANSELATE } from '../../pages/ProductList/Transelate';
import '../ProductInfoBox/ProductInfoBox.scss';

const ProductInfoBox = ({
  aptId,
  name,
  address,
  type,
  thumbnailImg,
  location,
  region,
  open_date,
  quantity,
  area,
  status,
}) => {
  const [numValue, setNumValue] = useState(1);
  let token = localStorage.getItem('TOKEN');

  const minusOne = () => {
    numValue === 1 ? setNumValue(1) : setNumValue(numValue - 1);
  };

  const plusOne = () => {
    setNumValue(numValue + 1);
  };

  const tokenValid = () => {
    return token ? '' : alert('로그인이 필요합니다.');
  };
  const goCheckValid = token ? '/order/check' : '/login';

  const navigate = useNavigate();

  function goToCart() {
    if (window.confirm('장바구니로 이동하시겠습니까?')) navigate('/order/cart');
    else return;
  }

  const addToCart = () => {
    if (token) {
      fetch(API_ADDRESS.order_cart, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          apt_id: aptId,
          quantity: quantity,
        }),
      })
        .then(response => response.json())
        .then(result => result.message === 'SUCCESS' && goToCart());
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  return (
    <div className="productInfoBox">
      <h3 className="productName">{name}</h3>
      <ul className="tabBar">
        <li className="infoToBuy">주택정보</li>
      </ul>
      <div className="tabContents">
        <dl className="list">
          <dt className="title">상태</dt>
          <dt>{TRANSELATE[status]}</dt>
        </dl>
        <dl className="list">
          <dt className="title">지역</dt>
          <dt>
            {TRANSELATE[region]}/{TRANSELATE[location]}
          </dt>
        </dl>
        <dl className="list">
          <dt className="title">주소</dt>
          <dt>{address}</dt>
        </dl>
        <dl className="list">
          <dt className="title">세대수</dt>
          <dt>{quantity}세대</dt>
        </dl>
        <dl className="list">
          <dt className="title">면적</dt>
          <dt className="space">{area}</dt>
        </dl>
      </div>
      <div className="btnWrap">
        <div className="buyBtn">
          <Link
            to={goCheckValid}
            state={{
              appList: [
                {
                  apt_id: aptId,
                  name: name,
                  thumbnail_image_url: thumbnailImg,
                  location: location,
                  region: region,
                  status: status,
                },
              ],
            }}
          >
            <Button point={true} btnOnClick={tokenValid}>
              신청하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoBox;

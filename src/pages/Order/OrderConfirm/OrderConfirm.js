import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { API_ADDRESS } from '../../../apiConfig';
import OrderSheet from './OrderSheet/OrderSheet';
import Button from '../../../components/Button/Button';
import './OrderConfirm.scss';

const OrderConfirm = () => {
  const [orderSheet, setOrderSheet] = useState([]);
  const { user, address, order_items } = orderSheet;
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  let token = localStorage.getItem('TOKEN') || '';
  const { order } = queryString.parse(location.search);

  const fetchOrderSheetData = async () => {
    const data = await fetch(API_ADDRESS.order_checkout + `?id=${order}`, {
      headers: { Authorization: token },
    });
    const res = await data.json();
  };

  useEffect(() => {
    fetchOrderSheetData();
  }, []);

  return (
    <div className="orderConfirm">
      <div className="pageTitleArea">
        <div className="progressNav">
          <ul className="progress">
            <li className="step">
              <p>01 주택확인</p>
            </li>
            <li className="step">
              <p>02 신청진행</p>
            </li>
            <li className="step">
              <p>03 신청완료</p>
              <span className="line" />
            </li>
          </ul>
        </div>
        <div className="pageTitle">
          <h1 className="confirmTitle">신청완료</h1>
        </div>
      </div>
      <div className="pageContent">
        <div className="orderConfirmMessage">
          <h3>신청이 완료되었습니다.</h3>
        </div>
        <div className="continueButtonContainer">
          <Button btnOnClick={() => navigate('/')}>메인으로</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;

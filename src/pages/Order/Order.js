import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Goods from './Goods/Goods';
import { API_ADDRESS } from '../../apiConfig';
import './Order.scss';

const Order = () => {
  const [appList, setAppList] = useState([]);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const { pageType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  let token = localStorage.getItem('TOKEN') || '';

  const fetchAppData = useCallback(async () => {
    const data = await fetch(API_ADDRESS.order_cart, {
      headers: { Authorization: token },
    });
    const res = await data.json();
    console.log(res);
    if (res.app_info) {
      setAppList(() => res.app_info);
    } else {
      setAppList(() => []);
    }
  }, [token]);

  useEffect(() => {
    if (pageType === 'cart') {
      (async () => {
        setIsOrderLoading(true);
        await fetchAppData();
        setIsOrderLoading(false);
      })();
    } else {
      setAppList(() => location.state.appList);
      console.log(appList);
    }
  }, [fetchAppData, pageType, location]);

  const onOrder = async () => {
    if (isTermsChecked) {
      const appTable = appList.map(app => ({
        apt_id: app.apt_id,
      }));

      const data = await fetch(API_ADDRESS.order_checkout, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: JSON.stringify(appTable),
      });

      const res = await data.json();

      navigate(`/order/confirm?order=${res.message}`);
    } else {
      window.alert('약관에 동의해주셔야 신청이 가능합니다.');
    }
  };

  const onOrderFailed = async () => {
    if (isTermsChecked) {
      const appTable = appList.map(product => ({
        product_id: product.product_id,
        quantity: product.quantity,
      }));

      await fetch(API_ADDRESS.order_fail, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: JSON.stringify(appTable),
      });
      window.alert('비정상적인 오류로 결제에 실패했습니다.');
    } else {
      window.alert('약관에 동의해주셔야 결제가 가능합니다.');
    }
  };

  return (
    <div className="order">
      <div className="pageTitleArea">
        {pageType !== 'cart' && (
          <div className="progressNav">
            <ul className="progress">
              <li className="stepOne">
                <p>01 주택확인</p>
                {pageType === 'cart' && <span className="line" />}
              </li>
              <li className="stepTwo">
                <p>02 신청진행</p>
                {pageType === 'check' && <span className="line" />}
              </li>
              <li className="stepThree">
                <p>03 신청완료</p>
              </li>
            </ul>
          </div>
        )}
        <div className="pageTitle">
          <h1 className="orderTitle">
            {pageType === 'cart' && '신청내역'}
            {pageType === 'check' && '신청진행'}
          </h1>
        </div>
      </div>
      <div className="pageContent">
        <section className="productSection">
          {appList.length ? (
            !isOrderLoading && (
              <table className="goodsTable">
                <thead className="goodsTableHead">
                  <tr>
                    <th className="tableHeadElement tableHeadImage" />
                    <th className="tableHeadElement tableHeadGoods">
                      <p>주택</p>
                    </th>
                    <th className="tableHeadElement tableHeadQuantity">
                      <p>지역</p>
                    </th>
                    <th className="tableHeadElement tableHeadPrice">
                      <p>상태</p>
                    </th>
                    <th className="tableHeadElement tableHeadButton" />
                  </tr>
                </thead>
                {appList.map(app => (
                  <Goods key={app.apt_id} app={app} pageType={pageType} />
                ))}
              </table>
            )
          ) : (
            <div className="nullContentTable">
              <p>신청한 내역이 없습니다.</p>
            </div>
          )}
        </section>
        {pageType !== 'cart' && (
          <div className="orderTotal">
            <div className="orderInfoContainer">
              <div className="mustCheck">
                <input
                  className="checkBox"
                  type="checkbox"
                  value={isTermsChecked}
                  onChange={() => setIsTermsChecked(prev => !prev)}
                />
                <label className="label" htmlFor="agree">
                  신청하실 주택의 신청조건을 명확히 확인하였으며, 이에
                  동의합니다.
                </label>
              </div>
            </div>
            <div className="orderCheckButtonWrapper">
              <Button btnOnClick={onOrder}>신청하기</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Order;

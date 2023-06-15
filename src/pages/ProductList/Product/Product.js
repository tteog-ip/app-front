import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { API_ADDRESS } from '../../../apiConfig';
import { TRANSELATE } from '../Transelate';
import './Product.scss';

const Product = ({ el, id }) => {
  let token = localStorage.getItem('TOKEN');

  const navigate = useNavigate();

  return (
    <div className="product">
      <div className="productContainer">
        <Link to={`/product/${id}`} className="goToProductDetail">
          <div className="productImageWrapper">
            <div className="imgBox">
              <img
                className="productImage"
                alt={el.name}
                src={el.thumbnail_image_url}
              />
            </div>
          </div>
          <div className="pdtInfo">
            <h3 className="productName">{el.name}</h3>
            <div className="status">
              <p className="productStatus">{TRANSELATE[el.status]}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;

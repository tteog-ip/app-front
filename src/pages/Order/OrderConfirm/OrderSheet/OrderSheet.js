import React from 'react';
import './OrderSheet.scss';

const OrderSheet = ({ product: { quantity, product_name, product_image } }) => {
  return (
    <tbody className="orderSheet">
      <tr className="tableRow">
        <td className="tableBody image">
          <div className="imageContainer">
            <img
              className="goodsImage"
              alt={`${product_name}`}
              src={product_image}
            />
          </div>
        </td>
        <td className="tableBody">
          <p>{product_name}</p>
        </td>
        <td className="tableBody">
          <p>{quantity}개</p>
        </td>
      </tr>
    </tbody>
  );
};

export default OrderSheet;

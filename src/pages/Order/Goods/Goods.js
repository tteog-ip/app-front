import React from 'react';
import NumBtn from '../../../components/ProductInfoBox/NumBtn/NumBtn';
import { ReactComponent as Xbutton } from '../../../assets/Xbutton.svg';
import { TRANSELATE } from '../../ProductList/Transelate';
import './Goods.scss';

const Goods = ({
  app: { name, thumbnail_image_url, region, location, status },
  pageType,
}) => {
  return (
    <tbody className="goods">
      <tr className="tableRow">
        <td className="tableBody image">
          <div className="imageContainer">
            <img
              className="goodsImage"
              alt="example_goods"
              src={thumbnail_image_url}
            />
          </div>
        </td>
        <td className="tableBody goods">
          <p>{name}</p>
        </td>
        <td className="tableBody goods">
          <p>
            {TRANSELATE[region]}/{TRANSELATE[location]}
          </p>
        </td>
        <td className="tableBody goods">
          <p>{TRANSELATE[status]}</p>
        </td>
      </tr>
    </tbody>
  );
};

export default Goods;

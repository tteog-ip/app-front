import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductListMenu from './ProductListMenu/ProductListMenu';
import './ProductListNav.scss';
import { API_ADDRESS } from '../../../apiConfig';

const ProductListNav = () => {
  const [isProductNavLoading, setIsProductNavLoading] = useState(false);
  const [productNavData, setProductNavData] = useState([]);

  useEffect(() => {
    (async () => {
      setIsProductNavLoading(true);
      await productNavFetchData();
      setIsProductNavLoading(false);
    })();
  }, []);

  const productNavFetchData = async () => {
    const data = await fetch('/data/product_nav_data.json');
    const res = await data.json();
    setProductNavData(res);
  };

  return (
    <nav className="productListNav">
      <div className="productListNavContainer">
        <Link to="/product-list/all" className="productListNavHead">
          지역
        </Link>
        <ul className="productListMenuContainer">
          <ProductListMenu mainCategory="all" />
          {!isProductNavLoading &&
            productNavData.map(({ id, name, category }) => (
              <ProductListMenu
                key={id}
                mainCategory={name}
                subCategory={category}
              />
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default ProductListNav;

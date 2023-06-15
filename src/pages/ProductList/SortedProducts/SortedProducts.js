import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SortSelectArea from '../ProductsSorted/SortSelectArea/SortSelectArea';
import Product from '../Product/Product';
import ModalBuyNow from '../ModalBuyNow/ModalBuyNow';
import { TRANSELATE } from '../Transelate';
import { API_ADDRESS } from '../../../apiConfig';
import './SortedProducts.scss';

const SortedProducts = () => {
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const { mainCategory, subCategory } = useParams();
  const [isPopModal, setIsPopModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const fetchData = useCallback(async () => {
    let address;
    if (mainCategory === 'all') {
      address = API_ADDRESS.product_all;
    } else {
      address = subCategory
        ? `${API_ADDRESS.products_location}${subCategory}`
        : `${API_ADDRESS.products_region}${mainCategory}`;
    }
    await fetch(address)
      .then(res => res.json())
      .then(res => {
        setProductsList(res.apts_list);
      });
  }, [mainCategory, subCategory]);

  useEffect(() => {
    (async () => {
      setIsProductLoading(true);
      await fetchData();
      setIsProductLoading(false);
    })();
  }, [fetchData, subCategory, mainCategory]);

  const checkCategory = (name, category) =>
    !!subCategory
      ? name === mainCategory && category === subCategory
      : name === mainCategory;

  return (
    !isProductLoading && (
      <div className="sortedProducts">
        <div className="sortedProductsHead">
          <div className="sortedProductsTitle">
            {`${TRANSELATE[mainCategory]}`}
            {subCategory && ` > ${TRANSELATE[subCategory]}`}
          </div>
        </div>
        <div className="sortedProductsContainer">
          {productsList.length ? (
            productsList.map(el => <Product el={el} key={el.id} id={el.id} />)
          ) : (
            <div className="nullContentTable">
              <p>주택이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default SortedProducts;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductListNav from './ProductListNav/ProductListNav';
import ProductsMain from './ProductsMain/ProductsMain';
import SortedProducts from './SortedProducts/SortedProducts';
import './ProductList.scss';

const ProductList = () => {
  return (
    <div className="productList">
      <ProductListNav />
      <Routes>
        <Route path="/" element={<ProductsMain />} />
        <Route path="/:mainCategory" element={<SortedProducts />} />
        <Route
          path="/:mainCategory/:subCategory"
          element={<SortedProducts />}
        />
      </Routes>
    </div>
  );
};

export default ProductList;

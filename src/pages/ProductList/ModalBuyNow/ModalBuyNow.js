import React from 'react';
import '../ModalBuyNow/ModalBuyNow.scss';
import ProductInfoBox from '../../../components/ProductInfoBox/ProductInfoBox';

const ModalBuyNow = ({ setIsPopModal, infoTag, product }) => {
  const clickRemoveModal = () => {
    setIsPopModal(prev => !prev);
  };

  return (
    <div className="popUp">
      <button className="closeBtn" type="button" onClick={clickRemoveModal}>
        <i className="fas fa-times" />
      </button>
      <div className="inner">
        <div className="imageBox">
          <img
            className="imageMain"
            src={product.thumbnail_image_url}
            alt="product"
          />
          <div className="smallImagesLine">
            <div className="smallImageBox">
              <img
                className="smallImage"
                src={product.thumbnail_image_url}
                alt="product to small"
              />
            </div>
          </div>
        </div>
        <ProductInfoBox
          key={product.id}
          productId={product.id}
          koreanName={product.korean_name}
          sugarLevel={product.sugar_level}
          price={product.price}
          infoTag={product.description}
          isVegan={product.vegan_or_not}
          thumbnailImg={product.thumbnail_image_url}
        />
      </div>
    </div>
  );
};
export default ModalBuyNow;

const BASE_URL = 'http://a242c0b307a2948f3be5f9bf864aa8da-215129755.ap-northeast-2.elb.amazonaws.com';

export const API_ADDRESS = {
  product_main: `${BASE_URL}/products?region=seoul&?offset=1&limit=5`,
  product_all: `${BASE_URL}/products`,
  products: `${BASE_URL}/products/`,
  products_region: `${BASE_URL}/products?region=`,
  products_location: `${BASE_URL}/products?location=`,
  order_cart: `${BASE_URL}/orders/cart`,
  order_fail: `${BASE_URL}/orders/fail`,
  sign_in: `${BASE_URL}/users/signin`,
  sign_up: `${BASE_URL}/users/signup`,
  id_check: `${BASE_URL}/users/idcheck`,
  order_checkout: `${BASE_URL}/orders/checkout`,
};

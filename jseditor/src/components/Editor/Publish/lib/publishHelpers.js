import { Product } from './flowTypes';

export const getProductBasedOnAsin = (
  products: Array<Product>,
  asin: string
) => {
  return products.find(item => item.asin == asin);
};

export const removeProduct = (
  products: Array<Product>,
  asinToRemove: string
) => {
  return products.filter(item => item.asin !== asinToRemove);
};

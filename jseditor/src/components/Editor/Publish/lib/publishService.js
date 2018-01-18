import jquery from 'jquery';
import { base } from 'lib/firebase';
import isoFetch from 'isomorphic-fetch';

export const loadUsers = async blogUrl => {
  const data = await jquery.ajax({
    url: blogUrl + '/admin/users',
    crossDomain: true,
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    }
  });
  return data.users;
};

export const getScheduledPosts = async () => {
  return await base.fetch('posts', {
    context: this,
    asArray: true,
    queries: {
      orderByChild: 'status',
      equalTo: 'publish'
    }
  });
};

export const searchProducts = async (searchValue, searchCriteria, blogUrl) => {
  const searchCriteriaMap = {
    0: 'asin',
    1: 'keywords'
  };

  const url = `${blogUrl}/admin/amazon/products?criteria=${
    searchCriteriaMap[searchCriteria]
  }&searchValue=${searchValue}`;
  let response = await isoFetch(url, {
    credentials: 'include'
  });

  return response.json();
};

export const addProductToBackend = async (product, blogUrl, postId) => {
  let data = {
    post_id: postId,
    asin: product.asin,
    title: product.title,
    image: product.image,
    price: product.price
  };

  return jquery.ajax({
    url: `${blogUrl}/admin/amazon/product`,
    type: 'POST',
    dataType: 'json',
    data: data,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
};

export const removeProductFromBackend = async (
  blogUrl,
  ecommerceId,
  postId
) => {
  let data = {
    post_id: postId,
    ecommerce_id: ecommerceId
  };

  return jquery.ajax({
    url: `${blogUrl}/admin/amazon/product`,
    type: 'DELETE',
    dataType: 'json',
    data: data,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
};

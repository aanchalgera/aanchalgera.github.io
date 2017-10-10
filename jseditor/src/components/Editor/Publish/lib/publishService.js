import jquery from 'jquery';
import { base } from 'lib/firebase';

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
  }

  const url = `${blogUrl}/admin/amazon/products?criteria=${searchCriteriaMap[searchCriteria]}&searchValue=${searchValue}`;
  let response = await isoFetch(url, {
    credentials: 'include'
  });

  return response.json();
}

export const addProductToBackend = async (product, blogUrl, postId) => {
  let data = {
    post_id: postId,
    asin: product.asin,
    title: product.title,
    image: product.image,
    price: product.price
  };

  let response = {};

  try {
    let result = await jquery.ajax({
      url: `${blogUrl}/admin/amazon/product`,
      type: 'POST',
      dataType: 'json',
      data: data,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    });

    response['ecommerceId'] = result['ecommerceId'];
    return response;
  } catch () {
    response['error'] = 'something went wrong';
    return response;
  }
}

export const removeProductFromBackend = async (blogUrl, ecommerceId, postId) => {
  let data = {
    post_id: postId,
    ecommerce_id: ecommerceId
  }

  await jquery.ajax({
    url: `${blogUrl}/admin/amazon/product`,
    type: 'DELETE',
    dataType: 'json',
    data: data,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
  });
}

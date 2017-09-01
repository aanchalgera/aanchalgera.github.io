import jquery from 'jquery';
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

export const loadCategories = async (blogUrl, postType) => {
  let response = await isoFetch(`${blogUrl}/admin/api/categories/${postType}`, {
    credentials: 'include'
  });
  let categories = response.json();
  return categories;
};

export const loadTags = async (blogUrl, input) => {
  let response = await isoFetch(`${blogUrl}/admin/api/tags?keyword=${input}`, {
    credentials: 'include'
  });
  let tags = response.json();
  return tags;
};

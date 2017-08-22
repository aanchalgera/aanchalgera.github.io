import jquery from 'jquery';

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

export const loadCategories = (blogUrl, postType) => {
  return jquery.ajax({
    url: `${blogUrl}/admin/api/categories/${postType}`,
    crossDomain: true,
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    }
  });
};

export const loadTags = (blogUrl, keyword) => {
  return jquery.ajax({
    url: `${blogUrl}/admin/api/tags?keyword=${keyword}`,
    crossDomain: true,
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    }
  });
};

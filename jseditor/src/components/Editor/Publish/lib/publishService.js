import jquery from 'jquery';

export const loadUsers = (blogUrl) => {
  return jquery.ajax({
    url: blogUrl + '/admin/users',
    crossDomain: true,
    dataType : 'json',
    xhrFields: {
      withCredentials: true
    }
  });
};

export const loadCategories = (blogUrl, postType) => {
  return jquery.ajax({
	url: `${blogUrl}/admin/api/categories/${postType}`,
    crossDomain: true,
    dataType : 'json',
    xhrFields: {
      withCredentials: true
	  }
  });
};
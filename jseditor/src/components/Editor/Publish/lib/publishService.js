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

export const loadTags = async (blogUrl, input) => {
  let response = await isoFetch(`${blogUrl}/admin/api/tags?keyword=${input}`, {
    credentials: 'include'
  });
  let tags = response.json();
  return tags;
};

export const getScheduledPosts = async base => {
  return await base.fetch('posts', {
    context: this,
    asArray: true,
    queries: {
      orderByChild: 'status',
      equalTo: 'publish'
    }
  });
};

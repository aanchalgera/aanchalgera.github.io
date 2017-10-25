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

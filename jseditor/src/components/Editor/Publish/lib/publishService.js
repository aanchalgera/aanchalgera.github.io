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

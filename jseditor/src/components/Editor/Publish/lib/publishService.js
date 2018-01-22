import { base } from 'lib/firebase';
import isoFetch from 'isomorphic-fetch';

export const loadUsers = async blogUrl => {
  const data = await isoFetch(`${blogUrl}/admin/users`, {
    credentials: 'include'
  }).then(res => res.json());

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

import isoFetch from 'isomorphic-fetch';

import { mapPostType } from './helpers';

export const loadAllCategories = async (blogUrl, postType, siteName = '') => {
  const apiPostType = mapPostType(postType);
  let response = await isoFetch(
    `${blogUrl}/admin/api/categories/${apiPostType}`,
    {
      credentials: 'include'
    }
  );
  let categories = response.json();
  return categories;
};

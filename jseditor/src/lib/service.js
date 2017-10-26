import isoFetch from 'isomorphic-fetch';

import { mapPostType } from './helpers';

export const loadAllCategories = async (siteUrl, postType, siteName = '') => {
  const apiPostType = mapPostType(postType);
  let response = await isoFetch(
    `${siteUrl}/admin/api/${siteName}/categories/${apiPostType}`,
    {
      credentials: 'include'
    }
  );
  let categories = response.json();
  return categories;
};

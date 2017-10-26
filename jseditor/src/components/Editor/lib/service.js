import isoFetch from 'isomorphic-fetch';

export const loadTags = async (siteUrl, input, siteName = '') => {
  let response = await isoFetch(
    `${siteUrl}/admin/api/${siteName}/tags?keyword=${input}`,
    {
      credentials: 'include'
    }
  );
  let tags = response.json();
  return tags;
};

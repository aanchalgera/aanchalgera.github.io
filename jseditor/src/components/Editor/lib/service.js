import isoFetch from 'isomorphic-fetch';

export const loadTags = async (blogUrl, input) => {
  let response = await isoFetch(`${blogUrl}/admin/api/tags?keyword=${input}`, {
    credentials: 'include'
  });
  let tags = response.json();
  return tags;
};

//@flow
import configParams from 'config/configs';
import isoFetch from 'isomorphic-fetch';

export const postImage = async (site: string, params: FormData) => {
  const res = await isoFetch(`${configParams.s3ApiDomain}/v1/${site}/images`, {
    method: 'post',
    headers: {
      Authorization: `${configParams.s3ApiKey}`
    },
    body: params
  });

  return res.json();
};

export const putImage = async (site: string, params: { url: string }) => {
  const res = await isoFetch(`${configParams.s3ApiDomain}/v1/${site}/images`, {
    method: 'PUT',
    headers: {
      Authorization: `${configParams.s3ApiKey}`
    },
    body: JSON.stringify(params)
  });

  return res.json();
};

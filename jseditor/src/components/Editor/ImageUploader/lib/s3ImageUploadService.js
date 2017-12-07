//@flow
import configParams from 'config/configs';
import isoFetch from 'isomorphic-fetch';

export const postImages = async (site: string, params: FormData) => {
  const res = await isoFetch(`${configParams.s3ApiDomain}/v1/${site}/images`, {
    method: 'post',
    headers: {
      Authorization: `${configParams.s3ApiKey}`
    },
    body: params
  });

  return res.json();
};

//@flow
import configParams from 'config/configs';
import isoFetch from 'isomorphic-fetch';

export const postImages = async (params: Object) => {
  const res = await isoFetch(`${configParams.s3ApiDomain}/images`, {
    method: 'post',
    headers: {
      Authorization: `${configParams.s3ApiKey}`
    },
    body: params
  });

  return res.json();
};

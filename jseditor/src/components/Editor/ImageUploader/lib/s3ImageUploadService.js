//@flow
import configParams from 'config/configs';
import isoFetch from 'isomorphic-fetch';

export const postImages = async (site: string, params: FormData) => {
  const res = await isoFetch(`http://dev.aml.com:8080/v1/${site}/images`, {
    method: 'post',
    headers: {
      Authorization: `${configParams.s3ApiKey}`
    },
    body: params
  });

  return res.json();
};

export const putImages = async (site: string, params: FormData) => {
  const res = await isoFetch(`http://dev.aml.com:8080/v1/${site}/images`, {
    method: 'PUT',
    headers: {
      Authorization: `${configParams.s3ApiKey}`
    },
    body: JSON.stringify(params)
  });

  return res.json();
};

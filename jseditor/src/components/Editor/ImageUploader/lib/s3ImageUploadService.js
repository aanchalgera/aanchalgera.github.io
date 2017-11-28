import configParams from 'config/configs';

export const postImages = (params) => {
  return fetch(`${configParams.s3ApiDomain}/images/`, {
    method: 'post',
    headers: {
      Authorization: `API_KEY ${configParams.s3ApiKey}`,
    },
    body: params
  });
};

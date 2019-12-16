/* eslint-disable prettier/prettier */
import { apiBaseUrl } from '../utils/urls';


const buildHeaders = (additionalHeaders, token) => {
  const authHeaders = token
    ? {
      token: `${token}`,
    }
    : {};
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...authHeaders,
    ...additionalHeaders,
  };
};

const buildUrl = (path, params) => {
  let url = `${apiBaseUrl}${path}`;
  url = params ? `${apiBaseUrl}${path}${params}` : url;
  return url;
};

const apiWrapper = async request => {
  const {
    path,
    params,
    body,
    method = 'GET',
    headers: suppliedHeaders = {},
    token = null,
  } = request;

  if (!path) {
    throw new Error("'path' property not specified for fetch call");
  }
  const url = buildUrl(path, params);
  const fetchConfig = {
    method,
    headers: buildHeaders(suppliedHeaders, token),
    body: JSON.stringify(body),
  };
  const response = await fetch(url, fetchConfig);
  console.log('url:', url);
  console.log('fetchconfig:', fetchConfig);
  console.log('response:', response);
  if (response.ok) {
    return response;
  }
  throw response;
};


export default apiWrapper;

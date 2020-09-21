import axios from 'axios';
import { getState } from '@redux-store/stores';
import { combineUrlParams } from '@utils/common';

const authPath = '/auth/oauth';
const originUrl = window.location.origin;
const pathname = window.location.pathname;
const search = window.location.search;

const HOST_AUTH = 'https://5f68053038ce8700163989ff.mockapi.io/';
const AUTH_LOGIN = combineUrlParams(
  `${HOST_AUTH}${authPath}/authorize`,
  {
    client_id: 'isofh',
    response_type: 'code',
    redirect_uri: originUrl,
    state: encodeURIComponent(`${pathname}${search}`),
  },
);

const client = axios.create({
  baseURL: `${HOST_AUTH}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
client.interceptors.request.use(async (config) => {
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const access_token = urlParams.get('access_token');

  try {
    const state = getState();
    const { auth: { auth = {} } = {} } = state;
    let access_token;
    if (auth) {
      access_token = auth.access_token;
    }

    // if (access_token !== undefined && access_token !== null) {
    //   token = access_token;
    // }\

    if (access_token) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + access_token,
      };
    }

    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

// Response interceptor
client.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      window.location.href =
        '/logout?redirect=' + encodeURIComponent(AUTH_LOGIN);
      return Promise.reject();
    }
    return response;
  },
  (error) => {
    // if (error.response.status === 401) {
    //   window.location.href =
    //     '/logout?redirect=' + encodeURIComponent(AUTH_LOGIN);
    // }
    return Promise.reject(error);
  },
);
export { client, HOST_AUTH, AUTH_LOGIN };

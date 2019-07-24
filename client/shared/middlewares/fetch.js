import 'whatwg-fetch';
import { prop } from 'lodash/fp';


const fetch = self.fetch.bind(self);

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw response;
};

const deserialize = response => {
  if (!response.headers) {
    return Promise.resolve({
      errors: [{
        field: 'default',
        message: response.toString(),
      }],
    });
  }
  const header = response.headers.get('Content-Type') || '';
  if (header.indexOf('application/json') > -1) {
    return response.json();
  }
  if (header.indexOf('application/octet-stream') > -1) {
    return response.arrayBuffer();
  }
  return response.text();
};

const successBuffer = (next, action) => (data) => {
  return next({
    ...action,
    payload: data,
  });
};

const handleSuccess = ({ showLoading }) => (next, action) => response =>
  deserialize(response)
    .then(successBuffer(next, action, showLoading));

export default () => next => action => {
  const { payload } = action;
  if (payload) {
    const {
      url,
      isApi,
      showServerError,
      showLoading = true,
      ...options
    } = payload;

    if (isApi) {
      const body = prop('body')(options);
      const presetPromise = Promise.resolve(body);
      return presetPromise.then((res) => fetch(url, {
        ...options,
        body: res,
        headers: {
          ...options.headers,
          'accept-language': 'zh',
        },
      }).then(checkStatus, (e) => {
        const message = prop('message')(e);
        const safari = 'Access-Control-Allow-Origin';
        const firefox = 'NetworkError when attempting to fetch resource.';
        const edge = '无法 fetch';
        const chrome = 'Failed to fetch';
        if (message.match(safari) ||
          message.match(firefox) ||
          message.match(edge) ||
          message.match(chrome)) {
          location.replace(`${window.CONFIG.API_BASE_URL}/redirect`);
        } else {
          throw e;
        }
      }).then(
        handleSuccess({ showLoading })(next, action),
      ));
    }
  }
  return next(action);
};

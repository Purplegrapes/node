import qs from 'qs';
import {
  some,
  mapValues,
  isNull,
  forEach as orginalForEach,
  isArray,
  prop,
  includes,
} from 'lodash/fp';

const forEach = orginalForEach.convert({ cap: false });

const { API_BASE_URL } = global.CONFIG;
const { File } = global;

const apiBaseUrl = API_BASE_URL;


const commonFetch = (method, url, data, options) => {
  let processedData = data;
  if (data && !isArray(processedData)) {
    processedData = mapValues(value => (isNull(value) ? 'null' : value))(data);
  }
  let finalData;
  let headers = {
    'content-type': 'application/json',
  };
  if (some(item => item instanceof File, processedData)) {
    finalData = new FormData();
    forEach((value, key) => {
      finalData.append(key, value);
    })(processedData);
    headers = {};
  } else if (processedData) {
    finalData = JSON.stringify(processedData);
  }
  console.log(finalData);
  return {
    ...options,
    url: `${apiBaseUrl}${url}`,
    credentials: includes('localhost')(apiBaseUrl) ? 'omit' : 'include',
    isApi: true,
    method,
    headers,
    body: finalData,
  };
};

export const read = (url, query, options) =>
  commonFetch(
    'GET',
    query ? `${url}?${qs.stringify(query, { arrayFormat: 'brackets' })}` : url,
    null,
    options,
  );

export const post = (url, data, options) =>
  commonFetch('POST', url, data, options);

export const put = (url, data, options) =>
  commonFetch('PUT', url, data, options);

export const patch = (url, data, options) =>
  commonFetch('PATCH', url, data, options);

export const del = (url, data, options) =>
  commonFetch(
    'DELETE',
    data ? `${url}?${qs.stringify(data, { arrayFormat: 'brackets' })}` : url,
    null,
    options,
  );



import axios from 'axios';


var baseUrl = 'http://localhost:8000/api/v1/';


const api = axios.create({
  baseURL: baseUrl, // Your API's base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // You can add other default headers here
  },
});

const makeRequest = async (
  method,
  url,
  data = null,
  params = null,
  token = null,
  multipart,
) => {
  const config = {
    method,
    url,
    // data,
    params,
    headers: {
      ...api.defaults.headers,
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };

  console.log(data, 'DataINLogi')
  if (data) {
    config['data'] = data;
  }

  if (multipart === 'multipart') {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  console.log(config, 'multipart');

  try {
    const response = await api.request(config);

    console.log(response, 'axiosResponse');
    return response;
  } catch (err) {
    console.log(err, 'makeRequest');
    throw err;
  }
};

// *

const getHelper = async (url, params, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  try {
    const response = await axios.get(baseUrl + url, {
      params,
      headers,
    });

    console.log(response, 'axiosResponse', url, params)
    return response;
  } catch (err) {
    console.log(err, 'axiosResponseErr')
    throw err;
  }
};

const postHelper = (url, data, params, token, multipart) =>
  makeRequest('post', url, data, params, token, multipart);

const putHelper = (url, data, params, token, multipart) =>
  makeRequest('put', url, data, params, token, multipart);

const deleteHelper = (url, data, params, token) =>
  makeRequest('delete', url, data, params, token);

const patchHelper =  (url, data, params, token) =>
  makeRequest('patch', url, data, params, token);

export {getHelper, postHelper, putHelper, deleteHelper, patchHelper};

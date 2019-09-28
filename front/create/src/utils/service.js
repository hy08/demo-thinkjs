import { request, requestStatic } from './request';

export function postCmd(url, data) {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export function putCmd(url, data) {
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export function getCmd(url, params) {

  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => {
      if (params[key] instanceof Array) {
        params[key].forEach(p => paramsArray.push(key + '=' + p));
      } else {
        paramsArray.push(key + '=' + params[key])
      }
    })
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  // console.log("url:", url);
  return request(url, {
    method: 'GET'
  });
}

export function deleteCmd(url) {
  return request(url, {
    method: 'DELETE'
  });
}

export function _deleteCmd(url, data) {
  return request(url, {
    method: 'DELETE',
    body: JSON.stringify(data)
  });
}

export function getStatic(url) {
  // console.log("url:", url);
  return requestStatic(url, {
    method: 'GET'
  });
}
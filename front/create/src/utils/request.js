import fetch from 'dva/fetch';
import { message } from 'antd';
import * as util from './util';

var requests = [];

message.config({
  maxCount: 3
})

function checkRequest(response, request) {
  console.log("checkRequest begin", request, requests);
  var findIndex = requests.findIndex(r => r.method === request.method && r.url === request.url && r.time === request.time);
  if (findIndex < 0) {
    throw "response invalid";
  }

  console.log("checkRequest findIndex", findIndex);

  for (var i = 0; i < requests.length;) {
    if (requests[i].method == request.method && requests[i].url == request.url && requests[i].time <= request.time) {
      requests.splice(i, 1);
    } else {
      i++;
    }
  }

  console.log("checkRequest end", request, requests);
  return response
}

function parseJSON(response) {
  // 后台302跳转时的处理
  if (response.headers.status === 302) {
    window.location.href = response.headers.location;
  }
  if (!!response.redirected) {
    window.location.href = response.url;
  }
  if (response.status === 204) {
    return {};
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    return response.text();
  };
}

function checkData(data) {
  if (!!data.code && !!data.message) {
    let error = `${data.message}`;
    message.error(error);
    return { error }
  }

  // rap2 返回错误
  if (!!data.errMsg && !data.isOk) {
    let error = data.errMsg;
    message.error(error);
    return { error }
  }
  // rap2 返回数据是数组时的bug
  if (data.hasOwnProperty('_root_')) {
    return data['_root_'];
  }
  return data;
}

function checkStatus(response) {
  // console.log("checkStatus", response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  else if (response.status === 500) {
    return response;
  }

  var error = "";
  if (response.status === 404) {
    error = "请求路由不存在！"
  } else if (response.status === 403) {
    error = "请求被禁止！"
  } else if (response.status === 401) {
    error = "请求没有权限！"
  } else if (response.status === 400) {
    error = "请求无效！"
  } else if (response.status === 504) {
    error = "请求超时！"
  }
  message.error(error);
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  // 获取页面请求链接，查看是否有微服务限制参数，若有限制且当前请求不在规定微服务内，则不予处理
  let requestServer = url.match(/[^?]*/i)[0].split('/')[1];
  let microServices = util.getUrlParam('microservice');
  if (microServices.length > 0 && !microServices.some(s => s == requestServer)) {
    return {
      code: 404,
      error: 'Not found micro service',
    };
  }

  let request = {
    method: options.method,
    url: url.match(/[^?]*/i)[0],
    time: new Date().getTime(),
  }
  requests.push(request);


  return fetch((window.rapUrl || "") + url, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    credentials: 'include',
    redirect: 'follow',
    mode: 'cors',
    ...options
  })
    .then(data => checkRequest(data, request))
    .then(checkStatus)
    .then(parseJSON)
    .then(data => checkData(data))
    .catch(error => ({ error }));
}

export function requestStatic(url, options) {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    credentials: 'include',
    cache: 'no-cache',
    ...options
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch();
}

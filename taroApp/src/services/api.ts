import Taro from '@tarojs/taro';
import qs from 'qs';

const HTTP_ERROR = {
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
  '403': '用户得到授权，但是访问是被禁止的。',
  '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。'
};

/**
 * 检查http状态值
 * @param response
 * @returns {*}
 */
function checkHttpStatus(response: API.Response, resolve, reject) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    resolve(response.data);
  } else {
    const message = HTTP_ERROR[response.statusCode] || `ERROR CODE: ${response.statusCode}`;
    response.data.errorCode = response.statusCode;
    response.data.error = message;
    reject(response.data);
  }
}

export default {
  request(options: any, method?: string) {
    const { url } = options;

    return new Promise((resolve, reject) => {
      Taro.request({
        ...options,
        method: method || 'GET',
        url,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          ...options.header
        }
      }).then((res) => {
        checkHttpStatus(res, resolve, reject);
      });
    });
  },
  get(options: any) {
    return this.request({
      ...options
    });
  },
  post(options: any) {
    return this.request(
      {
        ...options,
        data: qs.stringify(options.data)
      },
      'POST'
    );
  },
  put(options: any) {
    return this.request(
      {
        ...options,
        data: qs.stringify(options.data)
      },
      'PUT'
    );
  },
  delete(options: any) {
    return this.request(
      {
        ...options,
        data: qs.stringify(options.data)
      },
      'DELETE'
    );
  }
};

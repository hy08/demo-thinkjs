import { parse } from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => {
  return parse(window.location.href.split('?')[1]);
};

/**
 * 解析url传入的参数
 * @param {String} paramName 参数名称
 * @return {Array} 该参数所有传值
 */
export const getUrlParam = function (paramName) {
  let urls = decodeURI(window.location.href).split('?');
  let paramValue = [];
  if (urls.length > 1) {
    let params = urls[1].split('&');
    for (const param of params) {
      if (param.split('=')[0] === paramName)
        paramValue.push(param.split('=')[1].replace('#', '').replace('/', ''));
    }
  }
  return paramValue;
}


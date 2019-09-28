/**
 * 解析url传入的参数
 * @param {String} paramName 参数名称
 * @return {Array} 该参数所有传值
 */
export function getUrlParam(paramName) {
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

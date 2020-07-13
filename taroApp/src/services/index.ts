import API from '@/services/api';
const gatwayName = '/api';

// 获取公司信息
export function readCompanyInfo() {
  return API.get({
    url: `${gatwayName}/company`
  });
}
// 获取商品种类信息
export function readCategorys(payload: any) {
  return API.get({
    url: `${gatwayName}/category`,
    data: payload
  });
}
// 获取商品信息
export function readProducts(payload: any) {
  return API.get({
    url: `${gatwayName}/product`,
    data: payload
  });
}
// 获取设备信息
export function readDevices(payload: any) {
  return API.get({
    url: `${gatwayName}/device`,
    data: payload
  });
}
// 新增留言
export function addComment(payload: any) {
  return API.post({
    url: `${gatwayName}/comment`,
    data: payload
  });
}

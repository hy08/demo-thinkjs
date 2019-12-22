import * as service from '../utils/service';
const gatwayName = '/api';

export default {
  namespace: 'model',
  state: {
    company: {},
    devices: [],
    currentRoute: 'index'
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen((location) => {
        let currentRoute = location.pathname.substr(1);
        currentRoute = currentRoute.length === 0 ? 'index' : currentRoute;
        dispatch({
          type: 'saveAppRoute',
          payload: {
            currentRoute: currentRoute
          }
        });
      })
    },
  },
  effects: {
    * getCompany({ payload }, { put, call, select }) {
      let data = yield call(service.getCmd, `${gatwayName}/company`);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_saveCompany', payload: { data: data.data } });
    },
    // 获取商品种类信息
    * getCategorys({ payload, success }, { put, call, select }) {
      let data = yield call(service.getCmd, `${gatwayName}/category`, payload);
      if (!!data.error) {
        return;
      }
      success && success(data.data.data);
    },
    // 获取商品信息
    * getProducts({ payload }, { put, call, select }) {
      let data = yield call(service.getCmd, `${gatwayName}/product`, payload.data);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success(data.data);
    },
    // 获取三个设备信息
    * getDevices({ payload }, { put, call, select }) {
      let data = yield call(service.getCmd, `${gatwayName}/device`, payload.data);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success(data.data);
    },
    // 新增留言
    * createComment({ payload, success }, { put, call, select }) {
      let data = yield call(service.postCmd, `${gatwayName}/comment`, payload);
      if (!!data.error) {
        return;
      }
      success && success();
    },
  },
  reducers: {
    saveAppRoute(state, { payload }) {
      return { ...state, currentRoute: payload.currentRoute };
    },
    _saveCompany(state, { payload }) {
      return { ...state, company: payload.data };
    },
  },
};

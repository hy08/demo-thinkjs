import { readCompanyInfo, readCategorys, readProducts, readDevices, addComment } from '@/services';

export default {
  namespace: 'model',
  state: {
    company: {}
  },
  subscriptions: {},
  effects: {
    *getCompany({}, { put, call }) {
      const data = yield call(readCompanyInfo);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_saveCompany', payload: { data: data.data } });
    },
    // 获取商品种类信息
    *getCategorys({ payload, success }, { put, call, select }) {
      let data = yield call(readCategorys, payload);
      if (!!data.error) {
        return;
      }
      return data.data.data;
    },
    // 获取商品信息
    *getProducts({ payload }, { put, call, select }) {
      let data = yield call(readProducts, payload.data);
      if (!!data.error) {
        return;
      }
      return data.data;
    },
    // 获取设备信息
    *getDevices({ payload }, { put, call, select }) {
      let data = yield call(readDevices, payload.data);
      if (!!data.error) {
        return;
      }
      return data.data;
    },
    // 新增留言
    *createComment({ payload, success }, { put, call, select }) {
      let data = yield call(addComment, payload);
      if (!!data.error) {
        return false;
      }
      return true;
    }
  },
  reducers: {
    _saveCompany(state, { payload }) {
      return { ...state, company: payload.data };
    }
  }
};

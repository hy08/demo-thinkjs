import * as service from '../utils/service';
import { Base64 } from 'js-base64';

const gatwayName = '/api';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    company: {}
  },
  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      let token = localStorage.getItem('token');
      let tokenArray = token.split('.')
      let usera = JSON.parse(Base64.decode(tokenArray[1]))
      yield put({
        type: 'saveCurrentUser',
        payload: usera.userInfo,
      });
      payload && payload.success && payload.success();
    },
    * getCompany({ payload }, { put, call, select }) {
      let data = yield call(service.getCmd, `${gatwayName}/company`);
      if (!!data.error) {
        return;
      }
      yield put({
        type: 'saveCompany',
        payload: data.data,
      });
      payload.success && payload.success();
    },
    * putCompany({ payload }, { put, call, select }) {
      let data = yield call(service.putCmd, `${gatwayName}/company`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({
        type: 'saveCompany',
        payload: data.data,
      });
      payload.success && payload.success();
    },
    * putUser({ payload }, { put, call, select }) {
      let data = yield call(service.putCmd, `${gatwayName}/user`, payload.data);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return { ...state, currentUser: payload || {} };
    },
    saveCompany(state, { payload }) {
      return { ...state, company: payload || {} };
    }
  },
};
export default UserModel;

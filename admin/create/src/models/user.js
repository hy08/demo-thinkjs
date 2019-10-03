// import {  query as queryUsers } from '@/services/user';
import { message } from 'antd';
import { Base64 } from 'js-base64'
import { clearToken } from '../utils/authority';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      // const response = yield call(queryUsers);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
    },

    *checkCurrent(_, { call, put }) {
      let token = localStorage.getItem('token');
      if (!token) {
        message.error('请登录系统')
        return;
      }
      let tokenArray = token.split('.')
      if (tokenArray.length !== 3) {
        message.error('身份验证错误，请重新登录')
        return;
      }
      let payload = JSON.parse(Base64.decode(tokenArray[1]))
      if (Date.now() > payload.exp * 1000) {
        message.error('登录已超时，请重新登录')
        clearToken();
        return;
      }

    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;

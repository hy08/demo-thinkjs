import { Base64 } from 'js-base64'

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      let token = localStorage.getItem('token');
      let tokenArray = token.split('.')
      let payload = JSON.parse(Base64.decode(tokenArray[1]))
      yield put({
        type: 'saveCurrentUser',
        payload: payload.userInfo,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return { ...state, currentUser: payload || {} };
    }
  },
};
export default UserModel;

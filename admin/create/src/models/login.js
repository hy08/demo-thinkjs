import { routerRedux } from 'dva/router';
import * as service from '../utils/service';
import { setAuthority, clearToken } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const gatwayName = '/api';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      let response = yield call(service.postCmd, `${gatwayName}/token`, payload);
      if (!!response.error || !response.data) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error' },
        });
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'ok', token: response.data.token },
        });
        if (response.data.status === 'ok') {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;

          if (redirect) {
            const redirectUrlParams = new URL(redirect);

            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);

              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = redirect;
              return;
            }
          }

          yield put(routerRedux.replace(redirect || '/'));
        }
      }
    },

    *logout(_, { put }) {
      clearToken();
      yield put({
        type: 'user/saveCurrentUser',
        payload: {},
      });
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.token);
      return { ...state, status: payload.status };
    },
  },
};
export default Model;

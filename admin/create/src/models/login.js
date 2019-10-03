import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import * as service from '../utils/service';
import { setAuthority } from '@/utils/authority';
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

          routerRedux.replace(redirect || '/')
        }
      }
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
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

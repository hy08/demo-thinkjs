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
  },
  reducers: {
    saveAppRoute(state, { payload }) {
      return { ...state, currentRoute: payload.currentRoute };
    },
    _saveCompany(state, { payload }) {
      return { ...state, company: payload.data };
    },
    _saveDevices(state, { payload }) {
      let data = [];
      data = payload.list.map((l) => {
        return Object.assign(l, { accessStatus: String(l.accessStatus) });
      });
      return { ...state, devices: data, totalSize: payload.totalSize };
    },
    _addDevice(state, { payload }) {
      let { devices } = state;
      devices.push(payload)
      return { ...state, devices: [...devices] };
    },
    _editDevice(state, { payload }) {
      let { devices } = state;
      for (var i = 0; i < devices.length; i++) {
        if (devices[i].mac === payload.mac) {
          devices[i] = payload;
          break;
        }
      }
      return { ...state, devices: [...devices] };
    },
    _deleteDevice(state, { payload }) {
      let { devices } = state;
      devices = devices.filter(u => u.id !== payload);
      return { ...state, devices: [...devices] };
    },
    _deleteDevices(state, { payload }) {
      let { devices } = state;
      devices = devices.filter(device => {
        return payload.ids.findIndex(id => id === device.id) === -1;
      });
      return { ...state, devices: [...devices] };
    },
    _saveLinkInfo(state, { payload }) {
      return { ...state, linkInfo: [...payload.linkInfo] };
    },
  },
};

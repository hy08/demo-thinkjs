import * as service from '../utils/service';
import { message } from 'antd';
const gatwayName = '/apms';

export default {
  namespace: 'model',
  state: {
    devices: [],
    currentRoute: 'index'
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen((location) => {
        let currentRoute = location.pathname.substr(1);
        currentRoute = currentRoute.length === 0 ? 'index' : currentRoute;
        dispatch({
          type: 'model/saveAppRoute',
          payload: {
            currentRoute: currentRoute
          }
        });
      })
    },
  },
  effects: {
    * deviceList({ payload }, { put, call, select }) {
      let data = yield call(service.getCmd, `${gatwayName}/devices/pages`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_saveDevices', payload: { list: data.list, totalSize: data.totalSize } });
      payload.success && payload.success(data.list)
    },
    * deviceSearch({ payload }, { put, call, select }) {
      let data = yield call(service.getCmd, `${gatwayName}/devices/search`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_saveDevices', payload: { list: data.list, totalSize: data.totalSize } });
      payload.success && payload.success();
    },
    * addDevice({ payload }, { put, call, select }) {
      const data = yield call(service.postCmd, `${gatwayName}/devices`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_addDevice', payload: data });
      payload.success && payload.success();
    },
    * intoNet({ payload }, { put, call, select }) {
      const data = yield call(service.postCmd, `${gatwayName}/devices`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_editDevice', payload: data });
      payload.success && payload.success();
    },
    * updateDevice({ payload }, { put, call, select }) {
      const data = yield call(service.putCmd, `${gatwayName}/devices/`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_editDevice', payload: data });
      payload.success && payload.success();
    },
    * deleteDevice({ payload }, { put, call, select }) {
      const data = yield call(service.deleteCmd, `${gatwayName}/devices/${payload.data}`);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_deleteDevice', payload: payload.data });
    },
    * deleteDevices({ payload }, { put, call, select }) {
      const data = yield call(service._deleteCmd, `${gatwayName}/devices/`, payload.data.ids);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_deleteDevices', payload: payload.data });
      payload.success && payload.success();
    },
    * getDeviceLinkInfo({ payload }, { put, call, select }) {
      const linkInfo = yield call(service.getCmd, `${gatwayName}/device/${payload.id}/linkInfo`);
      if (!!linkInfo.error) {
        return;
      }
      yield put({ type: '_saveLinkInfo', payload: { linkInfo: linkInfo } });
    },
    * updateDeviceLinkInfo({ payload }, { put, call, select }) {
      const data = yield call(service.putCmd, `${gatwayName}/device/${payload.id}/linkInfo`, payload.data);
      if (!!data.error) {
        message.error(data.error.message);
        return;
      }
      yield put({ type: '_saveLinkInfo', payload: { linkInfo: payload.data } });
      payload.success && payload.success();
    },
  },
  reducers: {
    saveAppRoute(state, { payload }) {
      return { ...state, currentRoute: payload.currentRoute };
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

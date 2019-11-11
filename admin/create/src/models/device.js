import * as service from '../utils/service';

const gatwayName = '/api';

const Model = {
  namespace: 'device',
  state: {
    deviceList: [],
    total: 0,
  },
  effects: {
    *createDevice({ payload }, { call, put }) {
      let data = yield call(service.postCmd, `${gatwayName}/device`, payload.data);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
    *readDeviceList({ payload }, { call, put }) {
      let data = yield call(service.getCmd, `${gatwayName}/device`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_saveDeviceList', payload: data });
    },
    *updateDevice({ payload }, { call, put }) {
      let data = yield call(service.putCmd, `${gatwayName}/device/${payload.data.id}`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_updateDevice', payload: data });
    },
    *deleteDevice({ payload }, { call, put }) {
      let data = yield call(service.deleteCmd, `${gatwayName}/device/${payload.data.id}`);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
  },
  reducers: {
    _saveDeviceList(state, { payload }) {
      payload.data.data = payload.data.data.map((row, index) => {
        row.index = index + 1;
        row.key = index + 1;
        return row;
      })
      return { ...state, deviceList: [...payload.data.data], total: payload.data.count };
    },
    _updateDevice(state, { payload }) {
      let { deviceList } = state;
      for (var i = 0; i < deviceList.length; i++) {
        if (deviceList[i].id === payload.data.id) {
          deviceList[i] = { ...deviceList[i], ...payload.data };
          break;
        }
      }
      return { ...state, deviceList: [...deviceList] };
    },
  },
};
export default Model;
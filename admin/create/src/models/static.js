import * as service from '../utils/service';

const gatwayName = '/api';

const Model = {
  namespace: 'static',
  state: {
  },
  effects: {
    *deleteStaticResource({ payload }, { call, put }) {
      let data = yield call(service._deleteCmd, `${gatwayName}/static`, payload.data);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success(data.data.fileId);
    },
  },
  reducers: {
  },
};
export default Model;

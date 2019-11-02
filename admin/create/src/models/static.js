import * as service from '../utils/service';

const gatwayName = '/api';

const Model = {
  namespace: 'static',
  state: {
  },
  effects: {
    *deleteStaticResource({ payload }, { call, put }) {
      let data = yield call(service.deleteCmd, `${gatwayName}/static/${payload.data.id}`);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success(data);
    },
  },
  reducers: {
  },
};
export default Model;

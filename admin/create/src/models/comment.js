import * as service from '../utils/service';

const gatwayName = '/api';

const Model = {
  namespace: 'comment',
  state: {
    commentList: [],
    total: 0,
  },
  effects: {
    *createComment({ payload }, { call, put }) {
      let data = yield call(service.postCmd, `${gatwayName}/comment`, payload.data);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
    *readCommentList({ payload }, { call, put }) {
      let data = yield call(service.getCmd, `${gatwayName}/comment`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_saveCommentList', payload: data });
    },
    *deleteComment({ payload }, { call, put }) {
      let data = yield call(service.deleteCmd, `${gatwayName}/comment/${payload.data.id}`);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
  },
  reducers: {
    _saveCommentList(state, { payload }) {
      payload.data.data = payload.data.data.map((row, index) => {
        row.index = index + 1;
        row.key = index + 1;
        return row;
      })
      return { ...state, commentList: [...payload.data.data], total: payload.data.count };
    },
  },
};
export default Model;
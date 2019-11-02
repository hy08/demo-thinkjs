import * as service from '../utils/service';

const gatwayName = '/api';

const Model = {
  namespace: 'product',
  state: {
    categoryList: [],
    total: 0,
    products: [],
    productTotal:0
  },
  effects: {
    *createCategory({ payload }, { call, put }) {
      let data = yield call(service.postCmd, `${gatwayName}/category`, payload.data);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
    *readCategoryList({ payload }, { call, put }) {
      let data = yield call(service.getCmd, `${gatwayName}/category`, payload);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_saveCategoryList', payload: data });
    },
    *updateCategory({ payload }, { call, put }) {
      let data = yield call(service.putCmd, `${gatwayName}/category/${payload.data.id}`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_updateCategory', payload: data });
    },
    *deleteCategory({ payload }, { call, put }) {
      let data = yield call(service.deleteCmd, `${gatwayName}/category/${payload.data.id}`);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
    //创建商品
    *createProduct({ payload }, { call, put }) {
      let data = yield call(service.postCmd, `${gatwayName}/product`, payload.data);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
  },
  reducers: {
    _saveCategoryList(state, { payload }) {
      payload.data.data = payload.data.data.map((row, index) => {
        row.index = index + 1;
        return row;
      })
      return { ...state, categoryList: [...payload.data.data], total: payload.data.count };
    },
    _updateCategory(state, { payload }) {
      let { categoryList } = state;
      for (var i = 0; i < categoryList.length; i++) {
        if (categoryList[i].id === payload.data.id) {
          categoryList[i] = { ...categoryList[i], ...payload.data };
          break;
        }
      }
      return { ...state, categoryList: [...categoryList] };
    },
  },
};
export default Model;

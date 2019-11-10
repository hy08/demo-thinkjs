import * as service from '../utils/service';

const gatwayName = '/api';

const Model = {
  namespace: 'product',
  state: {
    categoryList: [],
    total: 0,
    products: [],
    productTotal: 0
  },
  effects: {
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
    //商品
    *createProduct({ payload }, { call, put }) {
      let data = yield call(service.postCmd, `${gatwayName}/product`, payload.data);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
    *readProductList({ payload }, { call, put }) {
      let data = yield call(service.getCmd, `${gatwayName}/product`, payload.data);
      if (!!data.error) {
        return;
      }
      yield put({ type: '_saveProductList', payload: data });
    },
    *deleteProduct({ payload }, { call, put }) {
      let data = yield call(service.deleteCmd, `${gatwayName}/product/${payload.data.id}`);
      if (!!data.error) {
        return;
      }
      payload.success && payload.success();
    },
  },
  reducers: {
    _saveProductList(state, { payload }) {
      payload.data.data = payload.data.data.map((row, index) => {
        row = { ...row, ...row.category };
        row.index = index + 1;
        row.key = index + 1;
        return row;
      })
      return { ...state, products: [...payload.data.data], productTotal: payload.data.count };
    },
    _saveCategoryList(state, { payload }) {
      payload.data.data = payload.data.data.map((row, index) => {
        row.index = index + 1;
        row.key = index + 1;
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


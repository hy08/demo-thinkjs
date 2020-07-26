import Taro, { Component } from "@tarojs/taro-h5";
import '@tarojs/async-await';
import { Provider } from "@tarojs/redux-h5";

import dva from './dva';
import models from './models/index';
import 'taro-ui/dist/style/index.scss'; // 全局引入一次即可
import './assets/iconFont/iconfont.css';
import './app.less';
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
//   require('nerv-devtools');
// }
import Nerv from 'nervjs';
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/pages/index/index"
});

mountApis({
  "basename": "/",
  "customRoutes": {}
}, _taroHistory);
const dvaApp = dva.createApp({
  initialState: {},
  models
});
const store = dvaApp.getStore();
class App extends Component {
  constructor() {
    super(...arguments);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    Taro._$app = this;
  }
  componentDidMount() {
    this.componentDidShow();
  }
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>
          
                <Router mode={"hash"} history={_taroHistory} routes={[{
        path: '/pages/index/index',
        componentLoader: () => import( /* webpackChunkName: "index_index" */'./pages/index/index'),
        isIndex: true
      }, {
        path: '/pages/money/index',
        componentLoader: () => import( /* webpackChunkName: "money_index" */'./pages/money/index'),
        isIndex: false
      }, {
        path: '/pages/detail/index',
        componentLoader: () => import( /* webpackChunkName: "detail_index" */'./pages/detail/index'),
        isIndex: false
      }, {
        path: '/pages/company/index',
        componentLoader: () => import( /* webpackChunkName: "company_index" */'./pages/company/index'),
        isIndex: false
      }, {
        path: '/pages/message/index',
        componentLoader: () => import( /* webpackChunkName: "message_index" */'./pages/message/index'),
        isIndex: false
      }]} customRoutes={{}} />
                
        </Provider>;
  }
  config = {
    pages: ["/pages/index/index", "/pages/money/index", "/pages/detail/index", "/pages/company/index", "/pages/message/index"],
    debug: process.env.NODE_ENV !== 'production' ? true : false,
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
      // tabBar: {
      //   color: '#7A7E83',
      //   selectedColor: '#c73420',
      //   borderStyle: 'black',
      //   backgroundColor: '#ffffff',
      //   list: [
      //     {
      //       text: '首页',
      //       pagePath: 'pages/index/index',
      //       iconPath: 'assets/img/home.png',
      //       selectedIconPath: 'assets/img/home-select.png'
      //     },
      //     {
      //       text: '产品',
      //       pagePath: 'pages/money/index?type=1',
      //       iconPath: 'assets/img/product.png',
      //       selectedIconPath: 'assets/img/product-select.png'
      //     }
      //   ]
      // }
    } };

  componentWillUnmount() {
    this.componentDidHide();
  }

}
Nerv.render(<App />, document.getElementById('app'));
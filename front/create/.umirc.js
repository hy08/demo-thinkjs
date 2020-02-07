
// ref: https://umijs.org/config/

export default {
  treeShaking: true,
  //处理antd的icon太大问题
  chainWebpack(config, { webpack }) {

    // code split @ant-design/icons
    config.module
      .rule('@ant-design/icons')
      .include.add(require.resolve('@ant-design/icons/lib/dist')).end()
      .use('ant-icon')
      .loader('webpack-ant-icon-loader');
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      title: {
        defaultTitle: '三艺强'
      },
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  "externals": {
    jquery: 'jQuery'
  },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      title: '三艺强',
      routes: [
        {
          path: '/',
          exact: true,
          title: '首页',
          component: './Index/index',
        },
        {
          title: '关于我们',
          path: '/about/:id',
          exact: true,
          component: './about/index',
        },
        {
          title: '产品展示',
          path: '/products/:categoryCode?/:productId?',
          component: './products/index',
        },
        {
          title: '设备展示',
          path: '/devices/:id?',
          component: './devices/index',
        },
        {
          title: '联系我们',
          path: '/linkus/:type',
          component: './linkus/index',
        },
        {
          title: '留言',
          path: '/linkus/:type',
          component: './linkus/index',
        },
        {
          component: './404',
        },
      ]
    },
    {
      component: './404',
    },
  ],
  proxy: {
    "/api": {
      "target": "http://localhost:8360",
      "cookieDomainRewrite": "localhost:8360",
      "changeOrigin": true,
      "logLevel": "debug"
    },
    '/uploads': {
      target: 'http://localhost:8360',
      cookieDomainRewrite: 'localhost:8360',
      changeOrigin: true,
      logLevel: 'debug',
    },
  }
}

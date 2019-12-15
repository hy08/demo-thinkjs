
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'create',
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
          path: '/linkus',
          component: './linkus/index',
        },
        {
          title: '留言',
          path: '/comment',
          component: './comment/index',
        },
      ]
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


// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  "exportStatic": {},
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
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/',
          exact: true,
          component: 'index',
        },
        {
          path: '/about',
          component: './about/index',
        },
        {
          path: '/products',
          component: './products/index',
        },
        {
          path: '/devices',
          component: './devices/index',
        },
        {
          path: '/linkus',
          component: './linkus/index',
        },
        {
          path: '/comment',
          component: './comment/index',
        },
      ]
    },
  ],
}

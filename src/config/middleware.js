const path = require('path');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|uploads|favicon\.ico|index\.html|admin\.html)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev,
      error(err, ctx) {
        console.log(err);
        // ctx.fail(500, '服务器异常');
      },
      contentType(ctx) {
        // All request url starts of /api or request header contains `X-Requested-With: XMLHttpRequest` will output json error
        const APIRequest = /^\/api/.test(ctx.request.path);
        const AJAXRequest = ctx.is('X-Requested-With', 'XMLHttpRequest');
        return APIRequest || AJAXRequest ? 'json' : 'html';
      },
      // templates: {
      //   404: path.join(think.ROOT_PATH, 'view/error_404.html'),
      // }
    }
  },
  {
    handle: 'payload',
    options: {
      uploadDir: path.join(think.ROOT_PATH, 'runtime/data')
    }
  },
  {
    handle: 'router',
    options: {
      suffix: ['.html']
    }
  },
  'logic',
  'controller'
];

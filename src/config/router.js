module.exports = [
  ['/', 'index/index'],
  // RESTFUL
  ['/api/login', 'api/user?type=login', 'rest'],
  [/\/api\/(\w+)(?:\/(.*))?/, 'api/:1?id=:2', 'rest'],
];

module.exports = [
  ['/', 'index/index'],
  // RESTFUL
  [/\/api\/(\w+)(?:\/(.*))?/, 'api/:1?id=:2', 'rest'],
];

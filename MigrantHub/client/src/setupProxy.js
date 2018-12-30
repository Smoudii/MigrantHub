const proxy = require('http-proxy-middleware');
require('dotenv').config();

module.exports = function (app) {
  app.use(proxy('/api/', { target: "http://35.203.28.214:5000" || process.env.PROXY }));
  app.use(proxy('/uploads/', { target: "http://35.203.28.214:5000" || process.env.PROXY }));
};

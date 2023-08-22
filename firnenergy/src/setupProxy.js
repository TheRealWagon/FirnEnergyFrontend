const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://authentication.eniris.be',
      changeOrigin: true,
      secure: false,
    })
  );
};
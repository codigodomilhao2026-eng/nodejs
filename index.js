const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/', createProxyMiddleware({
  target: 'https://api.bybit.com',
  changeOrigin: true,
  onProxyRes: (proxyRes) => {
    proxyRes.headers['access-control-allow-origin'] = '*';
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy Lisboa IA Ativo na porta ${PORT}`));

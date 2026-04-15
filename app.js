const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// O segredo é o '/' para garantir que qualquer caminho seja repassado
app.use('/', createProxyMiddleware({
  target: 'https://api.bybit.com',
  changeOrigin: true,
  secure: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['access-control-allow-origin'] = '*';
  },
  onError: function (err, req, res) {
    res.status(500).json({ error: 'Erro no Proxy Lisboa IA', message: err.message });
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy rodando na porta ${PORT}`));

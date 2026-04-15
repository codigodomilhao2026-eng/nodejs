const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Motor do Proxy que redireciona tudo para a Bybit
app.use('/', createProxyMiddleware({
  target: 'https://api.bybit.com',
  changeOrigin: true,
  onProxyRes: (proxyRes) => {
    // Permite que o Base44 acesse os dados sem bloqueio de CORS
    proxyRes.headers['access-control-allow-origin'] = '*';
    proxyRes.headers['access-control-allow-methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
    proxyRes.headers['access-control-allow-headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
  }
}));

// Porta dinâmica para o Railway (3000 ou a que ele fornecer)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy Lisboa IA rodando na porta ${PORT} - Destravando acesso Bybit`);
});

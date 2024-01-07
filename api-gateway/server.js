const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const prom = require('prom-client');
const collectDefaultMetrics = prom.collectDefaultMetrics();
const app = express();

// Define routes and their ports
const routes = {
  '/customers': 'http://localhost:5001',
  '/orders': 'http://localhost:5002',
  '/books': 'http://localhost:5000'
};

// Create a proxy for each route
for (const route in routes) {
  const target = routes[route];
  app.use(route, (req, res, next) => {
    res.locals.startEpoch = Date.now();
    res.locals.path = req.path;
    next();
  }, createProxyMiddleware({ target }));
}

// Define Prometheus metrics
const httpRequestDurationMicroseconds = new prom.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 2.5, 3],
});

const totalRequests = new prom.Counter({
  name: 'api_gateway_total_requests',
  help: 'Total number of requests to the API Gateway',
  labelNames: ['route'],
});

// Middleware for collecting metrics
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  res.locals.path = req.path;
  next();
});

app.use((req, res, next) => {
  res.on('finish', () => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch;
    httpRequestDurationMicroseconds
      .labels(req.method, res.locals.path, res.statusCode)
      .observe(responseTimeInMs / 1000);

    totalRequests.labels(res.locals.path).inc();
  });
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the API Gateway!');
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', prom.register.contentType);
    res.end(await prom.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// Start the proxy
const PORT = 5004;
app.listen(PORT, () => {
  console.log(`Api-gateway server listening on port ${PORT}`);
});

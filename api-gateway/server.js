const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
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

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the API Gateway!');
});

// Export the app so it can be used in other files
module.exports = app;

// Start the server only if this script is run directly
if (require.main === module) {
  const PORT = 5004;
  app.listen(PORT, () => {
    console.log(`Api-gateway server listening on port ${PORT}`);
  });
}

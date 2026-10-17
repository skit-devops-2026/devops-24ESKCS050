const express = require('express');
const path = require('path');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Prometheus metrics =====
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests received',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    const labels = { method: req.method, path: req.path, status: res.statusCode };
    httpRequestCounter.inc(labels);
    end(labels);
  });
  next();
});

// ===== Health check =====
// GET /health returns the running commit SHA so we can confirm which
// build is actually live. GIT_SHA is injected at container build/run time.
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    commit: process.env.GIT_SHA || process.env.RENDER_GIT_COMMIT || 'unknown',
    uptimeSeconds: process.uptime(),
  });
});

// ===== Metrics =====
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// ===== Static site =====
app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(PORT, () => {
  console.log(`Campus Room Booking server listening on port ${PORT}`);
});

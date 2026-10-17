# Zenith

## Author

| Roll No.   | Name         | GitHub username    |
| ---------- | ------------ | ------------------ |
| 24ESKCS050 | Ankit P|  ankitpravin4-hue|

## About

Zenith is a college management website designed to manage and organize college resources such as classes, laboratories, and auditoriums. It provides a web-based interface to make college resource management more convenient and accessible.

## Tech stack

- Frontend: HTML, CSS, JavaScript, React
- Backend: Node.js (Express)
- Database: Not specified

## Running locally

```bash
make install
make run
```

Serves the site (and the `/health` and `/metrics` endpoints below) at `http://localhost:3000`.

## Running with Docker

```bash
make docker-build
make docker-up
```

or directly:

```bash
docker compose up --build
```

## Live URL

https://devops-24eskcs050.onrender.com

## Health endpoint

`GET /health` returns the running commit SHA. See `Makefile` and the milestone sheet for why this is required.

## Metrics

`GET /metrics` returns Prometheus-format metrics (HTTP request counts/latency plus default Node.js process metrics). See `monitoring/prometheus.yml` for the scrape config and `monitoring/dashboard.json` for a Grafana dashboard you can import.

## Kubernetes

Manifests are under `k8s/` (`deployment.yaml`, `service.yaml`). To run locally with `kind`:

```bash
kind create cluster
kubectl apply -f k8s/
kubectl get pods
```

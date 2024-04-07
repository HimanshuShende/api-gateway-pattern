const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();
const port = 3000;

const serviceAUrl = "http://service-a:3001";
const serviceBUrl = "http://service-b:3002";

app.use("/api/data", (req, res) => {
  console.log("Incoming request to /api/data: " + req.method + " " + req.url);
  proxy.web(req, res, { target: `${serviceAUrl}/api/data` }, (err) => {
    console.error("Error forwarding request to service A : " + err.message);
    res.status(500).send("Internal Server Error");
  });
});


app.use("/api/info", (req, res) => {
  console.log("Incoming request to /api/info: " + req.method + " " + req.url);
  proxy.web(req, res, { target: `${serviceBUrl}/api/info` }, (err) => {
    console.error("Error forwarding request to service B : " + err.message);
    res.status(500).send("Internal Server Error");
  });
});

proxy.on("proxyReq", (proxyReq, req, res, options) => {
  console.log(`Received request to ${options.target.href}: ${req.method} ${req.url}`);
});

app.listen(port, () => {
  console.log("API Gateway is running on port " + port);
});

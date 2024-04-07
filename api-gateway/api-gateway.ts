import * as dotenv  from "dotenv";
import express from "express";
import { Express, Request, Response } from "express";
import { ClientRequest, IncomingMessage, ServerResponse } from "http";
import httpProxy from "http-proxy";

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT);
const proxy = httpProxy.createProxyServer();

const serviceAUrl = "http://service-a:3001";
const serviceBUrl = "http://service-b:3002";

app.use("/api/data", (req: Request, res: Response) => {
  proxy.web(req, res, { target: `${serviceAUrl}/api/data` }, (err) => {
    console.error("Error forwarding request to service A : " + err.message);
    res.status(500).send("Internal Server Error");
  });
});

app.use("/api/info", (req: Request, res: Response) => {
  console.log("Incoming request to /api/info: " + req.method + " " + req.url);
  proxy.web(req, res, { target: `${serviceBUrl}/api/info` }, (err) => {
    console.error("Error forwarding request to service B : " + err.message);
    res.status(500).send("Internal Server Error");
  });
});
proxy.on("proxyReq", (proxyReq: ClientRequest, req: IncomingMessage, res: ServerResponse, options: any) => {
    console.log(`Received request to ${options.target.href}: ${req.method} ${req.url}`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at PORT:${port}`);
});
import express from "express";
import { Express, Request, Response } from "express";


const app: Express = express();
const port: number = Number(process.env.PORT);

app.get('/api/info', (req: Request, res: Response) => {
    console.log('Received request to /api/info: ' + req.method + " " + req.url);
  res.status(200).send('Response from Service B');
});

app.listen(port, () => {
  console.log('Service B is running on port ' + port);
});
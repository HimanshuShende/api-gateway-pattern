"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = Number(process.env.PORT) || 3002;
app.get('/api/info', function (req, res) {
    console.log('Received request to /api/info: ' + req.method + " " + req.url);
    res.status(200).send('Response from Service B');
});
app.listen(port, function () {
    console.log('Service B is running on port ' + port);
});

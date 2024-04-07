"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = Number(process.env.PORT);
app.get('/api/data', function (req, res) {
    console.log('Received request to /api/data: ' + req.method + " " + req.url);
    res.status(200).send('Response from Service A');
});
app.listen(port, function () {
    console.log('Service A is running on port ' + port);
});

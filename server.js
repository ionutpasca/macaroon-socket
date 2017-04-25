'use strict';

const config = require('./config/main');
const express = require('express');
const http = require('http');
const logger = require('./config/winston');
const ENV = process.env.NODE_ENV || 'development';

let app = express();
app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);

if(!module.parent) {
	let server = http.createServer(app);
	server.listen(config.port || 3001);
	logger.info(`${config.app.name} is running, listening on port ${config.port}, environment: ${ENV.toLowerCase()}`);
}
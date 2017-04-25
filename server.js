'use strict';

const config = require('./config/main');
const express = require('express');
const http = require('http');
const logger = require('./config/winston');
const ENV = process.env.NODE_ENV || 'development';
const AuthUsersService = require('./app/services/authenticatedUsers');

let app = express();
app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);

let io1 = require('socket.io').listen(config.authUsersSocketPort);

let authService = new AuthUsersService();
io1.sockets.on('connection', socket => {
	logger.info('SOCKET ID', socket.id);
	
	socket.emit('give_data');
	socket.on('user_data', (user) => {
		logger.info('Given data', user);
		authService.userLoggedIn(user);
	});

	socket.on('get_logged_users', () => {
		let loggedUsers = authService.getAuthenticatedUsers();
		socket.emit('logged_users', loggedUsers);
	});
});

if (!module.parent) {
	let server = http.createServer(app);
	server.listen(config.port || 3001);
	logger.info(`${config.app.name} is running, listening on port ${config.port}, environment: ${ENV.toLowerCase()}`);
}
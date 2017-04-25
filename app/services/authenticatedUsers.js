'use strict';

const _ = require('lodash');

class AuthenticatedUsers {
	constructor() {
		this.authenticatedUsers = new Array();
	};

	userLoggedIn(user) {
		this.authenticatedUsers.push(user);
	};

	userLoggedOut(user) {
		_.remove(this.authenticatedUsers, { id: user.id });
	};

	getAuthenticatedUsers() {
		return this.authenticatedUsers;
	};
};

module.exports = AuthenticatedUsers;
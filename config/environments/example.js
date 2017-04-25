module.exports = {
    port: 8082,
    host: '127.0.0.1',
    authUsersSocketPort: 8083,
    app: {
        name: 'Macaroon Socket'
    },
    store: {
        port: 8081,
        host: '127.0.0.1'
    }
};
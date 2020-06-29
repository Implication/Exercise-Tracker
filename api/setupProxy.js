const proxy = require('http-proxy-middleware');

app.use(proxy['/exercise', '/users'], { target: 'http://localhost:8000' }))

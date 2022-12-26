var fs = require('fs');
const http = require('http');
const https = require('https');
const app = require('./app');
require('dotenv').config()
process.env.TZ = 'Asia/Calcutta';
const port = process.env.PORT || 4001;
const IP = process.env.IP || '127.0.0.1';


var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};

const server = http.createServer(app);
const secureServer = https.createServer(credentials,app);

secureServer.listen(6017, () => {
    console.log(`TevisTv listening at http://${IP}:6017`);
})
server.listen(port, () => {
    console.log(`TevisTv listening at http://${IP}:${port}`)
});
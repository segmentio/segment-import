'use strict';

// Initialize server ===========================================================
var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
  , fs = require('fs')
  , os = require('os')
  , port = process.env.PORT || 3000;

// Configuration ===============================================================
app.set('views', __dirname + 'public/views');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.post('/', function (req, res) {  
  fs.appendFile('log.txt', '[' + new Date().toString() + ']' + os.EOL + JSON.stringify(req.body, null, 4), () => undefined);
  console.log('<== POST (stored in log.txt)');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end();
});

// Routes ======================================================================
require('./config/routes.js')(app);

// New relic.
// require('newrelic');

// Listen (start app with node server.js) ======================================
server.listen(port, function() {
  console.log("App is now listening on port " + port);
});
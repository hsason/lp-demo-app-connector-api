const express = require('express');
const app = express();
const nconf = require("nconf");
const fs = require('fs');
const cors = require('cors');
const umsBrigeServer = require("./server/umsBrige");
const domains = require('./server/connector/CsdsProperties');
const https = require('https');
const forceSsl = require('express-force-ssl');

//  configuration from a designated file.
nconf.file({file:"settings.json"});

//load certificates
const key = fs.readFileSync('dev.lpchatforconnectorapi.com.key');
const cert = fs.readFileSync( 'dev.lpchatforconnectorapi.com.crt' );
const ca = fs.readFileSync( 'dev.lpchatforconnectorapi.com.crt' );

const options = {
  key: key,
  cert: cert,
  ca: ca
};
app.use(cors());

https.createServer(options, app).listen(443);
app.domains = domains;

//Force https
app.use(forceSsl);


app.use("/umsbrige", umsBrigeServer);
//Serve our UI
app.use(express.static('dist'));

//http server
app.listen("8282", function() {
  console.log("listening");
  app.isReady = true;
  app.emit("ready", true);
});

module.exports = app;
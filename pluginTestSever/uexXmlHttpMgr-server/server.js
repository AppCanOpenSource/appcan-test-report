var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var os = require('os');
var fs = require('fs');
var util = require('util');
var path = require('path');
var formidable = require('formidable');
var moment = require('moment');
var cookie = require('cookie-parser');
var log4js = require('log4js');
var config = require('./config');

var PORT = config.port;
var app = express();


var logger = getLogger();


app.use(morgan('dev',{"stream": {
    write: function(str) { logger.info(str); }
  }}));
app.set('port', PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cookie());


function currentMoment(){
  return moment().format('YYYY:MM:DD HH:mm:ss');
}

function getLogger(){
  var logger = log4js.getLogger();
  if (config.debug) {
    logger.setLevel('DEBUG');
  }else{
    logger.setLevel('WARN');
  }
  return logger;
}


app.get('/get',function(req,res){
  if (req.method.toLowerCase() != 'get') {
    res.writeHead(400,{'content-type': 'text/plain'});
    res.end('only support GET request!');
    return;
  }

  logger.info("receive GET request");
  logger.info("HEADERS:" + util.inspect(req.headers));
  logger.info("QUERY: " + util.inspect(req.query));
  res.cookie('lastGetTime', currentMoment());
  res.writeHead(200, {'content-type': 'application/json'});
  var json = JSON.stringify({
    requestHeaders: req.headers,
    requestQuery: req.query,
    ts: currentMoment()
  });
  res.end(json);
});

app.post('/post',function(req,res){
  if (req.method.toLowerCase() != 'post') {
    res.writeHead(400,{'content-type': 'text/plain'});
    res.end('only support POST request!');
    return;
  }
  logger.info("POST headers: " + util.inspect(req.headers));
  var contentType = req.headers["content-type"];
  if (contentType.indexOf("multipart/form-data") >= 0) {
    handleFileUpload(req,res);
    return;
  };
  
  logger.info("POST body: " + util.inspect(req.body));
  logger.info("POST params: " + util.inspect(req.params));
  var json = JSON.stringify({
    requestHeaders: req.headers,
    requestBody: req.body,
    requestParams: req.params,
    ts: currentMoment()
  });
  res.cookie('lastPostTime', currentMoment());
  res.writeHead(200, {'content-type': 'application/json'});
  res.end(json);

});

var handleFileUpload = function(req,res){
  logger.info("upload begin");
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';    
  form.uploadDir = "upload/";
  form.keepExtensions = true;
  var progress = -1;
  var values = [],files = [];
  form
    .on('progress',function(bytesReceived, bytesExpected){
      var newProgress = parseInt(bytesReceived / bytesExpected * 10000) / 100;
      if (newProgress != progress && (newProgress == 0 || newProgress == 100|| newProgress > progress + 5)) {
        progress = newProgress;
        logger.debug("progress : " + progress + "%");
      };
    })
    .on('field', function(field, value) {
      values.push({
        field: field,
        value: value
      });
      logger.info("->received value: " + value + "at field: " + field);
    })
    .on('file', function(field, file) {
      files.push({
        field: field,
        fileSize: file.size,
        fileName: file.name
      });
      logger.info("received file :" + file.name + "at field : " + field + ",fileSize: " + file.size);
      fs.unlinkSync(file.path);
    })
    .on('end', function() {
      logger.info('upload done\n');
      var json = JSON.stringify({
        requestHeaders: req.headers,
        requestValues: values,
        requestFiles: files,
        ts: currentMoment()
      });
      res.cookie('lastUploadTime', currentMoment());
      res.writeHead(200, {'content-type': 'application/json'});
      res.end(json);
      
    })
    .on('error',function(err){
      logger.info('ERROR:' + err);
    })
    
    form.parse(req);
}


app.use(function(req, res, next) {
    res.writeHead(400,{'content-type': 'text/plain'});
    res.end('404 Not Found');
});

var ifaces = os.networkInterfaces(),localIP;
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details,alias){
    if (details.family == 'IPv4') {
      localIP = details.address;
    }
  });
}

app.listen(app.get('port'), function(){
  logger.info("server is running!");
  logger.info("GET path - http://" + localIP + ":" + PORT + "/get");
  logger.info("POST path - http://" + localIP + ":" + PORT + "/post");
});
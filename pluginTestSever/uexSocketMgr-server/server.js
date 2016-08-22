var config = require('./config');
var net = require('net');
var moment = require('moment');
var utility = require('./utility');
var dgram = require('dgram');

var logger = utility.getLogger();

var tcpServer = net.createServer(); 
tcpServer.on('connection', function(client) {  
  client.name = client.remoteAddress + ':' + client.remotePort;
  logger.info("TCP ~> " + client.name + " connected!");
  client.write('Hi ' + client.name + '!\n');  
  client.on('data', function(data) {
    logger.info("TCP ~>" + client.name + " send data: " + data);
    client.write(data);
  }); 
  client.on('end', function() {  
    logger.info("TCP ~> " + client.name + " disconnected!");
  }); 
  client.on('error', function(e) {  
    logger.info("TCP ~> " + client.name + " errors: " + e);
  }); 
});

var udpClient = dgram.createSocket('udp4');
udpClient.on('message', function(msg,info){
  var msgStr = msg.toString();
  var length = msg.length;
  var address = info.address;
  var port = info.port;
  logger.info("UDP ~> receive data " + msgStr + "(" + length +  " bytes) from: " + address + ":" + port);
  udpClient.send(msg, 0, length, port, address);
});
udpClient.on('error', function(err){
  logger.info('error, msg - %s, stack - %s', err.message, err.stack);
});
udpClient.on('listening', function(){
  logger.info("start UDP echo client at " + utility.getLocalIP() + ":" + config.udp_port);
})

tcpServer.listen(config.tcp_port);
logger.info("start TCP echo server at " + utility.getLocalIP() + ":" + config.tcp_port);
udpClient.bind(config.udp_port);

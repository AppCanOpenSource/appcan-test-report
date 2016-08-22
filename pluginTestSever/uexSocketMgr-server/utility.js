var log4js = require('log4js');
var config = require('./config');
var os = require('os');


var utility = {};

utility.getLogger = function(){
  var logger = log4js.getLogger();
    if (config.debug) {
      logger.setLevel('DEBUG');
    }else{
      logger.setLevel('WARN');
    }
    return logger;
}
utility.getLocalIP = function(){
  var ifaces = os.networkInterfaces();
  for (var dev in ifaces) {
    for (var details in ifaces[dev]){
      var info = ifaces[dev][details];
      if (info.family == 'IPv4' && !info.internal) {
        return info.address;
      }
    }
  };
  return null;
}


module.exports = utility;

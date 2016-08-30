/**
 * @author lkl
 */
define(["moment"], function(moment){
  var CC = {};
  var isFunction = function (value) {
    return typeof value === 'function' || false;
  };
  var isNumber = function(valur){
    return typeof value === 'number' || false;
  }
  CC.ts = function(){
    return moment().format('[[]hh:mm:ss.SSS[]]');
  };
  CC.log = function(x){
    uexWindow.log && uexWindow.log(x);//Xcode Log
    console.log && console.log(x);//Android Studio Log
    UNIT_TEST && UNIT_TEST.log(CC.ts() + x);//UnitTest log 
  };
  CC.randomString = function(length){
    var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\\r\n\t一二三四五六七啊是的发个好就看';
    var result = '';
    for (var i = length; i > 0; --i){
      result += mask[Math.floor(Math.random() * mask.length)];
    }
    return result;
  };
  CC.confirm = function(msg,cb){
    uexWindow.confirm({
      title: "UNIT_TEST",
      message: msg,
      buttonLabels: "YES,NO"
    },function(index){
      var ret = (index == 0)
        if (cb && isFunction(cb)) {cb(ret)};
    });
  };
  CC.toast = function(msg,duration){
    CC.log(msg);
    var time = isNumber(duration) ? duration : 1000;
    uexWindow.toast({
      type: 0,
      location: 5,
      msg: msg,
      duration: time
    });
  }
  CC.alert = function(msg,cb){
    CC.log(msg);
    uexWindow.confirm({
      title: "UNIT_TEST",
      message: msg,
      buttonLabels: "OK"
    },function(){
        if (cb && isFunction(cb)){cb()};
    });
  };
  return CC;
});
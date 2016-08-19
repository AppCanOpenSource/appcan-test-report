define(["moment"], function(moment){
  var ts = function(){
    return moment().format('[[]hh:mm:ss.SSS[]]');
  }
  var log = function(x){
    uexWindow.log && uexWindow.log(x);//Xcode Log
    console.log && console.log(x);//Android Studio Log
    UNIT_TEST && UNIT_TEST.log(ts() + x);//UnitTest log 
  }
  var randomString = function(length){
    var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\\r\n\t一二三四五六七啊是的发个好就看';
    var result = '';
    for (var i = length; i > 0; --i){
      result += mask[Math.floor(Math.random() * mask.length)];
    }
    return result;
  }
  return {
    ts: ts,
    log: log,
    randomString: randomString
  }
});
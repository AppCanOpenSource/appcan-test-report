/**
 * @module RootObserver
 * @author lkl
 * @description root页面的回调接收器
 * @example
 *
 * //在case.js中
 * //注册RootObserver模块
 * define([RootObserver"],function(RootObserver){
 * 
 *   // 新建RootObserver对象.
 *   // 传入的参数是要监听的方法名.
 *   var observer = new RootObserver("uexLocalNotification.onMessage");
 *   
 *   // on 方法
 *   // 开始root页面的监听.
 *   // 传入的参数cb是Function类型.
 *   // root页面中的回调方法触发时,cb也会被触发. cb的参数与root页面回调方法的参数相同.
 *   observer.on(function(notificationID,message,extraJSON){
 *     //...
 *   });
 *
 *   // dispose 方法
 *   // 停止由on方法开始的监听.
 *   observer.dispose();
 *
 *   // once 方法
 *   // 开始root页面的监听,root页面的回调触发一次后,此监听自动停止.
 *   // once 的参数与on方法相同.
 *   observer.once(function(notificationID,message,extraJSON){
 *     //...
 *   });
 * });
 * 
 */

define(["Rx"],function (Rx) {
  const CHANNEL = "com.zywx.rootObserver.channel";
  var baseSubject = new Rx.Subject();
  var subjects = {};
  uexWindow.subscribeChannelNotification(CHANNEL,"_rootObserverSubject");
  uexWindow._rootObserverSubject = function(info){
    baseSubject.onNext(JSON.parse(info));
  };
  //解决Android不能传递JSONString的问题
  var argJS = 
    "var ARG = function(argument){"           +
      "this.arg = argument;"                  +
      "this.isJSONString = false;"            +
      "try{"                                  +
        "var json = JSON.parse(argument);"    +
        "if(json){"                           +
          "this.arg = json;"                  +
          "this.isJSONString = true;"         +
        "}"                                   +
      "}catch(e){}"                           +
    "};"                                      

  uexWindow.evaluateScript({
    name: "root",
    type: 0,
    js: argJS
  });
  var Observer = function(cbName){
    this.cbName = cbName;
    this.subscription = null;
    if (!subjects[cbName]) {
      uexWindow.evaluateScript({
        name: "root",
        type: 0,
        js: rootJS(cbName)
      });
      subjects[cbName] = baseSubject.filter(function(data){
        return data.cbName == cbName;
      });
    };
    this.subject = subjects[cbName];
  };

  Observer.prototype._subscribe = function(cb,timeFlag){
    var observer = this;
    if (observer.subscription) {
      observer.dispose();
    };
    var times = timeFlag | 0;
    var func = typeof cb === "function" ? cb : function(){};
    var signal = observer.subject;
    if (times > 0) {
      signal = observer.subject.take(times);
    };
    observer.subscription = signal.subscribe(
      function(data){
        var args = [];
        for (var i = 0; i < data.args.length; i++) {
          var argObj = data.args[i];
          args.push(argObj.isJSONString ? JSON.stringify(argObj.arg) : argObj.arg);
        };
        func.apply(null,args);
      },
      function(){observer.dispose();},
      function(){observer.dispose();}
    );
  };
  Observer.prototype.on = function(cb){
    this._subscribe(cb,0);
  };
  Observer.prototype.dispose = function(){
    if (this.subscription) {
      this.subscription.dispose();
      this.subscription = null;
    };
  };
  Observer.prototype.once = function(cb){
    this._subscribe(cb,1);
  };
  var rootJS = function(cbName){
    var js = cbName + " = function(){"                                      +
      "var args = [];"                                                      + 
      "for(var i = 0;i < arguments.length;i++){"                            +
        "var arg = new ARG(arguments[i]);"                                  +
        "args.push(arg);"                                                   +
      "}"                                                                   +
      "var data = JSON.stringify({"                                         +
          "args: args,"                                                     +
          "cbName: '" + cbName + "'"                                        +
      "});"                                                                 +
      "uexWindow.publishChannelNotification('" + CHANNEL +"', data);"       +
      "};"
      return js;
  };

  return Observer;
});
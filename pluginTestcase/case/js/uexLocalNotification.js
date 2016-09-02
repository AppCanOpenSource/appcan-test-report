define(["CC","RootObserver"],function(CC,RootObserver){
  if (!UNIT_TEST) return;
  
  var TEST_CASE = {};



  const mode = 0;//黑屏时是否提示,0:不提示,1:提示.仅iOS有效.
  const buttonTitle = "点我";//仅iOS有效
  const ringPath = "default";
  const cycle = "once";
  const notifyCount = "4";//应用图标上显示的通知数,仅iOS有效.
  const extras = {
    name:"Tony",
    sex:"male",
    age:34
  };

  var getTime = function(delay_secs){
    return (new Date()).getTime() + delay_secs * 1000;
  }

  TEST_CASE.add1 = function(){
    const id = "alarm_1";
    const msg = "alarm_1";
    var observer = new RootObserver("uexLocalNotification.onMessage");
    observer.once(function(notificationID,message,extraJSON){
      var extras = JSON.parse(extraJSON);
      CC.log("检查参数...");
      UNIT_TEST.assert(notificationID == id && message == msg && extras && extras.name == "Tony" && extras.sex == "male" && extras.age == 34);
    });
    CC.alert("点击OK 2秒后触发通知,请保持应用在前台",function(){
      uexLocalNotification.add(id,getTime(2),mode,msg,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
    });
  };
  TEST_CASE.add2 = function(){
    const id = "alarm_2";
    const msg = "alarm_2";
    var observer = new RootObserver("uexLocalNotification.onActive");
    observer.once(function(notificationID,message,extraJSON){
      var extras = JSON.parse(extraJSON);
      CC.log("检查参数...");
      UNIT_TEST.assert(notificationID == id && message == msg && extras && extras.name == "Tony" && extras.sex == "male" && extras.age == 34);
    });
    CC.alert("点击OK 3秒后触发通知,请在3秒内切换应用至后台,并点击触发的通知切回应用.",function(){
      uexLocalNotification.add(id,getTime(3),mode,msg,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
    });
  };

  TEST_CASE.remove = function(){
    CC.log("请保证应用在前台!");
    const id = "alarm_3";
    const msg = "alarm_3";
    var observer = new RootObserver("uexLocalNotification.onMessage");
    observer.once(function(notificationID,message,extraJSON){
      UNIT_TEST.assert(false);
    });
    CC.log("注册一个2s后触发的通知");
    uexLocalNotification.add(id,getTime(2),mode,msg,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
    setTimeout(function() {
      CC.log("取消注册的通知");
      uexLocalNotification.remove(id);
    }, 1000);
    setTimeout(function(){
      UNIT_TEST.assert(true);
    },3000);
  };
  TEST_CASE.removeAll = function(){
    CC.log("请保证应用在前台!");
    var observer = new RootObserver("uexLocalNotification.onMessage");
    observer.once(function(notificationID,message,extraJSON){
      UNIT_TEST.assert(false);
    });
    const msg = "alarm_4_5_6";
    CC.log("注册多个通知");

    uexLocalNotification.add("alarm_4",getTime(1.5),mode,msg,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
    uexLocalNotification.add("alarm_5",getTime(2),mode,msg,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
    uexLocalNotification.add("alarm_6",getTime(2.5),mode,msg,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
    setTimeout(function() {
      CC.log("取消所有通知");
      uexLocalNotification.removeAll();
    }, 1000);
    setTimeout(function(){
      UNIT_TEST.assert(true);
    },3000);

  }




  UNIT_TEST.addCase("localNotification", TEST_CASE);
});
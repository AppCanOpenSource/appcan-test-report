var time = (new Date()).getTime() + 2 * 1000;
var mode = 0;//黑屏时是否提示,0:不提示,1:提示.仅iOS有效.
var buttonTitle = "点我";//仅iOS有效
var ringPath = "default";
var cycle = "once";
var notifyCount = "4";//应用图标上显示的通知数,仅iOS有效.
var extras = {
    name:"Tony",
    sex:"male",
    age:34
};
var result = false;
define(["CC"],function(CC){
    if (UNIT_TEST) {
        var uexLocalNotificationCase = {
            "add":function(){
                var id = "alarm_1";
                var message = "alarm_1";//
                uexLocalNotification.add(id,time,mode,message,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
                UNIT_TEST.log("添加了提醒，2秒后会收到通知");
                setTimeout(function(){
                    CC.confirm("请确认是否收到了alarm_1通知.",function(ret){
                      result = ret;
                      UNIT_TEST.assert(ret);
                    });
                },2000);
            },
            /*回调到root页面，因此自动化case无法测试
            "onMessage":function(){
                uexLocalNotification.onMessage = function(notificationID,message,extras){
                    UNIT_TEST.log("onActive:" + notificationID + "," + message + "," + extras);
                    UNIT_TEST.assert(true);
                };
                if(result){
                    UNIT_TEST.log("请在当前应用处于前台的情况下点击alarm_1通知，触发onMessage回调事件！");
                }else{
                    UNIT_TEST.assert(false);
                }
            },
            "onActive":function(){
                var id = "alarm_2";
                var message = "alarm_2";//
                uexLocalNotification.add(id,time,mode,message,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
                UNIT_TEST.log("添加了alarm_2提醒，2秒后会收到通知");
                uexLocalNotification.onActive = function(notificationID,message,extras){
                     UNIT_TEST.log("onMessage:" + notificationID + "," + message + "," + extras);
                     UNIT_TEST.assert(true);
                };
                setTimeout(function(){
                    CC.confirm("请确认是否收到了alarm_2通知.",function(ret){
                        if(!ret){
                            UNIT_TEST.assert(false);
                        }else{
                           UNIT_TEST.log("请先回到桌面再点击alarm_2通知，触发onActive回调事件！");
                        }
                    });
                },3000);
            },*/
            "remove":function(){
                var id = "alarm_3";
                var message = "alarm_3";//
                uexLocalNotification.add(id,time,mode,message,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
                UNIT_TEST.log("添加了alarm_3提醒，2秒后会收到通知,但已取消，注意观察手机是否收到提醒");
                uexLocalNotification.remove(id);
                setTimeout(function(){
                    CC.confirm("请确认是否收到了alarm_3通知.",function(ret){
                        UNIT_TEST.assert(!ret);
                    });
                },2000);
            },
            "removeAll":function(){
                var id1 = "alarm_4";
                var message1 = "alarm_4";//
                var time1 = (new Date()).getTime() + 2 * 1000;
                uexLocalNotification.add(id1,time1,mode,message1,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
                UNIT_TEST.log("添加了alarm_4提醒，2秒后会收到通知,但已取消，注意观察手机是否收到提醒");

                var id2 = "alarm_5";
                var message2 = "alarm_5";//
                var time2 = (new Date()).getTime() + 2 * 1000;
                uexLocalNotification.add(id2,time2,mode,message2,buttonTitle,ringPath,cycle,notifyCount,JSON.stringify(extras));
                UNIT_TEST.log("添加了alarm_5提醒，2秒后会收到通知,但已取消，注意观察手机是否收到提醒");

                uexLocalNotification.removeAll();
                setTimeout(function(){
                    CC.confirm("请确认是否收到了alarm_4或者alarm_5通知.",function(ret){
                        UNIT_TEST.assert(!ret);
                    });
                },1000);
            }
        };
        UNIT_TEST.addCase("localNotification", uexLocalNotificationCase);
    }
})
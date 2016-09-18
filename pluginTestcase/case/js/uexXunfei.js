/**
    Android xunfei插件回调和监听都在root页，所以需要特殊处理从root页获取相应的回调或监听事件。

*/
define(["CC","RootObserver"],function(CC,RootObserver){
  if (!UNIT_TEST) return;
    var appId = "577df198" ;
    if (uexWidgetOne.platformName.indexOf('android') > -1) {
        appId = "577f4683";
    }

    var uexXunfeiCase = {
        "init":function(){
            var params = {
                appID:appId
            };
            var data = JSON.stringify(params);
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                uexXunfei.init(data);
                UNIT_TEST.assertTrue(true);
            } else {
                uexXunfei.init(data, function(error) {
                    if(!error){
                       UNIT_TEST.log("初始化成功");
                       UNIT_TEST.assertTrue(true);
                    }else{
                       UNIT_TEST.log("初始化失败");
                       UNIT_TEST.assertTrue(false);
                    }
                });

            }

        },
        "initSpeaker":function(){
            uexXunfei.initSpeaker();
            UNIT_TEST.assertTrue(true);
        },
        "startSpeaking":function(){
            var params = {
                text:"this is wuhan university of science and technology!"
            };
            var data = JSON.stringify(params);
            uexXunfei.startSpeaking(data);
            UNIT_TEST.log("语音合成开始");
            UNIT_TEST.assertTrue(true);
        },
        "onSpeakBegin":function(){
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                var observer = new RootObserver("uexXunfei.onSpeakBegin");
                observer.once(function() {
                    UNIT_TEST.log("SpeakBegin");
                    UNIT_TEST.assertTrue(true);
                });
            } else {
                uexXunfei.onSpeakBegin = function(){
                    UNIT_TEST.log("SpeakBegin");
                    UNIT_TEST.assertTrue(true);
                };
            }


        },
        "pauseSpeaking":function(){
            setTimeout(function(){
                uexXunfei.pauseSpeaking();
                UNIT_TEST.log("语音合成暂停");
                UNIT_TEST.assertTrue(true);
            },1000);

        },
        "resumeSpeaking":function(){
            setTimeout(function(){
                uexXunfei.resumeSpeaking();
                UNIT_TEST.log("语音合成继续");
                UNIT_TEST.assertTrue(true);
            },1000);

        },
        "onSpeakComplete":function(){
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                var observer = new RootObserver("uexXunfei.onSpeakComplete");
                observer.once(function() {
                    UNIT_TEST.log("SpeakComplete");
                    UNIT_TEST.assertTrue(true);
                });
            } else {
                uexXunfei.onSpeakComplete = function(){
                    UNIT_TEST.log("SpeakComplete");
                    UNIT_TEST.assertTrue(true);
                };
            }
        },
        "initRecognizer":function(){
            setTimeout(function(){
                var params = {
                       };
                var data = JSON.stringify(params);
                uexXunfei.initRecognizer(data);
                UNIT_TEST.assertTrue(true);
            },1000);

        },
        "startListening":function(){
            var params = {
            };
            var data = JSON.stringify(params);
            uexXunfei.startListening(data);
            UNIT_TEST.assertTrue(true);
        },
         "cancelListening":function(){
            uexXunfei.cancelListening();
            UNIT_TEST.log("语音识别取消");
            UNIT_TEST.assertTrue(true);
        },

        "onBeginOfSpeech":function(){
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                var params = {};
                var data = JSON.stringify(params);
                uexXunfei.startListening(data);
                var observer = new RootObserver("uexXunfei.onBeginOfSpeech");
                observer.once(function(notificationID, message,extraJSON) {
                    UNIT_TEST.log("BeginOfSpeech");
                    UNIT_TEST.assertTrue(true);
                     uexXunfei.cancelListening();
                });
            } else {
                uexXunfei.onBeginOfSpeech = function(){
                    UNIT_TEST.log("BeginOfSpeech");
                    UNIT_TEST.assertTrue(true);
                };
            }
        },
         "onRecognizeResult":function(){

          if (uexWidgetOne.platformName.indexOf('android') > -1) {
                var isExecuted = false;
                var params = {};
                var data = JSON.stringify(params);
                uexXunfei.initRecognizer(data);
                uexXunfei.startListening(data);
                UNIT_TEST.log("语音识别开始,请说话!");
                var observer = new RootObserver("uexXunfei.onRecognizeResult");
                //从root页莸取数据有问题，所以没有打印数据，但如果在root页单独写case的时候测试通过.
                observer.on(function() {
                    if (!isExecuted) {
                        UNIT_TEST.log("onRecognizeResult execute:");
                        UNIT_TEST.assertTrue(true);
                        isExecuted = true;
                    }
                });
            } else {
                uexXunfei.startListening();
                UNIT_TEST.log("语音识别开始,请说话!");
                uexXunfei.onRecognizeResult = function(info){
                    UNIT_TEST.log(info);
                    UNIT_TEST.assertTrue(true);
                };
            }

        },

        "onEndOfSpeech":function(){
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                var isExecuted = false;
                var observer = new RootObserver("uexXunfei.onEndOfSpeech");
                observer.once(function(notificationID, message,extraJSON) {
                    if (!isExecuted) {
                        UNIT_TEST.log("onEndOfSpeech");
                        UNIT_TEST.assertTrue(true);
                        isExecuted = true;
                    }
                });
            } else {
                uexXunfei.onEndOfSpeech = function(){
                    UNIT_TEST.log("EndOfSpeech");
                    UNIT_TEST.assertTrue(true);
                };
            }
        },


    }
    UNIT_TEST.addCase("xunFei",uexXunfeiCase);
});
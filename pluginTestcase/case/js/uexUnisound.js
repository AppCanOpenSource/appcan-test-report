if (UNIT_TEST) {

     var uexUnisoundCase = {
        "init": function(){
           var data = {
               appKey:"fjxvybmv65mh6qdcj5chwi6vaetsvvwuj7ey5gyh",
               secret:"1c22d036487da0bd69c791788e5870e6"
           }
           uexUnisound.init(JSON.stringify(data));
           UNIT_TEST.assert(true);

        },
        "updateRecognizerSettings": function(){
           var data = {
               frontTime:2000,
               backTime:2000,
               rate:2,
               language:2,
               engine:1
           }
           uexUnisound.updateRecognizerSettings(JSON.stringify(data));
           UNIT_TEST.assert(true);
        },

        "runTextUnderstand": function(){
            var data = {
                test:"我爱你"
            }
            uexUnisound.runTextUnderstand(JSON.stringify(data));
            UNIT_TEST.assert(true);
        },

        "onReceiveUnderstanderResult": function(){
            var isExecuted = false;
            if (!isExecuted) {
                uexUnisound.onReceiveUnderstanderResult = function (info) {

                    UNIT_TEST.log("[data]" + info);
                    UNIT_TEST.assert(true);
                    isExecuted = true;
                }
            };
            uexUnisound.runTextUnderstand('{"text":"我爱你"}');

        },
        "start": function(){
           uexUnisound.start();
           UNIT_TEST.assert(true);
        },
        "onVADTimeout": function() {
            UNIT_TEST.log("测试录音超时");
            var isExecuted = false;
            uexUnisound.onVADTimeout = function(info){
                if (!isExecuted) {
                    UNIT_TEST.assert(true);
                    isExecuted = true;
                }
                uexUnisound.stop();
            }
        },
        "onRecognizerStart": function() {
             if (uexWidgetOne.platformName.indexOf('android') > -1) {
                UNIT_TEST.log("Android not support, let it go");
                UNIT_TEST.assert(true);
             } else {
                uexUnisound.start();
                uexUnisound.onRecognizerStart = function(){
                    UNIT_TEST.log("语音识别开始");
                    UNIT_TEST.assert(true);
                }

             }
        },
        "onUpdateVolume": function() {
            uexUnisound.start();
            var isExecuted = false;
            uexUnisound.onUpdateVolume = function(info){
                var data = JSON.parse(info);
                if (!isExecuted) {
                    UNIT_TEST.log("volume:" + data.volume);
                    UNIT_TEST.assert(true);
                    isExecuted = true;
                }
            }
        },

        "stop": function(){
            uexUnisound.stop();
            UNIT_TEST.assert(true);
        },
        "onEnd": function() {
            uexUnisound.start();
            uexUnisound.stop();
            uexUnisound.onEnd = function() {
                UNIT_TEST.assert(true);
            }
        },
        "cancel": function(){
            uexUnisound.cancel();
            UNIT_TEST.assert(true);
        },

        "speaking": function() {
            var data = {
                text:"你好"
            };
            uexUnisound.speaking(JSON.stringify(data));
            UNIT_TEST.assertDelay(true, 2000);
        },
        "onSpeakingStart": function() {
            var data = {
                text:"你好"
            };
            uexUnisound.speaking(JSON.stringify(data));
            uexUnisound.onSpeakingStart = function(){
                UNIT_TEST.assert(true);
            }
        },
        "onSpeakingFinish": function() {
            uexUnisound.onSpeakingFinish = function(){
                UNIT_TEST.assert(true);
            }
        },
        "cancelSpeaking": function() {
            var data = {
                text:"取消说话"
            };
            uexUnisound.speaking(JSON.stringify(data));
            setTimeout(function() {
                uexUnisound.cancelSpeaking();
                UNIT_TEST.assert(true);
            }, 2000);
        },
        "onSpeakingCancel": function() {
            var data = {
                text:"你好"
            };
            uexUnisound.speaking(JSON.stringify(data));
            uexUnisound.cancelSpeaking();
            uexUnisound.onSpeakingCancel = function(){
                UNIT_TEST.assert(true);
            }
        },
       "onReceiveRecognizerResult": function() {
            UNIT_TEST.log("开始识别，请说话....");
            uexUnisound.start();
            var isExecuted = false;
            if (!isExecuted) {
                uexUnisound.onReceiveRecognizerResult = function(info) {
                    UNIT_TEST.log("[data]" + info);
                    UNIT_TEST.assert(true);
                    isExecuted = true;
                }
            }
        },

//        "onSpeakingErrorOccur": function() {
//            var data = {
//                text:"无法测试出错"
//            };
//            uexUnisound.speaking(JSON.stringify(data));
//            uexUnisound.onSpeakingErrorOccur = function(){
//                UNIT_TEST.assert(true);
//            }
//        }
    };
    UNIT_TEST.addCase("unisoundCase", uexUnisoundCase);
}

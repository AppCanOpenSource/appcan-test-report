if (UNIT_TEST) {

     var uexUnisoundCase = {
        "init": function(){
           var data = {
               appKey:"fjxvybmv65mh6qdcj5chwi6vaetsvvwuj7ey5gyh",
               secret:"1c22d036487da0bd69c791788e5870e6"
           }
           uexUnisound.init(JSON.stringify(data));
           UNIT_TEST.assertDelay(true);

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
           UNIT_TEST.assertDelay(true);
        },
        "runTextUnderstand && onReceiveUnderstanderResult": function(){
            uexUnisound.onReceiveUnderstanderResult = function (info) {
                uexUnisound.onReceiveUnderstanderResult = null;
                UNIT_TEST.log("[data]" + info);
                UNIT_TEST.assertDelay(true);
            };
            uexUnisound.runTextUnderstand(JSON.stringify({text:"我爱你"}));

        },

        "start & onVADTimeout": function() {
            UNIT_TEST.log("测试录音超时");
            uexUnisound.onVADTimeout = function(info){
                uexUnisound.onVADTimeout = null;
                uexUnisound.stop();
                UNIT_TEST.assertDelay(true);
            }
            uexUnisound.start();
        },
        "onRecognizerStart": function() {
             if (uexWidgetOne.platformName.indexOf('android') > -1) {
                UNIT_TEST.log("Android not support, let it go");
                UNIT_TEST.assert(true);
             } else {
                uexUnisound.start();
                uexUnisound.onRecognizerStart = function(){
                    uexUnisound.onRecognizerStart = null;
                    UNIT_TEST.log("语音识别开始");
                    uexUnisound.stop();
                    UNIT_TEST.assertDelay(true);
                }

             }
        },
        "onUpdateVolume": function() {
            uexUnisound.start();

            uexUnisound.onUpdateVolume = function(info){
                uexUnisound.onUpdateVolume = null;
                uexUnisound.stop();
                var data = JSON.parse(info);
                UNIT_TEST.log("volume:" + data.volume);
                UNIT_TEST.assertDelay(true);

 
            }
        },
        "stop && onEnd": function() {
            uexUnisound.start();
            uexUnisound.stop();
            uexUnisound.onEnd = function() {
                uexUnisound.onEnd = null;
                UNIT_TEST.assert(true);
            }
        },
        "cancel": function(){
            uexUnisound.start();
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
                uexUnisound.onSpeakingStart = null;
                UNIT_TEST.assert(true);
            }
        },
        "onSpeakingFinish": function() {
            uexUnisound.onSpeakingFinish = function(){
                uexUnisound.onSpeakingFinish = null;
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
                UNIT_TEST.assertDelay(true);
            }, 2000);
        },
        "onSpeakingCancel": function() {
            var data = {
                text:"你好"
            };
            uexUnisound.onSpeakingCancel = function(){
                uexUnisound.onSpeakingCancel = null;
                UNIT_TEST.assertDelay(true);
            }
            uexUnisound.speaking(JSON.stringify(data));
            setTimeout(function(){
                       uexUnisound.cancelSpeaking();
                       },500);
            
        },
       "onReceiveRecognizerResult": function() {
            UNIT_TEST.log("开始识别，请说话....");
            uexUnisound.onReceiveRecognizerResult = function(info) {
                uexUnisound.onReceiveRecognizerResult = null;
                UNIT_TEST.log("[data]" + info);
                UNIT_TEST.assert(true);
            }
            uexUnisound.start();
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

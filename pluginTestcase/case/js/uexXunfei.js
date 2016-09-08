if(UNIT_TEST){
    var uexXunfeiCase = {
        "init":function(){
            var params = {
            appID:"577df198"
            };
            var data = JSON.stringify(params);
            uexXunfei.init(data,function(error){
                           if(!error){
                           UNIT_TEST.log("初始化成功");
                           UNIT_TEST.assertTrue(true);
                           }else{
                           UNIT_TEST.log("初始化失败");
                           UNIT_TEST.assertTrue(false);
                           }
            });
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
            uexXunfei.onSpeakBegin = function(){
                UNIT_TEST.log("SpeakBegin");
                UNIT_TEST.assertTrue(true);
            };
            
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
            uexXunfei.onSpeakComplete = function(){
                UNIT_TEST.log("SpeakComplete");
                UNIT_TEST.assertTrue(true);
            };
                    
        },
        "initRecognizer":function(){
            setTimeout(function(){
                var params = {
                       };
                var data = JSON.stringify(params);
                uexXunfei.initRecognizer(data);
                UNIT_TEST.assertTrue(true);
            },10000);
            
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
        "onRecognizeResult":function(){
            uexXunfei.startListening();
            UNIT_TEST.log("语音识别开始,请说话!");
            uexXunfei.onRecognizeResult = function(info){
                    UNIT_TEST.log(info);
                    UNIT_TEST.assertTrue(true);
                
                
            };
            
        },
        "onBeginOfSpeech":function(){
            uexXunfei.onBeginOfSpeech = function(){
                UNIT_TEST.log("BeginOfSpeech");
                UNIT_TEST.assertTrue(true);
            };
            
        },

        "onEndOfSpeech":function(){
            uexXunfei.onEndOfSpeech = function(){
                UNIT_TEST.log("EndOfSpeech");
                UNIT_TEST.assertTrue(true);
            };
            
        },
        
        
    }
    UNIT_TEST.addCase("xunFei",uexXunfeiCase);
}
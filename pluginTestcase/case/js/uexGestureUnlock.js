var btn = 0;
if (UNIT_TEST) {
    var uexGestureUnlockCase = {
        "resetGestureCode":function(){
            uexGestureUnlock.resetGestureCode();
            UNIT_TEST.assert(true);
        },
        "create":function(){
            var params = {
                isNeedVerifyBeforeCreate:false
            }
            uexGestureUnlock.create(params, callback);
            function callback(error, data){
                if(!error){
                    UNIT_TEST.log("设置成功");
                    UNIT_TEST.assertDelay(true);
                }else{
                    UNIT_TEST.log("设置失败!2秒后重新设置");
                    setTimeout(function(){
                        uexGestureUnlock.create(params, callback);
                    }, 2000);
                }
            }
        },
        "isGestureCodeSet":function(){
            var result = uexGestureUnlock.isGestureCodeSet();
            UNIT_TEST.log("是否设置密码:" + result);
            UNIT_TEST.assert(true);
        },
        "config":function(){
            var params = {
                backgroundImage:"res://gestureunlock_bgImage.jpg",
                iconImage:"res://gestureunlock_icon.png",
                normalThemeColor:"#F1F1F1",
                selectedThemeColor:"#00ff00",
                errorThemeColor:"#ff0000",
                cancelVerificationButtonTitle:"切换其他账号"
            }
            uexGestureUnlock.config(params);
            UNIT_TEST.assert(true);
        },
        "verify":function(){
            uexGestureUnlock.verify(callback);
            uexGestureUnlock.onEventOccur = function(params){
                UNIT_TEST.log("onEventOccur:" + JSON.parse(params).eventCode);
            }
            function callback(error, data){
                if(!error){
                    UNIT_TEST.log("验证成功");
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.log("验证失败!2秒后重新验证");
                    setTimeout(function(){
                        uexGestureUnlock.verify(callback);
                    }, 2000);
                }
            }
        },
        "cancel":function(){
            UNIT_TEST.log("5秒钟后强制终止验证密码过程");

            setTimeout(function(){
                uexGestureUnlock.verify(function(error, data){});
             }, 2000);
            setTimeout(function(){
                uexGestureUnlock.cancel();
                UNIT_TEST.assert(true);
             }, 5000);
        }
    };
    UNIT_TEST.addCase("gestureUnlock", uexGestureUnlockCase);
}
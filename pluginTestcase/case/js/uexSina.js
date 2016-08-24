if(UNIT_TEST){
    var appKey = "3882118212";
    var registerUrl = "https://api.weibo.com/oauth2/default.html";
    var uexSinaCase = {
        "login":function(){
            uexSina.login(appKey,registerUrl,function(error,data){
                    if(!error){
                        UNIT_TEST.log("登录成功");
                        UNIT_TEST.assert(true);

                    }else{
                        UNIT_TEST.log("登录失败");
                        UNIT_TEST.assert(false);
                    }

            });
        },
        "getUserInfo":function(){
            uexSina.getUserInfo(function(data){
                if(data){
                      UNIT_TEST.log(JSON.stringify(data));
                      UNIT_TEST.assert(true);
                 }else{
                      UNIT_TEST.assert(false);
                 }
            });
        },

        "sendTextContent":function(){
            var txt = "中国最大的移动中间平台AppCan对新浪微博分享支持测试";
            uexSina.sendTextContent(txt, function(error) {
                if(!error){
                     UNIT_TEST.log("分享成功");
                  }else{
                     UNIT_TEST.log("分享失败");
                  }
                    UNIT_TEST.assertTrue(error == 0);
            });
        },
        "sendImageContent":function(){
            UNIT_TEST.log("因微博不支持两条微博发布时间太短，故等待5秒钟再分享图片");
            function shareStart(){
                var content = "中国最大的移动中间平台AppCan对新浪微博分享的图片支持测试";
                var realImgPath = "res://icon.png";
                uexSina.sendImageContent(realImgPath, content,function(error) {
                    if(!error){
                         UNIT_TEST.log("分享成功");
                      }else{
                         UNIT_TEST.log("分享失败");
                      }
                      UNIT_TEST.assertTrue(error == 0);

                });
            }
            setTimeout(shareStart, 5000);
        },
        "logout":function(){
            uexSina.logout(function(error) {
            if(!error){
                    UNIT_TEST.log("退出成功");
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.log("退出失败");
                    UNIT_TEST.assert(false);
               }
            });
        },


    }
    UNIT_TEST.addCase("sina", uexSinaCase);
}
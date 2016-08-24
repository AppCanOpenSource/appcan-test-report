if (UNIT_TEST) {
    var appId = '1104950773';
    var uexQQCase = {
    "login":function(){
        uexQQ.login(appId,function(error, data) {
                    if(!error){
                    UNIT_TEST.log("登录成功:"+"openid-"+data.openid+","+"access_token-"+data.access_token);
                    }else{
                    UNIT_TEST.log("登录失败");
                    }
                    UNIT_TEST.assertTrue(error == 0);
                    });
    },
    "isQQInstalled":function(){
        var ret = uexQQ.isQQInstalled();
        if(ret){
            UNIT_TEST.log("已安装");
           
        }else{
            UNIT_TEST.log("未安装");
        }
         UNIT_TEST.assert(ret);
    },
    "shareWebImgTextToQQ":function(){
        var json = '{"title":"图文分享标题","summary":"图文分享消息摘要","targetUrl":"http://appcan.cn","imageUrl":"res://image.jpg","appName":"uexQQ", "cflag":"1"}';
        uexQQ.shareWebImgTextToQQ(appId, json, function(error,data) {
                                  if(!error){
                                  UNIT_TEST.log("分享成功");
                                  }else{
                                  UNIT_TEST.log("分享失败：" + data);
                                  }
                                  UNIT_TEST.assertTrue(error == 0);
                                  });
        
    },
    "shareLocalImgToQQ":function(){
        
        var json = '{"imageLocalUrl":"res://aa.jpg","appName":"uexQQ"}';
        uexQQ.shareLocalImgToQQ(appId, json, function(error,data) {
                                if(!error){
                                UNIT_TEST.log("分享成功");
                                
                                }else{
                                UNIT_TEST.log("分享失败：" + data);
                                
                                }
                                UNIT_TEST.assertTrue(error == 0);
                                });
        
    },
    "shareAudioToQQ":function(){
        var json = '{"title":"音乐分享标题","summary":"音乐分享消息摘要","targetUrl":"http://appcan.cn","imageUrl":"http://imgcache.qq.com/qzone/space_item/pre/0/66768.gif","appName":"uexQQ", "audio_url":"http://pan.baidu.com/share/link?shareid=1055030794&uk=2337020227","cflag":"2"}';
        uexQQ.shareAudioToQQ(appId, json, function(error,data) {
                             if(!error){
                             UNIT_TEST.log("分享成功");
                             
                             }else{
                             UNIT_TEST.log("分享失败：" + data);
                             
                             }
                             UNIT_TEST.assertTrue(error == 0);
                             });
        
    },
//    "shareAppToQQ":function(){
//        var json = '{"title":"应用分享标题","summary":"应用分享消息摘要","imageUrl":"res://icon.png","appName":"uexQQ","cflag":"1"}';
//        uexQQ.shareAppToQQ(appId, json, function(error,data) {
//                           if(!error){
//                           UNIT_TEST.log("分享成功");
//                           
//                           }else{
//                           UNIT_TEST.log("分享失败：" + data);
//                           
//                           }
//                           UNIT_TEST.assertTrue(error == 0);
//                           });
//       
//    },
    "shareImgTextToQZone":function(){
        var json = '{"title":"空间分享标题","summary":"空间分享消息摘要","targetUrl":"http://appcan.cn","imageUrl":["res://aa.jpg"]}';
        uexQQ.shareImgTextToQZone(appId, json, function(error,data) {
                                  if(!error){
                                  UNIT_TEST.log("分享成功");
                                  
                                  }else{
                                  UNIT_TEST.log("分享失败：" + data);
                                 
                                  }
                                  UNIT_TEST.assertTrue(error == 0);
                                  });
        
    }
    
    
    }
    UNIT_TEST.addCase("QQ", uexQQCase);
}
if(UNIT_TEST){
    var phoneNum = 15172530354;
    var countryCode = "86";
    var validCode;
    var uexMobSMSCase = {
        "init":function(){
            var params = {
                "uexMobSMS_APPKey": "e5c90ea53640",
                "uexMobSMS_APPSecret": "d2ec92c2e5de325c52fc53bdb63374fc"
            };
            uexMobSMS.init(params);
            UNIT_TEST.log("初始化成功");
            UNIT_TEST.assertTrue(true);
        },
        "sendCode":function(){
            var params = {
                "phoneNum": phoneNum,
                "countryCode": countryCode
            };
            uexMobSMS.sendCode(params,function(error,data){
                               if(!error){
                               UNIT_TEST.log("发送成功");
                               UNIT_TEST.assertTrue(true);
                               }else{
                               UNIT_TEST.log("发送失败:"+error);
                               UNIT_TEST.assertTrue(false);
                               }
                               
                });
        },
        "commitCode":function(){
            validCode = prompt("请输入你收到的验证码:","");
            var params = {
                "phoneNum": phoneNum,
                "countryCode": countryCode,
                "validCode" : validCode
            };
            uexMobSMS.commitCode(params,function(error,data){
                                 
                                 if(!error){
                                 UNIT_TEST.log("验证成功");
                                 UNIT_TEST.assertTrue(true);
                                 }else{
                                 UNIT_TEST.log("验证失败:"+error);
                                 UNIT_TEST.assertTrue(false);
                                 }
                                 
                                 });
        }
    }
    UNIT_TEST.addCase("mobSMS",uexMobSMSCase);
}
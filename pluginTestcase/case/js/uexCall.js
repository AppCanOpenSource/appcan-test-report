if(UNIT_TEST){
    var uexCallCase = {
        "dial":function(){
            uexCall.dial("10086");
           UNIT_TEST.assertDelay(true,3000);
        },
        "facetime":function(){
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                UNIT_TEST.log("facetime仅支持iOS，安卓请忽略!");
                UNIT_TEST.assert(true);
            }else{
                uexCall.facetime("10086");
                UNIT_TEST.log("请用iPhone测试!");
                UNIT_TEST.assertDelay(true,3000);
            }
        }
    }
    UNIT_TEST.addCase("call",uexCallCase);
}
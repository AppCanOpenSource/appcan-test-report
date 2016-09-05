if(UNIT_TEST){
    var uexSMSCase = {
        "open":function(){
            uexSMS.open('12345678911,12312312312',"测试短信");
            UNIT_TEST.assertDelay(true);
        }
    }
    UNIT_TEST.addCase("sms",uexSMSCase);
}

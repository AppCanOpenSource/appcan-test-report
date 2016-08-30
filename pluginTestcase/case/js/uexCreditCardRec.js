if (UNIT_TEST) {
    var uexCreditCardRecCase = {
        "openCreditCardRec": function(){
            var tokenStr = "f06a7eca39134918a18dc4d7c45ee49f";
            //测试卡信息可以用 http://kaku.51credit.com/bocomm/jhbiaozhun/
            uexCreditCardRec.openCreditCardRec(tokenStr, function(error,data){
                if(!error){
                    UNIT_TEST.log("[data]" + data.cardNumber);
                    UNIT_TEST.assert(true);
                }else{
                   UNIT_TEST.assert(false);
                 }
            });
        }
    };
    UNIT_TEST.addCase("creditCardRec", uexCreditCardRecCase);
}

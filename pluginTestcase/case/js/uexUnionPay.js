if(UNIT_TEST){
    var uexUnionPayCase = {
        "startPay":function(){
            UNIT_TEST.log("测试时，请参考文档中的测试方法，文档中包含交易流水号和银行卡信息等。");
            UNIT_TEST.log("若支付失败或者取消支付，可重复支付，但最多支付三次！！！");
            setTimeout(function(){
                var params = {
                    orderInfo:"201608301048536855858",
                    mode:"01"
                };
                uexUnionPay.startPay(params, cb);
                var count = 0;
                function cb(error){
                    var result = false;
                    switch(error){
                        case 0:
                         UNIT_TEST.log("支付成功");
                         result = true;
                        break;
                        case 1:
                         UNIT_TEST.log("支付失败");
                        break;
                        case -1:
                         UNIT_TEST.log("支付被用户取消");
                        break;
                        case -2:
                         UNIT_TEST.log("支付发生未知错误");
                        break;
                    }
                    if(result){
                        UNIT_TEST.assert(true);
                    }else{
                        if(count < 2){
                            UNIT_TEST.log("支付未成功，3秒后继续支付");
                            setTimeout(function(){
                                uexUnionPay.startPay(params,cb);
                                count++;
                            },3000);
                        }else{
                           UNIT_TEST.assert(false);
                        }
                    }
                }
            },3000);
        }
    }
   UNIT_TEST.addCase("unionPay", uexUnionPayCase);
}

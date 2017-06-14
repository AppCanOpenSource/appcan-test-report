if (UNIT_TEST) {
    var uexFingerPrintCase = {
        "init": function () {
            uexFingerPrint.init(function(error, data){
                if(!error){
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.log("失败原因:" + data);
                    UNIT_TEST.assert(false);
                }
            });
        },
        "authenticate": function () {
            UNIT_TEST.log("请验证指纹......");
            var params = {
                maxTries:4
            };
            uexFingerPrint.authenticate(params,function(error, data){
                if(!error){
                    UNIT_TEST.assert(true);
                }else{
                    if(error == 5){
                        UNIT_TEST.log(data);
                        UNIT_TEST.log("请继续验证指纹......");
                    }else{
                        UNIT_TEST.log("验证失败:" + data);
                        UNIT_TEST.assert(false);
                    }
                }
            });
        }
    };

    UNIT_TEST.addCase("uexFingerPrint", uexFingerPrintCase);
}
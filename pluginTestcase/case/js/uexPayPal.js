if (UNIT_TEST) {
    var uexPayPalCase = {
        "init": function() {
                var params = {
                    mode:"noNetwork",
                    clientId:"APP-80W284485P519543T",
                };
            uexPayPal.init(JSON.stringify(params));
            UNIT_TEST.assert(true);
        },
        "pay":function () {
                var params = {
                           currency:"USD",
                           amount: '36.06',
                           desc: 'AppCan 短袖T恤'
                    };
                 uexPayPal.pay(JSON.stringify(params),function(error,data){
                                         if(error==0){
                                         UNIT_TEST.log(JSON.stringify(data));
                                         UNIT_TEST.assert(true);
                                         }else{
                                          UNIT_TEST.log(JSON.stringify(data));
                                         }
                                         
                                         });
        }
        
    };
    UNIT_TEST.addCase("payPal", uexPayPalCase);
}

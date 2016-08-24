if(UNIT_TEST){
    var uexAliPayCase = {
        "pay":function(){
            setInfo();
            var subject = "珍珠项链";
            var body = "韩版,韩国流行饰品小太阳花小巧雏菊 珍珠项链2M15。";
            var fee = "0.01";
            var num = "200155557"; //测试需修改单号,避免已经支付的问题
            uexAliPay.pay(num, subject, body, fee, function(error,data){
                if(!error){
                    UNIT_TEST.log("支付成功");
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.log(data);
                    UNIT_TEST.assert(false);
                    }

                });
        }


    }
    function setInfo(){
        var partner = "2088121727469933";
        var seller = "fetchgou@163.com";
        var rsaPrivate = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALKZJVB2jS4mGS6pjhwdixw2W9Q3i5idffRx6Meuwoe2mEArUi1Co2GaFMUtO1OhCSCuBHUNUfjxjnWDms/qbKtlYyGlnPhJ4St9L5qFR4+8P53U9vjdgjB7kp4gcOl5o6HnMosg8ZxdZZ7xF4WZRaKBUhb395cDNXjawVYQGopRAgMBAAECgYA2aQ3DK7rrOlQlsSZITn/ZAn6LcrimsCR1WlaurwE401ojAo+wlkKsM4LsZ1FRsxfSyvE0r/AvRXg/OO7rNOIR+rbc9QVFv44MQ0CO5ppPHh+v4+RzCYysgn8qw72VFdsKX1gMWlPAYn1OtiFI+q6mSXyFZm1zCjlYBw5yEb3UIQJBAOkCvJgqPA+F246QSn3AqfQyCqmmGyodx1GT8KUawv5IhApp/RKAYFix791MUYNtfor7n4o/3xwhBai/VMUmphUCQQDEOBZUBDOWmWxhPRh/ArVcXYF7AwaaMDMeM/Lpuk25SJlbZ/WZthqgl97ve4O8GLLYvBSptnf6NIBR2eJQG75NAkEAkATUAo0gQEvxD6XZlO5PXZLMil0Try1ms+Jnu/TVjwvNKQ6nkBbu9gNNCZARVdWIgGjUDEQ8J4u1jr5rq8uenQJBAMKDMycwTw+gob63OPxXa//XNc8Czd21oEb1in1GUVw2asghA2fQDQ9b3gUbNRkWhtyxfe5LUx42Q2pgiqeNCRUCQCeBom1eEho3f59WJvfggT8W4al5yX9SfYSuoQS1Z/nOJDDULFuVWr4VE/moLN8PTXCxCCwFQ9TgldvsJTWPH/Y=";
        var rsaPublic = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";
        var notifyUrl = "12334";
        uexAliPay.setPayInfo(partner, seller, rsaPrivate, rsaPublic, notifyUrl);

    }
   UNIT_TEST.addCase("aliPay", uexAliPayCase);
}

if (UNIT_TEST) {
    var securityKeyboard = null;
    var uexSecurityKeyboardCase = {
        "open":function(){
            var param = {
                x:0,
                y:50,
                width:800,
                height:150,
                keyboardType:0,
                isScrollWithWeb:true,
                keyboardDescription:"正益移动安全输入"
            }
            securityKeyboard = uexSecurityKeyboard.open(param);
            UNIT_TEST.log("securityKeyboard:" + securityKeyboard);
            UNIT_TEST.assertTrue(securityKeyboard != null);
        },
        "getData":function(){
            UNIT_TEST.log("此处等待5秒钟，请输入内容！");
            setTimeout(function(){
                var content = uexSecurityKeyboard.getData(securityKeyboard);
                UNIT_TEST.log("content:" + content);
                UNIT_TEST.assertNotEqual(content,null);
            },5000);
        },
        "close":function(){
            uexSecurityKeyboard.close(securityKeyboard);
            UNIT_TEST.assert(true);
        }
    };
    UNIT_TEST.addCase("securityKeyboard", uexSecurityKeyboardCase);
}
if (UNIT_TEST) {
    var code = '';
    var refresh_token = '';
    var openid = '';
    var accessToken = '';
    var prepay_id = '';
    var nonce_str = '';
    var sign = '';
    var uexWeiXinCase = {
        "registerApp":function(){
            var error = uexWeiXin.registerApp("wxa7aa49a8e7771458");
            if(!error){
                UNIT_TEST.log("注册成功");
                UNIT_TEST.assertTrue(error == 0);
            };
        },
        "isWXAppInstalled":function(){
            var info = uexWeiXin.isWXAppInstalled();
            if(info){
                UNIT_TEST.log("已安装");
                UNIT_TEST.assert(true);
            }else{
                UNIT_TEST.assert(false);
            };

        },
        "isWXAppSupportApi":function(){
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                UNIT_TEST.log("Android 不支持该方法, 设置为 pass");
                UNIT_TEST.assert(true);
                return;
            }
            var info = uexWeiXin.isWXAppSupportApi();
            if(info){
                UNIT_TEST.log("前微信的版本支持OpenApi");
                UNIT_TEST.assert(true);
            }else{
                UNIT_TEST.assert(false);
            };
        },
        "isSupportPay":function(){
            var info = uexWeiXin.isSupportPay();
            if(info){
                UNIT_TEST.log("支持支付功能");
                UNIT_TEST.assert(true);
            };
        },
        "getWXAppInstallUrl":function(){
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                UNIT_TEST.log("Android 不支持该方法, 设置为 pass");
                UNIT_TEST.assert(true);
                return;
            }
            uexWeiXin.getWXAppInstallUrl(function(data) {
            if(data){
                    UNIT_TEST.log("微信itunes的安装地址"+data);
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.assert(false);
              }
            });
        },
        "getApiVersion":function(){
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                UNIT_TEST.log("Android 不支持该方法, 设置为 pass");
                UNIT_TEST.assert(true);
                return;
            }
            uexWeiXin.getApiVersion(function(data) {
            if(data){
                UNIT_TEST.log("SDK的版本号"+data);
                UNIT_TEST.assert(true);
            }else{
                UNIT_TEST.assert(false);
            }
        });
        },
        "openWXApp":function(){
            if (uexWidgetOne.platformName.indexOf('android') > -1) {
                UNIT_TEST.log("Android 不支持该方法, 设置为 pass");
                UNIT_TEST.assert(true);
                return;
            }
            uexWeiXin.openWXApp(function(error){
                if(!error){
                   UNIT_TEST.log("已打开")};
                   UNIT_TEST.assert(true);
                });

        },
        "shareTextContent":function(){
            uexWeiXin.shareTextContent('{"text":"这是来自AppCan平台对微信支持测试","scene":1}',function(error) {
                    if(!error){
                        UNIT_TEST.log("分享成功");
                        UNIT_TEST.assertTrue(error == 0);
                    }else{
                        UNIT_TEST.assert(false);
                    }

            });

        },
        "shareImageContent":function(){
            uexWeiXin.shareImageContent('{"thumbImg":"res://icon.png","image":"res://image.jpg","scene":1}',function(error) {
                if(!error){
                    UNIT_TEST.log("分享成功");
                    UNIT_TEST.assertTrue(error == 0);
                }else{
                    UNIT_TEST.assert(false);
                    }
                });
        },
        "shareLinkContent":function(){
            uexWeiXin.shareLinkContent('{"thumbImg":"res://icon.png","wedpageUrl":"http://www.appcan.cn","scene":1,"title":"你好,我是AppCan","description":"你好,我是AppCan描述"}',function(error) {
                if(!error){
                    UNIT_TEST.log("分享成功");
                    UNIT_TEST.assertTrue(error == 0);
                }else{
                    UNIT_TEST.assert(false);
                }
            });
            
        },
        "getPrepayId":function(){
            var date = new Date();
            var timestamp = date.getTime().toString().substring(0,10);
            var param1 = {
                appid : "wxa7aa49a8e7771458",
                mch_id : "1305374801",
                nonce_str : "1EIDScXXBtnwvmIVzNFr3OxqV",
                body : "飞常购",
                detail :"detail",
                attach :"12344",
                out_trade_no : timestamp,
                fee_type : "CNY",
                total_fee :1,//last*100
                spbill_create_ip : "127.0.0.1",
                // time_start : "20160201144625",
                // time_expire : "20160201175225",
                notify_url:"http://www.baidu.com/",
                trade_type : "APP",
                sign : "8FC5935C38628F44B924C838D760E33E"
            };
            var stringSign = "appid=wxa7aa49a8e7771458&attach="+param1.attach+"&body="+param1.body+"&detail="+param1.detail+"&fee_type=CNY&mch_id=1305374801&nonce_str=1EIDScXXBtnwvmIVzNFr3OxqV&notify_url="+ param1.notify_url +"&out_trade_no="+param1.out_trade_no+"&spbill_create_ip=127.0.0.1&total_fee="+param1.total_fee+"&trade_type=APP&key=0e857460d1b309130b9b1d2530ac094d";
            var md = hex_md5(stringSign).toUpperCase();
            param1.sign = md;
            var param = JSON.stringify(param1);
            uexWeiXin.getPrepayId(param,function(data){
            if(data){
                if(data.return_code == "SUCCESS"){
                     prepay_id = data.prepay_id;
                     nonce_str = data.nonce_str;
                     sign = data.sign;
                     UNIT_TEST.log(JSON.stringify(data));
                     UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.log(data.return_msg);
                    UNIT_TEST.assert(false);
                }
                
                
            }else{
                UNIT_TEST.assert(false);
                }
            });
            
        },
        "startPay":function(){
            var date = new Date();
            var timestamp = date.getTime().toString().substring(0,10);
            var param1 = {
            appid:"wxa7aa49a8e7771458",
            partnerid:"1305374801",
            prepayid:prepay_id,
            package:"Sign=WXPay",
            noncestr:nonce_str,
            timestamp:timestamp,
            sign:sign
            };
            var strrrr="appid=wxa7aa49a8e7771458&noncestr="+nonce_str+"&package=Sign=WXPay&partnerid=1305374801&prepayid="+prepay_id+"&timestamp="+timestamp+"&key=0e857460d1b309130b9b1d2530ac094d";
            param1.sign = hex_md5(strrrr).toUpperCase();
            var data1 = JSON.stringify(param1);
            uexWeiXin.startPay(data1,function(data){
                    var info = JSON.parse(data);
                    if(!info.errCode){
                        UNIT_TEST.log("支付成功");
                        UNIT_TEST.assert(true);
                    }else{
                        UNIT_TEST.log("支付失败");
                         UNIT_TEST.assert(false);
                    }
            });
        },
        "login":function(){
            var params = {
            scope:"snsapi_userinfo,snsapi_base",
            state:"0902"
            };
            var data = JSON.stringify(params);
            uexWeiXin.login(data,function(data){
                var info = JSON.parse(data);
                   if(!info.errCode){
                        code = info.code;
                        UNIT_TEST.log("登录成功:"+data);
                        UNIT_TEST.assert(true);
                    }else{
                        UNIT_TEST.assert(false);
                    }

            });
        },
        "getLoginAccessToken":function(){
            var params = {
            secret:"0e857460d1b309130b9b1d2530ac094d",
            code:code,
            grant_type:"authorization_code"
            };
            var data = JSON.stringify(params);
            uexWeiXin.getLoginAccessToken(data,function(data){
                var info = JSON.parse(data);
                if(!info.errCode){
                    refresh_token = info.refresh_token;
                    UNIT_TEST.log("获取access_token成功:"+data);
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.assert(false);
                }
            });
        },
        "getLoginRefreshAccessToken":function(){
            var params = {
            grant_type:"refresh_token",
            refresh_token:refresh_token
            };
            var data = JSON.stringify(params);
            uexWeiXin.getLoginRefreshAccessToken(data,function(data){
                    var info = JSON.parse(data);
                    if(!info.errCode){
                            openid = info.openid;
                            accessToken = info.access_token;
                            UNIT_TEST.log("获取刷新access_token成功:"+data);
                            UNIT_TEST.assert(true);
                    }else{
                            UNIT_TEST.assert(false);
                    }
            });
        },
        "getLoginCheckAccessToken":function(){
            var params = {
            access_token:accessToken,
            openid:openid
            };
            var data = JSON.stringify(params);
            uexWeiXin.getLoginCheckAccessToken(data,function(data){
                var info = JSON.parse(data);
           if(!info.errcode){
                 UNIT_TEST.log("检验access_token成功:"+data);
                 UNIT_TEST.assert(true);
           }else{
                 UNIT_TEST.log("检验access_token失败:"+data);
                 UNIT_TEST.assert(false);
            }
            });
        }

       
    }
    UNIT_TEST.addCase("weiXin", uexWeiXinCase);
}

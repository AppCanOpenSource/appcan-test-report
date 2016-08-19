if (UNIT_TEST) {
    var uexDeviceCase = {
        "vibrate":function(){
            uexDevice.vibrate(1000);
            UNIT_TEST.assert(true);
        },
        "cancelVibrate":function(){
            uexDevice.cancelVibrate();
            UNIT_TEST.assert(true);
        },
        "getInfo":function(){
            var cOS = uexDevice.getInfo('1');//描述系统版本的字符串
            UNIT_TEST.log('1:系统版本=' + cOS);
            var cManufacturer = uexDevice.getInfo('2');//标书设备制造商的字符串
            UNIT_TEST.log('2:设备制造商=' + cManufacturer);
            var cIMEI = uexDevice.getInfo('10');//设备IMEI（国际移动设备唯一标识码）号
            UNIT_TEST.log('10:设备IMEI=' + cIMEI);
            var cDeviceToken = uexDevice.getInfo('11');//推送服务器需 要的一个代表此设备的唯一令牌的字符串
            UNIT_TEST.log('11:唯一令牌=' + cDeviceToken);
            var cDeviceType = uexDevice.getInfo('12');//设备类型，用来判断当前的设备是phone或者pad
            UNIT_TEST.log('12:设备类型=' + cDeviceType);
            var cConnectStatus = uexDevice.getInfo('13');//当前联网的方式
            UNIT_TEST.log('13:联网方式=' + cConnectStatus);
            var cRestDiskSize = uexDevice.getInfo('14');//当前设备剩余的磁盘空间大小的字符串
            UNIT_TEST.log('14剩余空间大小=:' + cRestDiskSize);
            var cMobileOperatorName = uexDevice.getInfo('15');//当前移动网络运营商的名称
            UNIT_TEST.log('15:移动运营商=' + cMobileOperatorName);
            var cModel = uexDevice.getInfo('17');//当前设备的型号名称
            UNIT_TEST.log('17:设备型号名称=' + cModel);
            var cResolutionRatio = uexDevice.getInfo('18');//获得屏幕的分辨率
            UNIT_TEST.log('18:屏幕分辨率=' + cResolutionRatio);
            var cSimSerialNumber = uexDevice.getInfo('19');//当前 设备的sim卡的序列号。只支持Android
            UNIT_TEST.log('19:sim卡序列号=' + cSimSerialNumber);
            var cUUID = uexDevice.getInfo('20');//Android返回空
            UNIT_TEST.log('20:UUID=' + cUUID);
            if(cOS == null || cOS == ''){
                UNIT_TEST.assert(false);
            }else{
                var result = false;
                if(cOS.indexOf('Android') > -1){
                    result = (cManufacturer == null || cIMEI == null || cDeviceToken == null ||
                                    cConnectStatus == null || cRestDiskSize == null || cMobileOperatorName == null ||
                                      cModel == null || cResolutionRatio == null || cSimSerialNumber == null);

                }else{
                    result = (cManufacturer == null || cIMEI == null || cDeviceToken == null || cDeviceType == null ||
                                     cConnectStatus == null || cRestDiskSize == null || cMobileOperatorName == null ||
                                         cModel == null || cResolutionRatio == null || cUUID == null);
                }
                UNIT_TEST.assertTrue(!result);
            }

        },
        "screenCapture":function(){
            uexDevice.screenCapture(1,function(error,data){
                  if(!error){
                      UNIT_TEST.log(data.savePath);
                      UNIT_TEST.assert(true);
                  }else{
                      UNIT_TEST.assert(false);
                  }
            });
        },
        "getVolume":function(){
            var voice = uexDevice.getVolume();
            UNIT_TEST.log("系统音量为:" + voice);
            UNIT_TEST.assertTrue(voice >= 0 && voice <= 1);
        },
        "setVolume":function(){
            var desVoice = 1;
            uexDevice.setVolume(desVoice);
            var currentVoice = uexDevice.getVolume();
            UNIT_TEST.log("当前音量为:" + currentVoice);
            UNIT_TEST.assertTrue(currentVoice == desVoice);
        },
        "setScreenAlwaysBright":function(){
            uexDevice.setScreenAlwaysBright(0);
            UNIT_TEST.assert(true);
        },
        "getScreenBrightness":function(){
            var brightness = uexDevice.getScreenBrightness();
            UNIT_TEST.log("当前屏幕亮度为:" + brightness);
            UNIT_TEST.assertTrue(brightness >= 0 && brightness <= 1);
        },
        "setScreenBrightness":function(){
            var des = 1;
            uexDevice.setScreenBrightness(des);
            var current = uexDevice.getScreenBrightness();
            UNIT_TEST.log("当前屏幕亮度为:" + current);
            UNIT_TEST.assertTrue(current == des);
        },
        "isFunctionEnable":function(){
            uexDevice.isFunctionEnable({
                setting:'GPS'
            }, function(data){
                if(data){
                    UNIT_TEST.log("GPS:已开启");
                }else{
                    UNIT_TEST.log("GPS:未开启");
                }
            });
            uexDevice.isFunctionEnable({
                setting:'BLUETOOTH'
            }, function(data){
                if(data){
                    UNIT_TEST.log("BLUETOOTH:已开启");
                }else{
                    UNIT_TEST.log("BLUETOOTH:未开启");
                }
            });
            var cOS = uexDevice.getInfo('1');//描述系统版本的字符串
            if(cOS.indexOf('iOS') > -1){
                uexDevice.isFunctionEnable({
                    setting:'NOTIFICATION'
                }, function(data){
                    if(data){
                        UNIT_TEST.log("NOTIFICATION:已开启");
                    }else{
                        UNIT_TEST.log("NOTIFICATION:未开启");
                    }
                });
            }
            uexDevice.isFunctionEnable({
                setting:'CAMERA'
            }, function(data){
                if(data){
                    UNIT_TEST.log("CAMERA:已开启");
                }else{
                    UNIT_TEST.log("CAMERA:未开启");
                }
                UNIT_TEST.assert(true);
            });
        }
    };

    UNIT_TEST.addCase("device", uexDeviceCase);
}
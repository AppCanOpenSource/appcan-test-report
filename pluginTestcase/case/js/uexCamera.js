if(UNIT_TEST){
    var size = 0;
    var uexCameraCase = {
        "open":function(){
            var comtextareass = '0';
            var quality = '100';
            uexCamera.open(comtextareass, quality, function(savePath) {
                if(savePath){
                      UNIT_TEST.log(savePath);
                      UNIT_TEST.assert(true);
                    }else{
                      UNIT_TEST.assert(false);
                }
            });
        },
        "openInternal":function(){
            var comtextareass = '0';
            var quality = '100';
            uexCamera.openInternal(comtextareass, quality, function(savePath) {
                if(savePath){
                       UNIT_TEST.log(savePath);
                       UNIT_TEST.assert(true);
                   }else{
                       UNIT_TEST.assert(false);
                }
            });
        },
        "openViewCamera":function(){
            if(uexWidgetOne.platformName.toLowerCase().indexOf('android') > -1){
                size = 800
            }else{
                size = 200;
            }
            UNIT_TEST.log(uexWidgetOne.platformName);
            UNIT_TEST.log("size:" + size);
            uexCamera.openViewCamera(0, 0, size, size,"奥格瑞玛",100, function(data){
                if(data){
                     UNIT_TEST.log(JSON.stringify(data));
                     UNIT_TEST.assert(true);
                }else{
                     UNIT_TEST.assert(false);
                    }
                });
        },
        "changeCameraPosition":function(){
            uexCamera.openViewCamera(50, 200, size, size,"奥格瑞玛",100,function(data){
                                     
            });
            setTimeout(function(){
                var position = uexCamera.changeCameraPosition(1);
                if(position == 1){
                    UNIT_TEST.log("设置摄像头前置成功:position = "+position);
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.log("设置摄像头前置失败:position != "+position);
                    UNIT_TEST.assert(false);
                }
            },1000)
            setTimeout(function(){
                       var position = uexCamera.changeCameraPosition(0);
                       if(position == 0){
                       UNIT_TEST.log("设置摄像头后置成功:position = "+position);
                       UNIT_TEST.assert(true);
                       }else{
                       UNIT_TEST.log("设置摄像头后置失败");
                       UNIT_TEST.assert(false);
                       }
                       },1000)
            
        },
        "changeFlashMode":function(){
                       var mode = uexCamera.changeFlashMode(1);
                       if(mode == 1){
                         UNIT_TEST.log("打开闪光灯成功:mode = "+mode);
                         UNIT_TEST.assert(true);
                       }else{
                         UNIT_TEST.log("打开闪光灯成功失败");
                         UNIT_TEST.assert(false);
                       }
        },
        "removeViewCameraFromWindow":function(){
                uexCamera.removeViewCameraFromWindow();
                UNIT_TEST.log("关闭自定义View照相机");
                UNIT_TEST.assert(true);
            
        }
    }
    UNIT_TEST.addCase("camera",uexCameraCase);
}
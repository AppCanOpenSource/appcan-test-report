if(UNIT_TEST){
    var uexSensorCase = {};
    /**
      如果下面的几个监听方法能正确运行，则代表open, close是没有问题的。
    */

    uexSensorCase.onAccelerometerChange = function() {
        uexSensor.open(1, 3);
        uexSensor.onAccelerometerChange = function (x, y, z) {
            UNIT_TEST.log("[data]x:" + x + "  y:" + y + "   z:" + z);
            UNIT_TEST.assert(true);
            uexSensor.close(1);
        }
    }
    uexSensorCase.onOrientationChange = function() {
        if (uexWidgetOne.platformName.indexOf('android') > -1) {
            uexSensor.open(2, 3);
            uexSensor.onOrientationChange = function (x, y, z) {
                UNIT_TEST.log("[data]x:" + x + "  y:" + y + "   z:" + z);
                UNIT_TEST.assert(true);
                uexSensor.close(2);
            }

        } else { //ios不支持
            UNIT_TEST.log("iOS not support, let it go");
            UNIT_TEST.assert(true);
        }
    }
    uexSensorCase.onMagneticChange = function() { //磁场传感器的监听方法
        uexSensor.open(3, 3);
        uexSensor.onMagneticChange = function (x, y, z) {
            UNIT_TEST.log("[data]x:" + x + "  y:" + y + "   z:" + z);
            UNIT_TEST.assert(true);
            uexSensor.close(3);
        }
    }
    uexSensorCase.onLightChange = function() { //磁场传感器的监听方法
        UNIT_TEST.log("开始测试亮度");
        if (uexWidgetOne.platformName.indexOf('android') > -1) {
            uexSensor.open(6, 3);
            uexSensor.onLightChange = function (data) {
                UNIT_TEST.log("[data]" + data );
                UNIT_TEST.assert(true);
                uexSensor.close(6);
            }
        } else { //ios不支持
             UNIT_TEST.log("iOS not support, let it go");
             UNIT_TEST.assert(true);
        }
    }

   UNIT_TEST.addCase("uexSensor", uexSensorCase);
}

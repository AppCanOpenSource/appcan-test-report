if(UNIT_TEST){
    var latitude;
    var longitude;
    
    var uexLocationCase = {
        "openLocation":function(){
            uexLocation.openLocation("bd09",function(error) {
            if(!error){
                    UNIT_TEST.log("打开定位成功");
                    uexLocation.closeLocation();
                    UNIT_TEST.log("关闭定位成功");
                    UNIT_TEST.assertTrue(error == 0);
            }else{
                    UNIT_TEST.log("打开定位失败");
                    UNIT_TEST.assertTrue(error == 0);
            }
                   
            });

        },
        "getAddressByType":function(){
            var params = {
            latitude: "30.475798",
            longitude: "114.402815",
            type:"gcj02",
            flag:2
            };
            uexLocation.getAddressByType(params,function(error, data){
                if(!error){
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assertTrue(error == 0);
                 }else{
                    UNIT_TEST.log(error);
                    UNIT_TEST.assertTrue(error == 0);
                }
              
            });
        },

        "convertLocation":function(){
            var params = {
            latitude:30.595997,
            longitude:114.312047,
            from:"wgs84",
            to:"bd09"
            };
            var data = uexLocation.convertLocation(JSON.stringify(params));
            var obj = JSON.parse(data);
            if(data){
                UNIT_TEST.log(obj.latitude+","+obj.longitude);
                UNIT_TEST.assert(true);
            }else{
                UNIT_TEST.assert(false);
            }
           
        }
        
    }
    UNIT_TEST.addCase("location",uexLocationCase);
}
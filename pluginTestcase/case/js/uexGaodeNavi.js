if (UNIT_TEST) {
    var uexGaodeCase = {
        "init":function(){
            uexGaodeNavi.init(function(error,data){
                              if(!error){
                              UNIT_TEST.assert(true);
                              }else{
                              UNIT_TEST.assert(false);
                              }
                              });
        },

        "onGetNavigationText":function () {
            uexGaodeNavi.onGetNavigationText = function(obj){
                    UNIT_TEST.log(obj);
                
            }
            UNIT_TEST.assert(true);
        },
        "calculateDriveRoute":function () {
            var params = {
            startPoint:[39.925846, 116.432765],
            wayPoints:[[39.925846, 116.432345],[39.925846, 116.432789]],
            endPoint:[39.925041, 116.437901]
            };
            
                uexGaodeNavi.calculateDriveRoute(params,function(error,data){
                    UNIT_TEST.assert(!error);
                });
          
            
        },
//        "calculateWalkRoute":function () {
//            var params = {
//            startPoint:[39.925846, 116.432765],
//            endPoint:[39.925041, 116.437901]
//            };
//            
//            uexGaodeNavi.calculateWalkRoute(params,function(error,data){
//                                             UNIT_TEST.assert(!error);
//                                             });
//            
//            
//        },
        "startNavi":function () {
            var params = {
            type:1
            };
            var data = JSON.stringify(params);
            uexGaodeNavi.startNavi(data);
            UNIT_TEST.assert(true);
        },
        "stopNavi":function(){
            setTimeout(function(){
                       uexGaodeNavi.stopNavi();
                    },5000)
            
            
            UNIT_TEST.assert(true);
        }
        
    };
    
    UNIT_TEST.addCase("Gaode", uexGaodeCase);
}
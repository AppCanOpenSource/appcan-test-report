/**
 * Created by ylt on 16/8/29.
 */

if (UNIT_TEST) {
    var uexBaiduNaviCase = {
        "init":function(){
            var data={
                baiduAPIKey:"cCfq6oSxA8SKsHB7FopAocyX"
            };
            uexBaiduNavi.init(data,function(error,data){
                if(!error){
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.assert(false);
                }
            });
        },
        "startRoutePlan":function () {
            var data={
                startNode:[113.948222,22.549555],
                endNode:[114.089863,22.546236],
                throughNodes:[[113.977004,22.556393]],
                mode:2
            }
            uexBaiduNavi.startRoutePlan(data,function(error,data){
                UNIT_TEST.assert(!error);
            });
        },
        "startNavi":function () {
            var data={
                naviType:1,
                isNeedLandscape:2
            }
            uexBaiduNavi.startNavi(data);
            UNIT_TEST.assert(true);
        },
        "onExitNavi":function () {
            uexBaiduNavi.onExitNavi=function(){
                UNIT_TEST.assert(true);
            }
        }
    };

    UNIT_TEST.addCase("BaiduNavi", uexBaiduNaviCase);
}
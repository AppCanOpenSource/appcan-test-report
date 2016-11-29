if (UNIT_TEST) {
    var uexTencentLVBCase = {
        "livePlay": function() {
            var params = {
            url: "http://2527.vod.myqcloud.com/2527_000007d095b623aec5c0e09deb0257441c850005.f0.flv",
            bgImage:"res://background.png"
            };
            uexTencentLVB.livePlay(JSON.stringify(params));
            setTimeout(function(){
                 UNIT_TEST.assert(true);
            },10000);
            
        },
        
        "vodPlay": function() {
            var params = {
            url: "http://2527.vod.myqcloud.com/2527_000007d095b623aec5c0e09deb0257441c850005.f0.flv",
            bgImage:"res://background.png"
            };
            uexTencentLVB.vodPlay(JSON.stringify(params));
            setTimeout(function(){
                UNIT_TEST.assert(true);
            },15000);
        },
        
        "publish": function() {
            var params = {
            url: "rtmp://2000.livepush.myqcloud.com/live/2000_4eb4da7079af11e69776e435c87f075e?bizid=2000",
            bgImage:"res://background.png"
            };
            uexTencentLVB.publish(JSON.stringify(params));
            setTimeout(function(){
                UNIT_TEST.assert(true);
            },10000);
        }
        
    };
    UNIT_TEST.addCase("tencentLVB", uexTencentLVBCase);
}

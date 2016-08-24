/**
 * Created by ylt on 16/8/24.
 */

if (UNIT_TEST) {
    var uexVideoCase = {
        "openPlayer": function () {
            openPlayer();
            UNIT_TEST.assert(true);
        },
        "closePlayer":function () {
            openPlayer();
            setTimeout(' uexVideo.closePlayer();' +
                'UNIT_TEST.assert(true);',1000);

        },
        "record":function () {
            var params = {
                maxDuration:15,
                qualityType:1,
                bitRateType:2,
                fileType:"mp4"
            }
            uexVideo.record(JSON.stringify(params));
            uexVideo.onRecordFinish = function(info){
                UNIT_TEST.assert(true);
            };
        },
        "onPlayerClose":function () {
            UNIT_TEST.log("请手动关闭播放器");
            var assert=false;
            openPlayer();
            uexVideo.onPlayerClose = function(info){
                if (!assert){
                    assert=true;
                    UNIT_TEST.assert(true);
                }
            };
        },
        "onPlayerStatusChange":function () {
            var assert=false;
            openPlayer();
            uexVideo.onPlayerStatusChange = function(info){
                var json=JSON.parse(info);
                if(!assert&&json.status==2){
                    UNIT_TEST.assert(true);
                    assert=true;
                    setTimeout("uexVideo.closePlayer();",1000);
                }
            };
        },
    };

    function openPlayer() {
        var param = {
            src: "res://video.mp4",
            startTime: 3,
            autoStart: true,
            forceFullScreen: false,
            showCloseButton: true,
            showScaleButton: true,
            width: 650,
            height: 480,
            x: 100,
            y: 100,
            scrollWithWeb: true
        };
        uexVideo.openPlayer(JSON.stringify(param));
    }

    UNIT_TEST.addCase("uexVideo", uexVideoCase);
}
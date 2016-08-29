/**
 * Created by ylt on 16/8/26.
 */

if (UNIT_TEST) {
    var uexBackgroundCase = {
        "start":function(){
            var data = {
                jsPath:"res://background.js",
                jsResourcePaths:["res://../js/constant.js","res://../js/CCLog.js"]
            };
            var result = uexBackground.start(data);
            UNIT_TEST.assertTrue(result);
        }
    };

    UNIT_TEST.addCase("uexBackground", uexBackgroundCase);
}





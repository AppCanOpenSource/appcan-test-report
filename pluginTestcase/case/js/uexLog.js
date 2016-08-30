/**
 * Created by ylt on 16/8/30.
 */

if (UNIT_TEST) {


    var uexLogCase = {
        "sendLog": function () {
            uexLog.sendLog("-----------------log-----------------");
            UNIT_TEST.assert(true);
        }
    };

    UNIT_TEST.addCase("uexLog", uexLogCase);
}

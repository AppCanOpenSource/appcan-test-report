/**
 * Created by ylt on 16/8/30.
 */

if (UNIT_TEST) {

    var uexUmengCase = {
        "onEvent": function () {
            var eventName = "sell_event";
            var data = {
                "item":"apple"
            };
            uexUmeng.onEvent(eventName, data);
            UNIT_TEST.assert(true);
        },
        "getDeviceInfo":function () {
            var info = uexUmeng.getDeviceInfo();
            UNIT_TEST.log(JSON.stringify(info));
            UNIT_TEST.assert(true);
        }
    };

    UNIT_TEST.addCase("uexUmeng", uexUmengCase);
}

define(["CC"], function(CC) {
    if (!UNIT_TEST) {
        return;
    }

    var uexQupaiCase = {};
    uexQupaiCase.init = function() {
        var params = {
          appKey: "206ad2ea1113d3e",
          appSecret: "5a20f29cc65e4b7fbca31eecb6338589",
          space: "fred"
        }
        uexQupai.init(JSON.stringify(params), function(error, code) {
            if (!error) {
                UNIT_TEST.assert(true);
                return;
            }
            UNIT_TEST.log("[error code]" + code);
            UNIT_TEST.assert(false);
        });
    }
    uexQupaiCase.config = function() {
        var params = {
            minDuration:1,
            maxDuration:4
        }
        uexQupai.config(JSON.stringify(params));
        UNIT_TEST.assert(true);

    }
    uexQupaiCase.record = function() {
        uexQupai.record(function(error, data) {
            if (!error) {
                UNIT_TEST.assert(true);
                UNIT_TEST.log("[data]:" + JSON.stringify(data));
            } else {
                UNIT_TEST.assert(false);
                UNIT_TEST.log("[data]:" + data);
            }
        });
    }
    UNIT_TEST.addCase("uexQupaiCase", uexQupaiCase);
});
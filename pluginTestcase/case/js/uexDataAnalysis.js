/**
 * Created by ylt on 16/8/30.
 */

if (UNIT_TEST) {


    var uexDataAnalysisCase = {
        "setEvent": function () {
            var reportStr = '{"次数统计":"1","test":"是的","12":"55"}';
            //uexDataAnalysis.setEvent(inEventId,inAttri);
            uexDataAnalysis.setEvent("SetEvent", reportStr);
            UNIT_TEST.assert(true);
        },
        "beginEvent":function () {
            uexDataAnalysis.beginEvent("BeginAndEndEvent", "BeginAndEndEvent", '{"时长统计":"2","test2":"是的","12":"55"}');
            UNIT_TEST.assertDelay(true,2000);
        },
        "endEvent":function () {
            uexDataAnalysis.endEvent("BeginAndEndEvent", "BeginAndEndEvent");
            UNIT_TEST.assert(true);
        },
        "setErrorReport":function () {
            uexDataAnalysis.setErrorReport("1");
            UNIT_TEST.assert(true);
        }
    };

    UNIT_TEST.addCase("uexDataAnalysis", uexDataAnalysisCase);
}


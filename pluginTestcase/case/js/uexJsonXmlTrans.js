if(UNIT_TEST){
    var uexJsonXmlTransCase = {};
    uexJsonXmlTransCase.json2xml = function() {
        var param = '{ "key1":"value1","key2":{"hehe":"讨厌"},"key3":3,"key4":false,"key5":["1","2","3"]}';

        uexJsonXmlTrans.json2xml(param, function(error, data){
            UNIT_TEST.log("[data]" + data);
            if(error) {
                UNIT_TEST.assert(false);
            } else {
                UNIT_TEST.assert(true);
            }

        });
    }
    uexJsonXmlTransCase.jsonFile2xml = function () {
        var param = "res://example.json";
         uexJsonXmlTrans.json2xml(param, function(error, data){
            UNIT_TEST.log("[data]" + data);
            if(error) {
                UNIT_TEST.assert(false);
            } else {
                UNIT_TEST.assert(true);
            }
         });
    }
    uexJsonXmlTransCase.xml2json = function() {
        var param = '<key3>3</key3><key1>value1</key1><key4>0</key4><key2><hehe>讨厌</hehe></key2><key5>1</key5><key5>2</key5><key5>3</key5>';
        uexJsonXmlTrans.xml2json(param,function(error, data){
            UNIT_TEST.log("[data]" + JSON.stringify(data));
            if(error) {
                UNIT_TEST.assert(false);
            } else {
                UNIT_TEST.assert(true);
            }
        });
    }
    uexJsonXmlTransCase.xml2Filejson = function() {
        var param = 'res://example.xml';
        uexJsonXmlTrans.xml2json(param,function(error, data){
            UNIT_TEST.log("[data]" + JSON.stringify(data));
            if(error) {
                 UNIT_TEST.assert(false);
            } else {
                UNIT_TEST.assert(true);
            }
        });
    }

   UNIT_TEST.addCase("uexJsonXmlTrans", uexJsonXmlTransCase);
}

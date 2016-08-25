if (UNIT_TEST) {
    var uexScannerCase = {
        "setJsonData": function(){
                     var jsonData = {
                       lineImg:"res://line.png",
                       pickBgImg:"res://pick_bg.png",
                       tipLabel:"对准二维码/条形码,即可自动扫描",
                       title:"扫一下"
                     };
                     uexScanner.setJsonData(jsonData);
                      UNIT_TEST.assert(true);

                },
        "open": function(){
            uexScanner.open(function(error, data) {
                if (!error) {
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                } else {
                     UNIT_TEST.assert(false);
                }

            });
        }
    };
    UNIT_TEST.addCase("scanner", uexScannerCase);
}

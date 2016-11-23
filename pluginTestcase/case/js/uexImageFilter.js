if (UNIT_TEST) {
    var uexImageFilterCase = {
        "open": function() {
            uexImageFilter.open({
                path:"res://girl.jpg"
            },function(error,path){
                if(!error){
                    UNIT_TEST.log(path);
                }else{
                    UNIT_TEST.log("user canceled");
                }
                UNIT_TEST.assert(true);
            })
        },
        "openView":function () {
            uexImageFilter.openView({
                w:720,
                h:720,
                type:"InkWell",
                path:"res://girl.jpg"
            });
            UNIT_TEST.assertDelay(true,5000);
        },
        "closeView":function () {
            uexImageFilter.closeView();
            UNIT_TEST.assert(true);
        }
    };
    UNIT_TEST.addCase("gpuImage", uexImageFilterCase);
}
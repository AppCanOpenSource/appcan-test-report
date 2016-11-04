if (UNIT_TEST) {
    var uexGPUImageCase = {
        "open": function() {
            uexGPUImage.open({
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
            uexGPUImage.openView({
                w:720,
                h:720,
                type:"InkWell",
                path:"res://girl.jpg"
            });
            UNIT_TEST.assertDelay(true,5000);
        },
        "closeView":function () {
            uexGPUImage.closeView();
            UNIT_TEST.assert(true);
        }
    };
    UNIT_TEST.addCase("gpuImage", uexGPUImageCase);
}
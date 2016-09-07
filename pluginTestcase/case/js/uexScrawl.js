if(UNIT_TEST){
    var uexScrawlCase = {
        "open":function(){
            var params = {
                "src":"res://image.jpg"
            };
            uexScrawl.open(params,function(error,savePath){
                           if(!error){
                           UNIT_TEST.log("图片的路径为:"+savePath)
                           UNIT_TEST.assert(true);
                           }else{
                           UNIT_TEST.assert(false);
                           }
                           });
        }
    }
    UNIT_TEST.addCase("scrawl",uexScrawlCase);
}
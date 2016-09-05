if(UNIT_TEST){
    var uexLoadingViewCase = {
        "open":function(){
            var jsonstr = {"x":0, "y":300, "w":240, "h":40, "style":{"styleId":0, "pointNum":4, "pointColor":["#ff4444", "#ffbb33", "#99cc00", "#33b5e5"]}};
            //var jsonstr = {"x":0, "y":300, "w":150, "h":20, "style":{"styleId":1, "pointNum":4, "pointColor":["#ff4444"]}};
            uexLoadingView.open(jsonstr);
            UNIT_TEST.assertDelay(true, 3000);
        },
        "openCircleLoading":function(){
            uexLoadingView.openCircleLoading();
            UNIT_TEST.assertDelay(true, 3000);
        },
        "close":function(){
            uexLoadingView.close();
            UNIT_TEST.assertTrue(true);
        }
    }
    
    UNIT_TEST.addCase("loadingView",uexLoadingViewCase);
}
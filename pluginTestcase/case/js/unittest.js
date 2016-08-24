/*Auto generate by UI designer */
(function($) {
    appcan.button("#nav-left", "btn-act", function() {
    });
    appcan.button("#nav-right", "btn-act", function() {
       appcan.window.close(-1);
    });

    appcan.ready(function() {
        $.scrollbox($("body")).on("releaseToReload", function() {//After Release or call reload function,we reset the bounce
            $("#ScrollContent_dgMxRd").trigger("reload", this);
        }).on("onReloading", function(a) {//if onreloading status, drag will trigger this event

        }).on("dragToReload", function() {//drag over 30% of bounce height,will trigger this event

        }).on("draging", function(status) {//on draging, this event will be triggered.

        }).on("release", function() {//on draging, this event will be triggered.

        }).on("scrollbottom", function() {//on scroll bottom,this event will be triggered.you should get data from server
            $("#ScrollContent_dgMxRd").trigger("more", this);
        });
    })

    appcan.ready(function() {
        var query=uexWindow.getUrlQuery();
        console.log("------------------"+query);
        var testList =[];
        testList[0]=query;
        require(testList,function(){
            UNIT_TEST.start($("#Pane_s7tXbl"));
        });

                 
                 
        
    })

})($);

var btn = 0;
if (UNIT_TEST) {
    var uexTabIndicatorViewCase = {
         "open":function(){
             var containerId="123";
             uexWindow.createPluginViewContainer({
                 id:containerId,
                 x:0,
                 y:500,
                 w:1080,
                 h:400
              });
             uexTabIndicatorView.test(containerId);
             var param = {
                x:0,
                y:150,
                w:1080,
                h:150,
                textColor:"#F44336",
                bgColor:"#FFFFFF",
                dividerColor:"#D32F2F",
                indicatorColor:"#D32F2F",
                containerId:containerId,
                titles:["头条","精选","轻松一刻","娱乐","热点","体育"]
             };
             uexTabIndicatorView.open(param);
             // setTimeout(function(){
             //    uexTabIndicatorView.close();
             // },4000);
             UNIT_TEST.assertDelay(true,2000);
         },
        "openMultiPop":function(){
            var top=1000;
            var tabHeight=150;
            var params ={
                content: [
                          {
                          inPageName:"p1",
                          inUrl:"http://www.baidu.com",
                          inData:""
                          },
                          {
                          inPageName:"p2",
                          inUrl:"https://www.taobao.com/",
                          inData:""
                          }
                          ]
            };

            var paramStr = JSON.stringify(params);

            uexWindow.openMultiPopover(paramStr,"multipop",0,0,top+tabHeight,1080,500,'',0,0);
            uexWindow.setSelectedPopOverInMultiWindow("multipop", 1);
                var param = {
                    x:0,
                    y:top,
                    w:1080,
                    h:tabHeight,
                    textColor:"#F44336",
                    bgColor:"#FFFFFF",
                    multiPopName:"multipop",
                    bindMode:1,
                    dividerColor:"#D32F2F",
                    indicatorColor:"#D32F2F",
                    titles:["baidu","taobao"]
                };
            uexTabIndicatorView.open(param);
            uexTabIndicatorView.setVisible(0);
            setTimeout(function(){
              uexTabIndicatorView.setVisible(1);
            },1000)
            UNIT_TEST.assert(true);
        }

    };
    UNIT_TEST.addCase("TabIndicatorView", uexTabIndicatorViewCase);
}
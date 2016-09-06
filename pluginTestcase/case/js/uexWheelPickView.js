define(["CC"], function(CC) {
       if (!UNIT_TEST) {
       return;
       }
       
       var uexWheelPickViewCase = {};
       uexWheelPickViewCase.open = function() {
          var params = {
                x:0,
                y:100,
                width:window.screen.width,
                height:300,
                src:"res://test1.json",//"res://test.json"
                select:[2,7]//[2,7,3]
       };
       uexWheelPickView.open(params);
       CC.confirm("检测UI是否正确", function(ret) {
                  UNIT_TEST.assert(ret);
                  });
       }
     uexWheelPickViewCase.onConfirmClick = function() {
       UNIT_TEST.log("请点击某一项......");
       uexWheelPickView.onConfirmClick = function(data) {
       CC.confirm("请确认你选中的数据是否为:" + JSON.stringify(data), function(ret) {
                  UNIT_TEST.assert(ret);
                  });
        }
       }

        UNIT_TEST.addCase("wheelPickView",uexWheelPickViewCase);
       });
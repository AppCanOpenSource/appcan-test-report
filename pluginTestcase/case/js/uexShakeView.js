define(["CC"],
function(CC) {
    if (!UNIT_TEST) return;
    var uexShakeViewCase = {};
    uexShakeViewCase.open = function(){
       var params ={
           x:0,
           y:window.screen.availHeight / 2,
           w:300,
           h:300
       };
       uexShakeView.open(params);
       CC.confirm("检测UI是否正确", function(ret) {
           UNIT_TEST.assert(ret);
       });
    }
    uexShakeViewCase.onShake = function(){
        UNIT_TEST.log("请摇晃你的设备.....");
        uexShakeView.onShake = function() {
             UNIT_TEST.assert(true);
        }
    }
    uexShakeViewCase.close = function(){
       uexShakeView.close();
       CC.confirm("请确认摇一摇页面已关闭", function(ret) {
          UNIT_TEST.assert(ret);
       });
    }
    UNIT_TEST.addCase("shakeView",uexShakeViewCase);
});

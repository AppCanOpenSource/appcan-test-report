var btn = 0;
if (UNIT_TEST) {
    var uexButtonCase = {
        "create":function(){
            var param = {
                x:0,
                y:0,
                width:200,
                height:90,
                data:{
                   title:"AppCan",
                   titleColor:"#111111",
                   bgImage:"res://btn.png",
                   textSize:"12"
                }
            }
            btn = uexButton.create(param);
            UNIT_TEST.assert(true);
        },
        "onClick":function(){
            UNIT_TEST.log("请点击按钮，触发onClick回调事件！");
            uexButton.onClick = function(btn){
                UNIT_TEST.log("onClick:" + btn);
                UNIT_TEST.assert(true);
            };
        },
        "close":function(){
            uexButton.close(btn);
            UNIT_TEST.assert(true);
        }
    };
    UNIT_TEST.addCase("button", uexButtonCase);
}
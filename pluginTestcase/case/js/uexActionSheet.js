var btn = 0;
if (UNIT_TEST) {
    var uexActionSheetCase = {
        "open":function(){
            var jsonData = {
                "actionSheet_style": {
                    "frameBgColor": "#ffffff",
                    "frameBroundColor": "#ff0000",
                    "frameBgImg": "",
                    "btnSelectBgImg": "res://btn-act.png",
                    "btnUnSelectBgImg": "res://btn.png",
                    "cancelBtnSelectBgImg": "res://cancel-act.png",
                    "cancelBtnUnSelectBgImg": "res://cancel.png",
                    "textSize": 20,
                    "textNColor": "#ffffff",
                    "textHColor": "#ffffff",
                    "cancelTextNColor": "#ffffff",
                    "cancelTextHColor": "#ffffff",
                    "actionSheetList": [
                        {
                            "name": "新浪微博"
                        },
                        {
                            "name": "腾讯微博"
                        },
                        {
                            "name": "分享"
                        }
                    ]
                }
            };
            uexActionSheet.open(0,0,0,0,jsonData);
            UNIT_TEST.assert(true);
        },
        "onClickItem":function(){
            UNIT_TEST.log("请选择一个item，触发onClickItem回调事件！");
            uexActionSheet.onClickItem = function(index){
                UNIT_TEST.log("onClickItem:" + index);
                UNIT_TEST.assert(true);
            };
        }
    };
    UNIT_TEST.addCase("actionSheet", uexActionSheetCase);
}
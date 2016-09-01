define(["CC"], function(CC) {
    if (!UNIT_TEST) {
        return;
    }

    var uexEditDialogCase = {};
    var editDialog;
    uexEditDialogCase.open = function() {
        var params = {
            "x": 0,
            "y": 0,
            "width": 150,
            "height": 150,
            "fontSize": 18,
            "fontColor": "#ffff00",
            "inputType": 0,
            "inputHint": "提示文字",
            "defaultText": "默认",
            "maxNum": 200
        }
        editDialog = uexEditDialog.create(JSON.stringify(params));
        if (editDialog) {
            UNIT_TEST.assert(true);
        } else {
            UNIT_TEST.assert(false);
        }
    }
    uexEditDialogCase.insert = function() {
        var result = uexEditDialog.insert(editDialog,"Insert Data");
        UNIT_TEST.assert(result);
    }

    uexEditDialogCase.getContent = function() {
        var data = uexEditDialog.getContent(editDialog);
        UNIT_TEST.log("[getContent data]" + data);
        CC.confirm("请确认获取的数据是否正确", function(ret) {
            UNIT_TEST.assert(ret);
        });
    }

    uexEditDialogCase.onNum = function() {
        UNIT_TEST.log("请删除或添加部份文字...." );
        var isExecuted = false;
        uexEditDialog.onNum = function(editDialog, num) {
            if (!isExecuted) {
                isExecuted = true;
                CC.confirm("还可输入" + num + "字符", function(ret) {
                    UNIT_TEST.assert(ret);
                });
            }

        }
    }
    uexEditDialogCase.cleanAll = function() {
        var result = uexEditDialog.cleanAll(editDialog);
        UNIT_TEST.assert(result);
    }
    uexEditDialogCase.close = function() {
        var result = uexEditDialog.close (editDialog);
        UNIT_TEST.assert(result);
    }
    UNIT_TEST.addCase("uexPopoverMenu", uexEditDialogCase);
});
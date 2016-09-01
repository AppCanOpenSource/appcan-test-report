define(["CC"], function(CC) {
    if (!UNIT_TEST) {
        return;
    }

    var uexPopoverMenuCase = {};
    uexPopoverMenuCase.open = function() {
        var params = {
            "x": window.screen.width * 0.00,
            "y": window.screen.height * 0.0,
            "direction": 3,
            "bgColor": '#FFC125',
            "dividerColor": '#191B1D',
            "textColor": '#FFFFFF',
            "textSize": window.screen.width * 0.042,
            "data": [{
                "icon": 'res://popovermenu/groupchat.png',
                "text": 'Group Chat'
            },
            {
                "icon": 'res://popovermenu/addcontacts.png',
                "text": 'Add Contacts'
            },
            {
                "icon": 'res://popovermenu/scanqrcode.png',
                "text": 'Scan QR code'
            },
            {
                "icon": 'res://popovermenu/feedback.png',
                "text": 'Feedback'
            }]
        };
        uexPopoverMenu.openPopoverMenu(JSON.stringify(params));
        CC.confirm("检测UI是否正确", function(ret) {
            UNIT_TEST.assert(ret);
        });
    }
    uexPopoverMenuCase.onItemClicked = function() {
        UNIT_TEST.log("请点击某一项......");
        uexPopoverMenu.onItemClicked = function(index) {
            CC.confirm("请确认你点击的是否是第" + (index + 1) + "项", function(ret) {
                UNIT_TEST.assert(ret);
            });
        }
    }
    UNIT_TEST.addCase("uexPopoverMenu", uexPopoverMenuCase);
});
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
                "icon": 'res://groupchat.png',
                "text": 'Group Chat'
            },
            {
                "icon": 'res://addcontacts.png',
                "text": 'Add Contacts'
            },
            {
                "icon": 'res://scanqrcode.png',
                "text": 'Scan QR code'
            },
            {
                "icon": 'res://feedback.png',
                "text": 'Feedback'
            }]
        };
        uexPopoverMenu.openPopoverMenu(JSON.stringify(params), function(index) {
            CC.confirm("请确认你点击的是否是第" + (index + 1) + "项",
            function(ret) {
                UNIT_TEST.assert(ret);
            });
        });
        CC.confirm("检测UI是否正确", function(ret) {
            //UNIT_TEST.assert(ret);
            if (ret) {
                UNIT_TEST.log("请点击某一项......");
            }

        });
    }

    UNIT_TEST.addCase("uexPopoverMenu", uexPopoverMenuCase);
});
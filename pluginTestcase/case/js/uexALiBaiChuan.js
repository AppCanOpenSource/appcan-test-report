define(["CC"],
function(CC) {
    if (UNIT_TEST) {
        var uexALiBaiChuanCase = {
            "init": function() {
                uexALiBaiChuan.init(function(error, msg) {
                    if (!error) {
                        UNIT_TEST.assert(true);
                    } else {
                        UNIT_TEST.log('[init fail]' + msg);
                        UNIT_TEST.assert(false);
                    }
                });

            },
            "login": function() {
                uexALiBaiChuan.login(function(error, msg) {
                    if (!error) {
                        UNIT_TEST.assert(true);
                    } else {
                        UNIT_TEST.log('[login fail]' + msg);
                        UNIT_TEST.assert(false);
                    }
                });
            },
            "getUserInfo ": function() {
                var info = uexALiBaiChuan.getUserInfo();
                if (info) {
                    UNIT_TEST.log('[user info]' + JSON.stringify(info));
                    UNIT_TEST.assert(true);
                } else {
                    UNIT_TEST.assert(false);
                }

            },
            "openMyCart": function() {
                UNIT_TEST.log('[打开购物车后请手动关闭]');
                setTimeout(function() {
                    uexALiBaiChuan.openMyCart();
                    CC.confirm("请确认购物车刚才是否打开？", function(ret) {
                        UNIT_TEST.assert(ret);
                    });
                },
                2000);

            },
            "openMyOrdersPage": function() {
                UNIT_TEST.log('[打开订单列表后请手动关闭]');
                setTimeout(function() {
                    uexALiBaiChuan.openMyOrdersPage();
                    CC.confirm("请确认订单列表刚才是否打开？", function(ret) {
                        UNIT_TEST.assert(ret);
                    });
                },
                2000);

            },
            "openItemDetailPageById": function() {
                UNIT_TEST.log('[打开商品详情页后请手动关闭]');

                setTimeout(function() {
                    var params = {
                        isvcode: "appcan",
                        itemid: "45535180986",
                        mmpid: "mm_175878368_0_0"
                    };
                    uexALiBaiChuan.openItemDetailPageById(JSON.stringify(params));
                    CC.confirm("请确认商品详情页刚才是否打开, 内容是否正确", function(ret) {
                        UNIT_TEST.assert(ret);
                    });

                },
                2000);

            },
            "openItemDetailPageByURL": function() {
                UNIT_TEST.log('[打开商品详情页后请手动关闭]');
                setTimeout(function() {
                    var params = {
                        url: "https://detail.tmall.com/item.htm?id=528887107325",
                        mmpid: "mm_175878368_0_0"
                    };
                    uexALiBaiChuan.openItemDetailPageByURL(JSON.stringify(params));
                    CC.confirm("请确认商品详情页刚才是否打开, 内容是否正确", function(ret) {
                        UNIT_TEST.assert(ret);
                    });
                },
                2000);

            },
            "logout": function() {
                uexALiBaiChuan.logout(function(error, msg) {
                    if (!error) {
                        UNIT_TEST.assert(true);
                    } else {
                        UNIT_TEST.log('[logout fail]' + msg);
                        UNIT_TEST.assert(false);
                    }
                });
            }
        };
        UNIT_TEST.addCase("uexALiBaiChuan", uexALiBaiChuanCase);
    }
});
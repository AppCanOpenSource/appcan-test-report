if (UNIT_TEST) {
    var uexTabBarWithPopMenuCase = {};
    uexTabBarWithPopMenuCase.open = function() {
        var params = {
            statusColor: "#ffffff",
            tab: {
                textSize: 10,
                textNColor: "#ffffff",
                textHColor: "#EE0000",
                centerImg: "res://tabbarwithpopmenu/plus2.png",
                bgColor: "#32394A",
                data: [{
                    title: "动态",
                    iconN: "res://tabbarwithpopmenu/tab1.png",
                    iconH: "res://tabbarwithpopmenu/tab1_1.png"
                },
                {
                    title: "与我相关",
                    iconN: "res://tabbarwithpopmenu/tab2.png",
                    iconH: "res://tabbarwithpopmenu/tab2_1.png"
                },
                {
                    title: "我的空间",
                    iconN: "res://tabbarwithpopmenu/tab3.png",
                    iconH: "res://tabbarwithpopmenu/tab3_1.png"
                },
                {
                    title: "玩吧",
                    iconN: "res://tabbarwithpopmenu/tab4.png",
                    iconH: "res://tabbarwithpopmenu/tab4_1.png"
                }]
            },
            popMenu: {
                textSize: 12,
                textNColor: "#000000",
                textHColor: "#EA7C24",
                bgColor: "#ffffff",
                bottomDistance: 300,
                data: [[{
                    title: "联系人",
                    iconN: "res://tabbarwithpopmenu/pop1.png",
                    iconH: "res://tabbarwithpopmenu/pop1_1.png"
                },
                {
                    title: "保存",
                    iconN: "res://tabbarwithpopmenu/pop2.png",
                    iconH: "res://tabbarwithpopmenu/pop2_1.png"
                },
                {
                    title: "拍照",
                    iconN: "res://tabbarwithpopmenu/pop3.png",
                    iconH: "res://tabbarwithpopmenu/pop3_1.png"
                },
                {
                    title: "打印文件",
                    iconN: "res://tabbarwithpopmenu/pop4.png",
                    iconH: "res://tabbarwithpopmenu/pop4_1.png"
                },
                {
                    title: "定位",
                    iconN: "res://tabbarwithpopmenu/pop5.png",
                    iconH: "res://tabbarwithpopmenu/pop5_1.png"
                }

                ], [{
                    title: "联系人",
                    iconN: "res://tabbarwithpopmenu/pop1.png",
                    iconH: "res://tabbarwithpopmenu/pop1_1.png"
                },
                {
                    title: "联系人",
                    iconN: "res://tabbarwithpopmenu/pop1.png",
                    iconH: "res://tabbarwithpopmenu/pop1_1.png"
                },
                {
                    title: "联系人",
                    iconN: "res://tabbarwithpopmenu/pop1.png",
                    iconH: "res://tabbarwithpopmenu/pop1_1.png"
                },
                {
                    title: "联系人",
                    iconN: "res://tabbarwithpopmenu/pop1.png",
                    iconH: "res://tabbarwithpopmenu/pop1_1.png"
                },
                {
                    title: "定位",
                    iconN: "res://tabbarwithpopmenu/pop5.png",
                    iconH: "res://tabbarwithpopmenu/pop5_1.png"
                }

                ], [{
                    title: "联系人",
                    iconN: "res://tabbarwithpopmenu/pop1.png",
                    iconH: "res://tabbarwithpopmenu/pop1_1.png"
                },
                {
                    title: "保存",
                    iconN: "res://tabbarwithpopmenu/pop2.png",
                    iconH: "res://tabbarwithpopmenu/pop2_1.png"
                },
                {
                    title: "拍照",
                    iconN: "res://tabbarwithpopmenu/pop3.png",
                    iconH: "res://tabbarwithpopmenu/pop3_1.png"
                },
                {
                    title: "打印文件",
                    iconN: "res://tabbarwithpopmenu/pop4.png",
                    iconH: "res://tabbarwithpopmenu/pop4_1.png"
                },
                {
                    title: "定位",
                    iconN: "res://tabbarwithpopmenu/pop5.png",
                    iconH: "res://tabbarwithpopmenu/pop5_1.png"
                }

                ]]
            }
        }
        uexTabBarWithPopMenu.open(JSON.stringify(params));
        UNIT_TEST.assert(true);
    }

    uexTabBarWithPopMenuCase.setItemChecked = function() {
        var params = {
            index: 1
        };
        var data = JSON.stringify(params);
        uexTabBarWithPopMenu.setItemChecked(data);
        UNIT_TEST.assert(true);
    }
    uexTabBarWithPopMenuCase.setBadge = function() {
        var param1 = {
            indexes: [0, 1]
        };
        var data1 = JSON.stringify(param1);
        uexTabBarWithPopMenu.setBadge(data1);
        UNIT_TEST.assert(true);
    }
    uexTabBarWithPopMenuCase.removeBadge = function() {
        UNIT_TEST.log("3秒后将移除badge......");
        var param1 = {
            indexes: [0, 1]
        };
        var data1 = JSON.stringify(param1);
        setTimeout(function() {
            uexTabBarWithPopMenu.removeBadge(data1);
            UNIT_TEST.assert(true);

        },
        3000);
    }
    uexTabBarWithPopMenuCase.onTabItemClick = function() {
        UNIT_TEST.log("请点击某个tab项......");
        uexTabBarWithPopMenu.onTabItemClick = function(data) {
            UNIT_TEST.log("[data]" + JSON.stringify(data));
            UNIT_TEST.assert(true);
        }
    }
    uexTabBarWithPopMenuCase.onPopMenuItemClick = function() {
        UNIT_TEST.log("请点击某个菜单项......");
        uexTabBarWithPopMenu.onPopMenuItemClick = function(data) {
            UNIT_TEST.log("[data]" + JSON.stringify(data));
            UNIT_TEST.assert(true);
        }
    }
    uexTabBarWithPopMenuCase.close = function() {
        uexTabBarWithPopMenu.close();
        UNIT_TEST.assert(true);
    }
    UNIT_TEST.addCase("uexTabBarWithPopMenu", uexTabBarWithPopMenuCase);
}
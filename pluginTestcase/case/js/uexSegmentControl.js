/**
 * Created by ylt on 16/8/29.
 */

if (UNIT_TEST) {
    var uexSegmentControlCase = {
        "open":function(){
            openView()
            UNIT_TEST.assert(true);
            setTimeout(function () {
                uexSegmentControl.close();
            },1000);

        },
        "close":function () {
            openView();
            setTimeout(function () {
                uexSegmentControl.close();
                UNIT_TEST.assert(true);
            },1000);
        },
        "setCurrentItem":function () {
            openView();
            var param = {
                index:4
            };
            uexSegmentControl.setCurrentItem(param);
            UNIT_TEST.log("当前选中第五个");
            UNIT_TEST.assert(true);
            setTimeout(function () {
                uexSegmentControl.close();
            },2000)
        }

    };

    function openView() {
        var width = window.screen.width;
        var height = window.screen.height - 300;
        var param1 = {
            left:0,
            top:200,
            width:width,
            height:height,
            dataInfo:{
                allData:["头条", "娱乐", "体育", "北京", "财经", "科技", "段子", "图片", "汽车", "时尚",
                    "轻松一刻", "军事", "历史", "房产", "游戏", "彩票", "原创", "电台", "论坛", "博客",
                    "社会", "电影", "NBA", "中国足球", "国际足球", "CBA", "跑步", "手机",
                    "数码", "移动互联", "家居", "旅游", "健康", "读书", "酒香", "教育", "亲子", "葡萄酒",
                    "暴雪游戏", "情感", "政务"],
                showData:["头条", "娱乐", "体育", "北京", "NBA","科技", "段子", "旅游", "汽车", "时尚"],
                maxShow:25,
                isExpand:1,
                expandOpenIcon:'res://openIcon.png',
                expandCloseIcon:'res://closeIcon.png',
                showedLable:'我的频道',
                addLable:'点击添加'
            }
        };
        uexSegmentControl.open(param1);
    }

    UNIT_TEST.addCase("uexSegmentControl", uexSegmentControlCase);
}
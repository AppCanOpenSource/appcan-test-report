var btn = 0;
if (UNIT_TEST) {
    var uexSlidePagerCase = {
        "openSlidePager":function(){
                var topMargin = screen.height/2;
                var contentArray = [
                    "res://slidepager/pages/page1.html",
                    "res://slidepager/pages/page2.html",
                    "res://slidepager/pages/page3.html",
                    "res://slidepager/pages/page4.html",
                    "res://slidepager/pages/page5.html",
                    "res://slidepager/pages/page6.html",
                    "res://slidepager/pages/page7.html"
                ];
                var iconArray = [
                    "res://slidepager/img/icon0.png",
                    "res://slidepager/img/icon1.png",
                    "res://slidepager/img/icon2.png",
                    "res://slidepager/img/icon3.png",
                    "res://slidepager/img/icon5.png",
                    "res://slidepager/img/icon7.png",
                    "res://slidepager/img/icon9.png"
                ];
                var colorArray = [
                    "#004aa5",
                    "#c8c8c8",
                    "#007473",
                    "#0c4d90",
                    "#329cc3",
                    "#7098d4",
                    "#0484cd"
                ];
                var option = {
                    isShowIcon:true,
                    isShowContent:true
                };
                uexSlidePager.openSlidePager(topMargin, contentArray, iconArray, colorArray, JSON.stringify(option));
                UNIT_TEST.assert(true);
        },
        "onPageClick":function(){
            UNIT_TEST.log("请点击内容页，触发onPageClick回调事件！");
            uexSlidePager.onPageClick = function(index){
                UNIT_TEST.log("onPageClick:" + index);
                UNIT_TEST.assert(true);
            };
        },
        "onIconSelected":function(){
            UNIT_TEST.log("请点击底部图标，触发onIconSelected回调事件！");
            uexSlidePager.onIconSelected = function(index){
                UNIT_TEST.log("onIconSelected:" + index);
                UNIT_TEST.assert(true);
            };
        },
        "setCurrentPage":function(){
            uexSlidePager.setCurrentPage(0);
            uexSlidePager.onChangeColor = function(color){
                UNIT_TEST.log("onChangeColor:" + color);
                UNIT_TEST.assert(true);
            };
        },
        "closeSlidePager":function(){
            uexSlidePager.closeSlidePager();
            UNIT_TEST.assert(true);
        }
    };
    UNIT_TEST.addCase("slidePager", uexSlidePagerCase);
}
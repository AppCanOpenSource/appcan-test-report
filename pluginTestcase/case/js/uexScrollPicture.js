if (UNIT_TEST) {
    var viewObj;
    var uexScrollPictureCase = {
        "createNewScrollPicture":function(){
            var param={
            interval:2000,
            anchor:["0", "0"],
            width:screen.width,
            height:screen.height-300,
            urls:["res://photo1.jpg","res://photo2.jpg","res://photo3.jpg","res://photo4.jpg"]
            };
            viewObj = uexScrollPicture.createNewScrollPicture(JSON.stringify(param));
            if(!viewObj){
                UNIT_TEST.log("创建轮播图失败");
                UNIT_TEST.assert(false);
            }else{
                UNIT_TEST.assert(true);
            }
            
        },
        "startAutoScroll":function(){
            var param={
               view:viewObj
            };
            uexScrollPicture.startAutoScroll(JSON.stringify(param));
            UNIT_TEST.assert(true);
            
        },
        "onPicItemClick":function(){
            UNIT_TEST.log("请点击索引，触发onIndexClick回调事件！");
            uexScrollPicture.onPicItemClick = function(data){
                UNIT_TEST.log("onPicItemClick:" + data);
                UNIT_TEST.assert(true);
            };
        },
        "stopAutoScroll":function(){
            var param={
                view:viewObj
            };
            uexScrollPicture.stopAutoScroll(JSON.stringify(param));
            UNIT_TEST.assert(true);
            
        },

        "removeView":function(){
            var param={
               view:viewObj
            };
            uexScrollPicture.removeView(JSON.stringify(param));
            UNIT_TEST.assert(true);

        }
    };
    UNIT_TEST.addCase("scrollPicture", uexScrollPictureCase);
}
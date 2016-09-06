define(["CC"], function(CC) {
       if (!UNIT_TEST) {
       return;
       }
       var coverFlow;
       var uexCoverFlow2Case = {};
       uexCoverFlow2Case.create = function() {
       var params = {
       "x": 20,
       "y": 150,
       "width":screen.availWidth/2,
       "height":200 ,
       "isScrollWithWeb":true,
       "placeholderImage":"res://uexCoverFlow2_tupian.png",
       "imageUrl":["http://img3.duitang.com/uploads/item/201411/08/20141108002929_dV5Ba.thumb.700_0.jpeg","http://82238.com/uploads/allimg/110519/2-110519130404.jpg","http://www.qqhead.com/UploadFiles/2010-04/2010458740103062.gif","http://a4.att.hudong.com/06/63/01300001216886130487639263274.jpg"]
       };
      coverFlow =uexCoverFlow2.create(JSON.stringify(params));
       
       CC.confirm("检测UI是否正确", function(ret) {
                  UNIT_TEST.assert(ret);
                  });
       }
       uexCoverFlow2Case.onItemSelected = function() {
       UNIT_TEST.log("请点击某一项......");
       uexCoverFlow2.onItemSelected = function(coverFlow,index) {
       CC.confirm("请确认你点击的是否是第" + (index + 1) + "项", function(ret) {
                  
                  UNIT_TEST.assert(ret);
                  });
       }
       }
       uexCoverFlow2Case.close = function(){
          uexCoverFlow2.close(coverFlow);
          UNIT_TEST.assert(true);
       }
       UNIT_TEST.addCase("uexCoverFlow2", uexCoverFlow2Case);
       });
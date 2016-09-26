define(["CC"],function(CC){
  if (!UNIT_TEST) return;

  var TEST_CASE = {};
  var listViewId = "1";
  TEST_CASE.initLayout = function(){
      var params = {
        listViewId:listViewId,
        layout:{
            center:["res://case1/layout_item2.xml"]
        }
      };
      uexNBListView.initLayout(JSON.stringify(params), function(error){
          UNIT_TEST.log("initLayout:" + error);
          UNIT_TEST.assert(error == 0 ? true : false);
      });
  };

  TEST_CASE.setItems = function(){
      var params = {
        listViewId:listViewId,
        dataList:[
            {
                center:{
                    "type":2,
                    "backgroundColor":"#dddddd",
                    "title":"平凡的世界"
                }
            },
            {
                center:{
                    "type":2,
                    "backgroundColor":"#ffffff",
                    "title":"三国演义"
                }
            }
        ]
      };
      uexNBListView.setItems(JSON.stringify(params), function(error){
          UNIT_TEST.log("setItems:" + error);
          UNIT_TEST.assert(error == 0 ? true : false);
      });
  };

  TEST_CASE.open = function(){
      var wid = window.screen.width;
      var hei = window.screen.height - 300;
      var params = {
          listViewId:listViewId,
          left: 0,
          top: (uexWindow.getHeight() * 0.2) | 0,
          width: uexWindow.getWidth(),
          height: (uexWindow.getHeight() * 0.3) | 0,
          openType: 1,
          swipeMode: 3,
          refreshMode: 3
      };
      uexNBListView.open(JSON.stringify(params), function(error){
          UNIT_TEST.log("open:" + error);
          UNIT_TEST.assert(error == 0 ? true : false);
      });
  };

  TEST_CASE.insert = function(){
      var params = {
        listViewId:listViewId,
        index:0,
        dataList:[
            {
                center:{
                    "type":2,
                    "backgroundColor":"#0000ff",
                    "title":"我是插入数据1"
                }
            },
            {
                center:{
                    "type":2,
                    "backgroundColor":"#0000ff",
                    "title":"我是插入数据2"
                }
            }
        ]
      };
      uexNBListView.insert(JSON.stringify(params), function(error){
          UNIT_TEST.log("insert:" + error);
          setTimeout(function(){
              UNIT_TEST.assert(error == 0 ? true : false);
          },2000);
      });
  };

  TEST_CASE.update = function(){
      var params = {
        listViewId:listViewId,
        index:0,
        data:{
            center:{
                "backgroundColor":"#ffffff",
                "title":"更新完成，背景变白色"
            }
        }
      };
      uexNBListView.update(JSON.stringify(params), function(error){
          UNIT_TEST.log("update:" + error);
          setTimeout(function(){
              UNIT_TEST.assert(error == 0 ? true : false);
          },2000);
      });
  };

  TEST_CASE.delete = function(){
      var params = {
        listViewId:listViewId,
        indexes:[1]
      };
      uexNBListView.delete(JSON.stringify(params), function(error){
          UNIT_TEST.log("delete:" + error);
          setTimeout(function(){
              UNIT_TEST.assert(error == 0 ? true : false);
          },2000);
      });
  };
  TEST_CASE.hide = function(){
      var params = {
        listViewId:listViewId
      };
      uexNBListView.hide(JSON.stringify(params));
      CC.confirm("请确认listView已经被隐藏.",function(ret){
          UNIT_TEST.assert(ret);
      });
  };
  TEST_CASE.show = function(){
      var params = {
        listViewId:listViewId
      };
      uexNBListView.show(JSON.stringify(params));
      CC.confirm("请确认listView已经显示.",function(ret){
          UNIT_TEST.assert(ret);
      });
  };
  TEST_CASE.setRefreshStatusCompleted = function(){
      UNIT_TEST.log("请下拉列表，下拉事件触发后1秒后设置刷新完成状态。");
      uexNBListView.onPullRefreshHeader = function(data){
          var info = JSON.parse(data);
          if(info.status == 0){
              setTimeout(function(){
                  var params = {
                    listViewId:listViewId
                  };
                  uexNBListView.setRefreshStatusCompleted(JSON.stringify(params));
                  CC.confirm("请确认目前是刷新完成状态.",function(ret){
                      UNIT_TEST.assert(ret);
                  });
              },1000);
          }
      }
  };
  TEST_CASE.close = function(){
      var params = [listViewId];
      uexNBListView.close(JSON.stringify(params));
      CC.confirm("请确认listview已关闭.",function(ret){
           UNIT_TEST.assert(ret);
      });
  };

  UNIT_TEST.addCase("uexNBListView", TEST_CASE);
});

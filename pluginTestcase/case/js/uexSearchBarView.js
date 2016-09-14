/**
 * @author lkl
 */
define(["CC"],function(CC){
  if (!UNIT_TEST) return;

  var TEST_CASE = {};
  
  TEST_CASE.open = function(){
    var wid = window.screen.width;
    var hei = window.screen.height - 300;
    var param = {
      x: 0,
      y: (uexWindow.getHeight() * 0.2) | 0,
      w: uexWindow.getWidth(),
      h: (uexWindow.getHeight() * 0.7) | 0,
      searchBar: {
        placehoderText:"搜索词",
        textColor:"#ff0000",
        inputBgColor:"#ffffff"
      },
      listView: {
        bgColor:"#ffffff",
        separatorLineColor:"#ff0000",
        itemTextColor:"#ff00ff"
      }
    };
    uexSearchBarView.open(param);
    CC.confirm("请确认searchBarView被正确打开.",function(ret){
      UNIT_TEST.assert(ret);
    });
  };
  TEST_CASE.onSearch = function(){
    uexSearchBarView.onSearch = function(info){
      uexSearchBarView.onSearch = null;
      var keyword = JSON.parse(info).keyword;
      if (!keyword) {
        CC.log("uexSearchBarView.onSearch回调结果解析失败!");
        UNIT_TEST.assert(false);
      };
      CC.confirm("请确认您输入的内容为\n" + keyword,function(ret){
        UNIT_TEST.assert(ret);
      });
    };
    CC.alert("请输入任意字符串进行搜索.");
  };
  TEST_CASE.onItemClick = function(){
    uexSearchBarView.onItemClick = function(info){
      uexSearchBarView.onItemClick = null;
      var data = JSON.parse(info);
      var index = data.index;
      var keyword = data.keyword;
      if (!keyword || (!index && index !== 0)) {
        CC.log("uexSearchBarView.onItemClick回调结果解析失败!");
        UNIT_TEST.assert(false);
      };
      CC.confirm("请确认\n您选择的内容所在的行数(从0开始计数)为: " + index + "\n您所选择的内容为: " + keyword,function(ret){
        UNIT_TEST.assert(ret);
      });
    };
    CC.alert("请继续进行若干次搜索操作,然后点击任一个搜索历史记录.");
  };
  TEST_CASE.clearHistory = function(){
    CC.alert("即将清除搜索历史记录.",function(){
      uexSearchBarView.clearHistory();
      CC.confirm("请确认搜索历史记录已被正确清除",function(ret){
        UNIT_TEST.assert(ret);
      });
    });
  };
  TEST_CASE.close = function(){
    uexSearchBarView.close();
    CC.confirm("请确认searchBarView已被正确关闭.",function(ret){
      UNIT_TEST.assert(ret);
    });
  };


  UNIT_TEST.addCase("uexSearchBarView", TEST_CASE);
});

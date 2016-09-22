/**
 * @author lkl
 */
define(["CC"],function(CC){
  if (!UNIT_TEST) return;

  var TEST_CASE = {};
  
  TEST_CASE.setItems = function(){
    var params = {
        "listItems": [
            {
                "image": "http://f7.topit.me/7/c1/0f/119943606879e0fc17l.jpg",
                "placeholderImg": "res://1Normal.png",
                "title": "标题",
                "subtitle": "子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 25,
                "titleColor": "#006000",
                "subtitleSize": 20,
                "subtitleColor": "#000000",
                "selectedBackgroundColor": "#006000",
                "backgroundColor": "#FFFFFF",
                "useCustomLayout": "1",
                "height": 200
            },
            {
                "image": "http://img5.duitang.com/uploads/item/201407/17/20140717215718_KGaJ3.jpeg",
                "placeholderImg": "res://1Normal.png",
                "title": "标题",
                "subtitle": "子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 25,
                "titleColor": "#006000",
                "subtitleSize": 20,
                "subtitleColor": "#000000",
                "selectedBackgroundColor": "#006000",
                "backgroundColor": "#FFFFFF",
                "height": 200
            },
            {
                "image": "http://img5.duitang.com/uploads/item/201405/23/20140523214438_aUXPJ.thumb.700_0.jpeg",
                "placeholderImg": "res://1Normal.png",
                "title": "标题",
                "subtitle": "子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 25,
                "titleColor": "#006000",
                "subtitleSize": 20,
                "subtitleColor": "#000000",
                "selectedBackgroundColor": "#006000",
                "backgroundColor": "#FFFFFF",
                "height": 200
            }
        ],
        "rightSwipeOptionItem": {
            "backgroundColor": "#ffffff",
            "optionBtn": [
                {
                    "btnIndex": "1",
                    "text": "分享",
                    "textColor": "#ffffff",
                    "textSize": 20,
                    "bgColor": "#6F00D2"
                },
                {
                    "btnIndex": "2",
                    "text": "删除",
                    "textColor": "#ffffff",
                    "textSize": 20,
                    "bgColor": "#6F00D2"
                }
            ]
        },
        "leftSwipeOptionItem": {
            "backgroundColor": "#ffffff",
            "optionBtn": [
                {
                    "btnIndex": "1",
                    "text": "分享",
                    "textColor": "#ffffff",
                    "textSize": 20,
                    "bgColor": "#6F00D2"
                },
                {
                    "btnIndex": "2",
                    "text": "删除",
                    "textColor": "#ffffff",
                    "textSize": 20,
                    "bgColor": "#6F00D2"
                }
            ]
        }
    };
    uexListView.setItems(JSON.stringify(params));
    UNIT_TEST.assert(true);
  };

  TEST_CASE.setItemSwipeType = function(){
      uexListView.setItemSwipeType(2);
      CC.log("设置左右都可以滑动");
      UNIT_TEST.assert(true);
  };

  TEST_CASE.setPullRefreshHeader = function(){
        var params ={
           PullRefreshHeaderStyle:{
                "arrowImage":"res://1Normal.png",
                "backGroundColor":"#e2e7ed",
                "textColor":"#576c89",
                "textFontSize":20,
                "pullRefreshNormalText":"下拉可以刷新",
                "pullRefreshPullingText":"松开即可刷新",
                "pullRefreshLoadingText":"加载中...",
                "isShowUpdateDate":1
            }
        };
        uexListView.setPullRefreshHeader(JSON.stringify(params));
        UNIT_TEST.assert(true);
  };

  TEST_CASE.setPullRefreshFooter = function(){
      var params ={
          PullRefreshFooterStyle:{
              "arrowImage":"res://1Normal.png",
              "backGroundColor":"#e2e7ed",
              "textColor":"#576c89",
              "textFontSize":13,
              "pullRefreshNormalText":"上拉加载更多",
              "pullRefreshPullingText":"松开即可加载更多",
              "pullRefreshLoadingText":"加载中...",
              "isShowUpdateDate":1
          }
      };
      uexListView.setPullRefreshFooter(JSON.stringify(params));
      UNIT_TEST.assert(true);
  };

  TEST_CASE.open = function(){
    var wid = window.screen.width;
    var hei = window.screen.height - 300;
    var param = {
      x: 0,
      y: (uexWindow.getHeight() * 0.2) | 0,
      w: uexWindow.getWidth(),
      h: (uexWindow.getHeight() * 0.3) | 0,
    };
    uexListView.open(param);
    CC.confirm("请确认listView被正确打开.",function(ret){
      UNIT_TEST.assert(ret);
    });
  };

  TEST_CASE.insertItemAt = function(){
    var params ={
        "itemIndex":0,
        "listItem":{
            "image": "res://icon.png",
            "placeholderImg":"res://1Normal.png",
            "title": "我是插入项",
            "subtitle": "子标题",
            "rightBtnImg": "res://ac_title_btn_hov.png",
            "titleSize": 30,
            "titleColor":"#006000",
            "subtitleSize": 10,
            "subtitleColor":"#000000",
            "selectedBackgroundColor":"#006000",
            "backgroundColor":"#FFFFFF",
            "height":200
        }
    };
    uexListView.insertItemAt(JSON.stringify(params));
    CC.confirm("请确认插入第一条数据成功.",function(ret){
      UNIT_TEST.assert(ret);
    });
  };

  TEST_CASE.deleteItemsAt = function(){
      var params = {
          itemIndex:[0,1]
      };
      uexListView.deleteItemsAt(JSON.stringify(params));
      CC.confirm("请确认前两条已被删除.",function(ret){
          UNIT_TEST.assert(ret);
      });
  };

  TEST_CASE.appendItems = function(){
    var params = {
        "listItems":[
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "append1",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            },
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "append2",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            }
        ]
    };
    uexListView.appendItems(JSON.stringify(params));
    CC.confirm("请确认已加载两条数据至列表末尾",function(ret){
          UNIT_TEST.assert(ret);
    });
  };

  TEST_CASE.reloadItems = function(){
    var params = {
        "listItems":[
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "reload1",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            },
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "reload2",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            },
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "reload1",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            },
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "reload2",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            },
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "reload1",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            },
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "reload2",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            },
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "reload1",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            },
            {
                "image": "res://icon.png",
                "placeholderImg":"res://1Normal.png",
                "title": "reload2",
                "subtitle":"子标题",
                "rightBtnImg": "res://ac_title_btn_hov.png",
                "titleSize": 20,
                "titleColor":"#006000",
                "subtitleSize": 10,
                "subtitleColor":"#000000",
                "selectedBackgroundColor":"#006000",
                "backgroundColor":"#FFFFFF",
                "height":200
            }
        ]
    };
    uexListView.reloadItems(JSON.stringify(params));
    CC.confirm("请确认列表数据已被刷新",function(ret){
          UNIT_TEST.assert(ret);
    });
  };

  TEST_CASE.onItemClick = function(){
      UNIT_TEST.log("请点击列表项");
      uexListView.onItemClick = function(index){
        CC.confirm("请确认被点击的项的索引为" + index,function(ret){
              UNIT_TEST.assert(ret);
        });
      };
  };

  TEST_CASE.onLeftOptionButtonInItem = function(){
      UNIT_TEST.log("请向右滑动列表项，并点击左边的按钮");
      uexListView.onLeftOptionButtonInItem = function(itemIndex,optionBtnIndex){
        UNIT_TEST.log("onLeftOptionButtonInItem：列表索引:" + itemIndex + ",按钮索引:" + optionBtnIndex);
        UNIT_TEST.assert(true);
      }
  };

  TEST_CASE.onRightOptionButtonInItem = function(){
      UNIT_TEST.log("请向左滑动列表项，并点击左右边的按钮");
      uexListView.onRightOptionButtonInItem = function(itemIndex,optionBtnIndex){
        UNIT_TEST.log("onRightOptionButtonInItem：列表索引:" + itemIndex + ",按钮索引:" + optionBtnIndex);
        UNIT_TEST.assert(true);
      }
  };

  TEST_CASE.ontPullRefreshHeaderListener = function(){
      UNIT_TEST.log("向下拉动列表，触发下拉刷新的监听方法");
      uexListView.ontPullRefreshHeaderListener = function(status){
        if(status == 2){
            UNIT_TEST.assert(true);
        }
      }
  };

  TEST_CASE.ontPullRefreshFooterListener = function(){
      UNIT_TEST.log("向上拉动列表，触发上拉加载的监听方法");
      uexListView.ontPullRefreshFooterListener = function(status){
        if(status == 2){
            UNIT_TEST.assert(true);
        }
      }
  };

  TEST_CASE.close = function(){
    uexListView.close();
    CC.confirm("请确认listView已被正确关闭.",function(ret){
      UNIT_TEST.assert(ret);
    });
  };

  UNIT_TEST.addCase("uexListView", TEST_CASE);
});

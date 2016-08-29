define(["CC","Rx"],function(CC,Rx){

  if (!UNIT_TEST){return;};
  
  const EMPTY_FUNC = function(){};
  const ERROR_HANDLER = function(err){
    CC.log("ERROR: " + err);
    uexGaodeNavi.stopNavi();
    UNIT_TEST.assert(false);
  };
  const SUCCESS_HANDLER = function(){UNIT_TEST.assert(true);};

  var TEST_CASE = {};

  var alertSignal = function(msg){
    return Rx.Observable.create(function (observer) {
      CC.alert(msg,function(){observer.onCompleted();});
    });
  };
  var walkRouteSignal = function(){
    return Rx.Observable.create(function (observer) {
      var params = {
        startPoint:[39.925846, 116.432765],
        endPoint:[39.925041, 116.437901]
      };
      uexGaodeNavi.calculateWalkRoute(JSON.stringify(params),function(info){
        if (info && info.result) {
          observer.onCompleted();
        }else{
          observer.onError(new Error("步行路径规划失败!"));
        }
      });
    });
  };
  var driveRouteSignal = function(){
    return Rx.Observable.create(function (observer){
      var params = {
        startPoint:[39.925846, 116.432765],
        endPoint:[39.925041, 116.437901]
      };
      uexGaodeNavi.calculateDriveRoute(JSON.stringify(params),function(info){
        if (info && info.result) {
          observer.onCompleted();
        }else{
          observer.onError(new Error("驾车路径规划失败!"));
        }
      });
    })
  };
  var startNaviSignal = function(){
    return Rx.Observable
      .create(function (observer) {
        var params = {type: 1};
        uexGaodeNavi.onStartNavi = function(){
          observer.onCompleted();
        }
        uexGaodeNavi.startNavi(JSON.stringify(params));
      })
      .timeout(5000,new Error("操作超时!"))
      .finally(function(){
        uexGaodeNavi.onStartNavi = null;
      });
  };
  var observeNaviSignal = function(){
    return Rx.Observable
      .create(function(observer){
        var parseNaviText = function (info){
          var data = JSON.parse(info);
          switch(data.type){
            case 1:
              return "导航播报 ~> " + data.text;
            case 2:
              return "前方路况 ~> " + data.text;
            case 4:
              return "周边路况 ~> " + data.text;
            case 8:
              return "通过提示 ~> " + data.text;
            default:
              break;
          }
          return "导航信息解析错误!";
        }
        uexGaodeNavi.onGetNavigationText = function(info){
          CC.log(parseNaviText(info));
        };
        uexGaodeNavi.onReCalculateRouteForYaw = function(){
          CC.log("出现偏航,重新计算路径...");
        };
        uexGaodeNavi.onArriveDestination = function(){
          CC.log("到达目的地!");
        };
        uexGaodeNavi.onNaviCancel = function(){
          CC.log("用户关闭了导航界面!");
          observer.onCompleted();
        }
      })
      .delay(1500)//等待导航界面关闭
      .finally(function(){
        uexGaodeNavi.onGetNavigationText = null;
        uexGaodeNavi.onReCalculateRouteForYaw = null;
        uexGaodeNavi.onArriveDestination = null;
        uexGaodeNavi.onNaviCancel = null;
      });
  };


  TEST_CASE.init = function(){

    uexGaodeNavi.init(null,function (info){
      var ret = info ? info.result : false ;
      CC.log("高德导航初始化结果: " + ret);
      UNIT_TEST.assertTrue(ret);
    });
  };
  TEST_CASE.walkNavi = function(){
    alertSignal("开始测试步行导航.")
      .concat(walkRouteSignal())
      .concat(alertSignal("步行路径规划成功,即将打开导航页面..."))
      .concat(Rx.Observable.defer(startNaviSignal))
      .concat(Rx.Observable.defer(observeNaviSignal))
      .subscribe(
        EMPTY_FUNC,
        ERROR_HANDLER,
        SUCCESS_HANDLER
      );
  };
  TEST_CASE.driveNavi = function(){
    alertSignal("开始测试驾车导航.")
      .concat(driveRouteSignal())
      .concat(alertSignal("驾车路径规划成功,即将打开导航页面..."))
      .concat(Rx.Observable.defer(startNaviSignal))
      .concat(Rx.Observable.defer(observeNaviSignal))
      .subscribe(
        EMPTY_FUNC,
        ERROR_HANDLER,
        SUCCESS_HANDLER
      );
  };
  TEST_CASE.stopNavi = function(){
    alertSignal("开始测试stopNavi接口.")
      .concat(walkRouteSignal())
      .concat(alertSignal("打开导航页面后3秒将调用接口关闭导航页面."))
      .concat(Rx.Observable.defer(startNaviSignal))
      .delay(3000)
      .subscribe(
        EMPTY_FUNC,
        function(err){
          CC.log("ERROR: " + err);
          UNIT_TEST.assert(false);
        },
        function(){
          uexGaodeNavi.stopNavi();
          CC.confirm("导航页面被正确关闭了吗?",function(ret){
            UNIT_TEST.assert(ret);
          });
        }
      );
  };


  UNIT_TEST.addCase("uexGaodeNavi", TEST_CASE);


});
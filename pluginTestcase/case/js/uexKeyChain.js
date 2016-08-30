/**
 * @author lkl
 */
define(["CC","Rx"],function(CC,Rx){
  if (!UNIT_TEST) return;
  var TEST_CASE = {};
  const SHOULD_FAIL = true;
  const SERVICE = "AppCan"
  const KEY = "password"


  var setSignal = function(param,shouldFail){
    return Rx.Observable.create(function (observer){
      uexKeyChain.setItem(param,function(err,data){
        if (err && !shouldFail) {
          observer.onError(new Error("set item failed! param: " + JSON.stringify(param)) + ",errorInfo: " + data.errorInfo);
        }else if (!err && shouldFail){
          observer.onError(new Error("set item should fail but succeeded! param: " + JSON.stringify(param)));
        }else{
          observer.onNext(data.value);
          observer.onCompleted();
        }
      });
    });
  };
  var getSignal = function(param,shouldFail){
    return Rx.Observable.create(function (observer){
      uexKeyChain.getItem(param,function(err,data){
        if (err && !shouldFail) {
          observer.onError(new Error("get item failed! param: " + JSON.stringify(param)) + ",errorInfo: " + data.errorInfo);
        }else if (!err && shouldFail){
          observer.onError(new Error("get item should fail but succeeded! param: " + JSON.stringify(param)));
        }else{
          observer.onNext(data.value);
          observer.onCompleted();
        }
      });
    });
  };
  var removeSignal = function(param,shouldFail){
    return Rx.Observable.create(function (observer){
      uexKeyChain.removeItem(param,function(err,data){
        if (err && !shouldFail) {
          observer.onError(new Error("remove item failed! param: " + JSON.stringify(param)) + ",errorInfo: " + data.errorInfo);
        }else if (!err && shouldFail){
          observer.onError(new Error("remove item should fail but succeeded! param: " + JSON.stringify(param)));
        }else{
          observer.onNext(null);
          observer.onCompleted();
        }
      });
    });
  };
  
  TEST_CASE.setTest = function(){
    var counter = 0;
    setSignal(null,SHOULD_FAIL)
      .concat(setSignal({
        service: SERVICE
      },SHOULD_FAIL))
      .concat(setSignal({
        service: SERVICE,
        key: KEY
      },SHOULD_FAIL))
      .concat(setSignal({
        service: SERVICE,
        key: KEY,
        value: "123456"
      }))
      .subscribe(
        function(){CC.log("set test #" + ++counter + " passed!");},
        function(e){
          CC.log("ERROR ~> " + e);
          UNIT_TEST.assert(false);
        },
        function(){
          UNIT_TEST.assert(true);
        }
    );
  }
  TEST_CASE.getTest = function(){
    var counter = 0;
    var value = null
    getSignal(null,SHOULD_FAIL)
      .concat(getSignal({
        service: SERVICE
      },SHOULD_FAIL))
      .concat(getSignal({
        service: SERVICE,
        key: KEY
      }))
      .subscribe(
        function(v){
          CC.log("set test #" + ++counter + " passed!");
          if (v) value = v;
        },
        function(e){
          CC.log("ERROR ~> " + e);
          UNIT_TEST.assert(false);
        },
        function(){
          UNIT_TEST.assert(value == "123456");
        }
    );
  };
  TEST_CASE.removeTest = function(){
    var counter = 0;
    removeSignal(null,SHOULD_FAIL)
      .concat(removeSignal({
        service: SERVICE
      },SHOULD_FAIL))
      .concat(removeSignal({
        service: SERVICE,
        key: KEY
      }))
      .subscribe(
        function(v){
          CC.log("remove test #" + ++counter + " passed!");
        },
        function(e){
          CC.log("ERROR ~> " + e);
          UNIT_TEST.assert(false);
        },
        function(){
          UNIT_TEST.assert(true);
        }
    );
  };

  TEST_CASE.usageTest = function(){
    var value = "123456";
    var noError = true;
    var counter = 0;
    setSignal({
      key: KEY,
      service: SERVICE,
      value: value
      })
      .concat(getSignal({
        key: KEY,
        service: SERVICE
      }))
      .doOnNext(function(v){
        CC.log("验证数据 #" + ++counter);
        noError = noError && (v === value);
      })
      .concat(removeSignal({
        key: KEY,
        service: SERVICE
      }))
      .subscribe(
        function(){},
        function(e){
          CC.log("ERROR ~> " + e);
          UNIT_TEST.assert(false);
        },
        function(){
          if (!noError) {
            CC.log("数据不一致!");
          };
          UNIT_TEST.assert(noError);
        }
    );
  }
  TEST_CASE.usageTestWithTouchID = function(){
    var value = "123456";
    var noError = true;
    var counter = 0;
    setSignal({
      key: KEY,
      service: SERVICE,
      value: value,
      TouchIDProtected: true
      })
      .concat(getSignal({
        key: KEY,
        service: SERVICE,
        TouchIDPrompt:"您需要通过验证指纹以获得AppCan数据"
      }))
      .doOnNext(function(v){
        CC.log("验证数据 #" + ++counter);
        noError = noError && (v === value);
      })
      .concat(removeSignal({
        key: KEY,
        service: SERVICE
      }))
      .subscribe(
        function(){},
        function(e){
          CC.log("ERROR ~> " + e);
          UNIT_TEST.assert(false);
        },
        function(){
          if (noError) {
            CC.confirm("TouchID被正确使用了吗?",function(ret){
              UNIT_TEST.assert(ret);
            });
          }else{
            CC.log("数据不一致!");
            UNIT_TEST.assert(false);
          }
        }
    );
  }

  TEST_CASE.uidTest = function(){
    var uid1 = uexKeyChain.getDeviceUniqueIdentifier();
    var uid2 = uexKeyChain.getDeviceUniqueIdentifier();
    CC.log("getDeviceUniqueIdentifier: " + uid1);
    UNIT_TEST.assert(typeof uid1 === "string" && uid1.length == 32 && uid1 === uid2);
  }


  UNIT_TEST.addCase("uexKeyChain", TEST_CASE);
});
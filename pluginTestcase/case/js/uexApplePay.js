/**
 * @author lkl
 */
define(["CC","Rx"],function(CC,Rx){
  if (!UNIT_TEST) return;

  const EMPTY_FUNC = function(){};
  const ERROR_HANDLER = function(err){
    CC.log("ERROR: " + err);
    UNIT_TEST.assert(false);
  };
  const SUCCESS_HANDLER = function(){UNIT_TEST.assert(true);};
  const MERCHANT_ID = "merchant.com.zywx.devTest";

  var TEST_CASE = {};



  var Item = function(label,price){
    this.label = label;
    this.price = price;
  }
  var ShippingMethod = function(label,identifier,detail,price){
    this.label = label;
    this.identifier = identifier;
    this.detail = detail;
    this.price = price;
  }
  var Payment = function(merchantID){
    this.merchantIdentifier = merchantID;
    this.shippingMethods = [];
    this.items = [];
    this.useCreditCard = false;
    this.shippingCost = -1;
    this.payee = null;
    this.applicationData = null;
    this.creditDiscount = -5;
  };
  Payment.prototype.getPaymentData = function(){
    var list = this.items.concat();
    if (this.useCreditCard) {
      list.push(new Item("信用卡折扣",this.creditDiscount));
    };
    if (this.shippingCost >= 0) {
      list.push(new Item("运费",this.shippingCost));
    };
    return {
      items: list,
      payee: this.payee
    };
  }
  Payment.prototype.getPayInfo = function() {
    var payInfo = {
      merchantIdentifier: this.merchantIdentifier,
      payment: this.getPaymentData(),
      shippingType: 0,
      applicationData: this.applicationData,
      billingContactRequiredFlag: 15,
      shippingContactRequiredFlag: 15
    };
    if (this.shippingMethods.length > 0) {
      payInfo.shippingMethods = this.shippingMethods.concat();
    };
    return payInfo;
  };


  var alertSignal = function(msg){
    return Rx.Observable.create(function (observer){
      CC.alert(msg,function(){
        observer.onCompleted();
      });
    });
  };

  var canMakePaySignal = function(input){
    return Rx.Observable.create(function (observer){
      var networks = Array.isArray(input) ? input : null;
      var param = {
        networks: networks
      };
      switch(uexApplePay.canMakePayment(JSON.stringify(param))){
        case 0:{
          CC.log("可以进行支付(networks: " + networks + ").");
          observer.onCompleted();
          break;
        }
        case 1:{
          observer.onError(new Error("当前系统不支持ApplePay!"));
          break;
        }
        case 2:{
          observer.onError(new Error("当前设备不支持ApplePay!"));
          break;
        }
        case 3:{
          observer.onError(new Error("当前AppleID不支持ApplePay!"));
          break;
        }
        default:{
          observer.onError(new Error("canMakePayment 返回值不合法!"));
          break;
        }
      }
    });
  };


  TEST_CASE.buttonTest = function(){
    var buttonIDs = [];

    var createButtonSignal = function(){
      var types = [0,1,2];// all types
      var styles = [0,1,2];// all styles
      var buttonCounts = types.length * styles.length;
      var buttonDataSignal = Rx.Observable.range(0,buttonCounts).map(function (idx){
        var type = idx % types.length;
        var style = (idx - type) / types.length;
        var colume = idx % 2;
        var row = (idx - colume) / 2;
        var id = "#" + idx
        return {
          x: colume * 200 + 20,
          y: row * 70 + 200,
          width: 180,
          height: 60,
          id: id,
          scrollWithWeb: (style == 0),
          type: type,
          style: style
        };
      });
      return Rx.Observable.create(function (observer){
        buttonDataSignal.subscribe(
          function(data){
            var ret = uexApplePay.addButton(JSON.stringify(data));
            if (ret !== true) observer.onError(new Error("add Button Error"));
            buttonIDs.push(data.id);
          },
          EMPTY_FUNC,
          function(){
            CC.confirm("是否一共创建了" + buttonCounts + "个ApplePay按钮?",function(ret){
              if (ret) {
                observer.onCompleted();
              }else{
                observer.onError(new Error("add Button Error"));
              };
            });
          }
        );
      });
    };

    var buttonClickTest = function(){
      return Rx.Observable.create(function (observer){
        uexApplePay.onButtonClick = function(info){
          var id = info ? JSON.parse(info).id : null;
          if (!id) {observer.onError(new Error("onButtonClick id invalid!"));};
          CC.log("button clicked: " + id); 
          observer.onNext(id);
        }
      })
      .distinctUntilChanged()
      .take(3)
      .timeout(10000,new Error("timeout Error!"))
      .finally(function(){
        uexApplePay.onButtonClick = null;
      });
    };

    var removeButtonSignal = function(){
      return Rx.Observable.create(function (observer){
        const error = new Error("remove button Error!");
        while(buttonIDs.length > 0){
          var id = buttonIDs.pop();
          var param = {id: id};
          var ret = uexApplePay.removeButton(JSON.stringify(param));
          if (!ret) {
            observer.onError(error);
            break;
          };
        }

        CC.confirm("所有的ApplePay按钮是否都被移除了?",function(ret){
          if (ret) {
            observer.onCompleted();
          }else{
            observer.onError(error);
          };
        });
      });
    };

    createButtonSignal()
      .concat(alertSignal("请在10秒内点击3个不同的按钮,以完成测试."))
      .concat(Rx.Observable.defer(buttonClickTest))
      .concat(alertSignal("即将移除所有ApplePay按钮..."))
      .concat(Rx.Observable.defer(removeButtonSignal))
      .finally(function(){
        while(buttonIDs.length > 0){
          uexApplePay.removeButton(JSON.stringify({id: buttonIDs.pop()}));
        }
      })
      .subscribe(
        EMPTY_FUNC,
        ERROR_HANDLER,
        SUCCESS_HANDLER
      );
  };
  






  TEST_CASE.chinaUnionPayTest = function(){
    var orderInfo = null;

    //实际使用时应从自己的后台取得银联支付流水号
    //这里采用银联提供的获得测试用tn的web接口
    var getTestOrderInfoSignal = function(){
      return Rx.Observable.create(function (observer){
        if (!uexXmlHttpMgr) {
          observer.onError(new Error("该测试依赖插件uexXmlHttpMgr!"));
          return;
        };
        var req = uexXmlHttpMgr.create({
          method: "GET",
          url: "http://101.231.204.84:8091/sim/getacptn",
          timeout: 15000
        });
        if (!req) {
          observer.onError(new Error("create HTTP request failed!"));
          return;
        };
        uexXmlHttpMgr.send(req, 0, function(state,resStr,resCode,resInfo){
          if (state == -1) {
            uexXmlHttpMgr.close(req);
            observer.onError(new Error("request failed! responseInfo: " + JSON.stringify(resInfo)));
            return;
          };
          if (state == 1) {
            uexXmlHttpMgr.close(req);
            orderInfo = resStr;
            CC.log("获取orderInfo: " + orderInfo);
            observer.onCompleted();
          };
        });
      });
    };
    var startChinaUnionPaySignal = function(){
      return Rx.Observable.create(function (observer){
        uexApplePay.onChinaUnionPayFinish = function(info){
          var data = JSON.parse(info);
          switch(data.result){
            case 0:
              CC.log("支付成功!");
              break;
            case 1:
              CC.log("支付失败!" + data.errorInfo);
              break;
            case 2:
              CC.log("支付被取消!");
              break;
            case 3:
              CC.log("支付结果不明,请向服务器确认.");
              break;
            default:
              observer.onError("onChinaUnionPayFinish 回调结果不合法!");
              return;
          }
          observer.onCompleted();
        };
        var data = {
          merchantIdentifier: MERCHANT_ID,
          orderInfo: orderInfo,
          mode: "01"
        };
        var ret = uexApplePay.startChinaUnionPay(JSON.stringify(data));
        switch(ret){
          case 0:
            CC.log("开始支付");
            break;
          case 1:
            observer.onError(new Error("支付参数错误!"));
            break;
          case 2:
            observer.onError(new Error("无法进行支付!"));
            break;
          default:
            observer.onError(new Error("发生未知错误!"));
            break;
        }
      })
      .finally(function(){
        uexApplePay.onChinaUnionPayFinish = null;
      });
    };
    canMakePaySignal(["ChinaUnionPay"])
      .concat(Rx.Observable.defer(getTestOrderInfoSignal))
      .concat(Rx.Observable.defer(startChinaUnionPaySignal))
      .subscribe(
        EMPTY_FUNC,
        ERROR_HANDLER,
        SUCCESS_HANDLER
      );
  };

  TEST_CASE.applePayTest = function(){

    var payment = new Payment(MERCHANT_ID);
    var applicationData = CC.randomString(10);
    CC.log("generate applicationData: " + applicationData);
    payment.payee = "AppCan";
    payment.applicationData = applicationData;
    payment.items.push(new Item("神秘的魔法物品",20));
    payment.items.push(new Item("可疑的电脑配件",30));
    payment.items.push(new Item("一串冰糖葫芦",10));

    var startPaySignal = function(){
      return Rx.Observable.create(function (observer){
        var ret = uexApplePay.startPay(JSON.stringify(payment.getPayInfo()));
        switch(ret){
          case 0:
            CC.log("开始支付");
            observer.onCompleted();
            break;
          case 1:
            observer.onError(new Error("支付参数错误!"));
            break;
          case 2:
            observer.onError(new Error("无法进行支付!"));
            break;
          default:
            observer.onError(new Error("发生未知错误!"));
            break;
        }
      });
    };

    var handleEventSignal = function(){

      //模拟与后端服务器的通信时间,随机延时1000~3000ms
      var randomDelayExec = function(func){
        setTimeout(func, (Math.random() * 2000) | 0 + 1000);
      };
      return Rx.Observable.create(function (observer){
        uexApplePay.onPaymentMethodChange = function(info){
          CC.log("onPaymentMethodChange: " + info);
          var paymentMethod = JSON.parse(info);
          if (paymentMethod.type == 2) {
            CC.log("使用信用卡");
            payment.useCreditCard = true;
          };
          if (paymentMethod.type == 1) {
            CC.log("使用借记卡");
            payment.useCreditCard = false;
          };
          var data = {
            payment: payment.getPaymentData()
          }
          uexApplePay.commitPaymentMethodChange(JSON.stringify(data));
        };
        uexApplePay.onShippingContactChange = function(info){
          CC.log("onShippingContactChange: "+info);
          var contact = JSON.parse(info);
          randomDelayExec(function(){
            var data = {};
            if (contact.addressInfo.ISOCounrtyCode == "CN") {
              CC.log("地址在中国!");
              data.isPostalAddressInvalid = false;
              var shippingMethods = [];
              shippingMethods.push(new ShippingMethod("顺丰","SF","一天内送达",12));//数组的第一个元素是默认选项
              shippingMethods.push(new ShippingMethod("韵达","YD","总是会送到的...",5));
              payment.shippingMethods = shippingMethods.concat();
              payment.shippingCost = 12;
              data.shippingMethods = shippingMethods;
              data.payment = payment.getPaymentData();
            }else{
              CC.log("地址不在中国");
              data.isPostalAddressInvalid = true;
            };
            uexApplePay.commitShippingContactChange(JSON.stringify(data));
          });
        };
        uexApplePay.onShippingMethodChange = function(info){
          CC.log("onShippingMethodChange: " + info);
          var id = JSON.parse(info).identifier;
          var shippingMethods = payment.shippingMethods.concat();
          for(var i = 0; i < shippingMethods.length; i++){
            var aMethod = shippingMethods[i];
            if (aMethod.identifier == id) {
              payment.shippingCost = aMethod.price;
            };
          }
          var data = {
            payment: payment.getPaymentData()
          };
          uexApplePay.commitShippingMethodChange(JSON.stringify(data));
        };
        uexApplePay.onPaymentAuthorized = function(info){
          CC.log("onPaymentAuthorized: " + info);

          randomDelayExec(function(){
            //实际使用时应校验applicationData并解密支付token,向支付服务商发起支付请求,返回支付结果
            //这里直接采用随机数,70%的概率成功!
            var payResult = Math.random() > 0.3;
            CC.log("payResult: " + payResult);
            var data = {
              result: payResult
            }
            uexApplePay.commitAuthorizedResult(JSON.stringify(data));
          });
        };
        uexApplePay.onPayFinish = function(info){
          switch(JSON.parse(info).result){
            case 0:
              CC.log("支付成功");
              break;
            case 1: 
              CC.log("支付失败");
              break;
            case 2:
              CC.log("支付被取消");
              break;
            default:
              observer.onError(new Error("onPayFinish 回调结果无效!"));
              return;
          }
          observer.onCompleted();
        }

      })
      .finally(function(){
        uexApplePay.onShippingContactChange = null;
        uexApplePay.onPaymentMethodChange = null;
        uexApplePay.onShippingMethodChange = null;
        uexApplePay.onPaymentAuthorized = null;
        uexApplePay.onPayFinish = null;
      });
    };
    canMakePaySignal()
      .concat(Rx.Observable.defer(startPaySignal))
      .concat(Rx.Observable.defer(handleEventSignal))
      .subscribe(
        EMPTY_FUNC,
        ERROR_HANDLER,
        SUCCESS_HANDLER
      );

  }

  UNIT_TEST.addCase("uexApplePay", TEST_CASE);

});
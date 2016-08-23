define(["Rx","CC"], function(Rx,CC){
  if (!UNIT_TEST) {
    return;
  };
  //TCP & UDP Echo Server
  const HOST = "192.168.1.4";
  const HOST_TCP_PORT = 40000;
  const HOST_UDP_PORT = 40001;

  const EMPTY_FUNC = function(){};
  const ERROR = new Error();
  const SHOULD_FAIL = true;

  function generateUDPBody(host,port,data,timeout){
    var body = {};
    if(host != null) body.host = host;
    if(port != null) body.port = port;
    if(data != null) body.data = data;
    if(timeout != null) body.timeout = timeout;
    return body;
  }
  

  var SocketCase = {};




  SocketCase.createTCP = function(){
    CC.log("start test 'createTCP' with different arguments.");
    var count = 0,tcps = [];
    function createTCPSignal(params,onStatus,onData){
      return Rx.Observable.create(function (observer) {
        var idx = count++;
        var tcp = uexSocketMgr.createTCP(params,onStatus,onData);
        if (tcp) {
          tcps.push(tcp);
          observer.onNext(idx);
          observer.onCompleted();
        }else{
          CC.log("createTCP ~> failed with params: " + JSON.stringify(params) + ",onStatus: " + onStatus + ",onData: " + onData);
          observer.onError(ERROR);
        }
      });
    }
    
    Rx.Observable
    .merge(
      createTCPSignal(null,null,null),
      createTCPSignal(null,EMPTY_FUNC,null),
      createTCPSignal(null,EMPTY_FUNC,EMPTY_FUNC),
      createTCPSignal({dataType:0},null,null),
      createTCPSignal({dataType:1},EMPTY_FUNC,null),
      createTCPSignal({dataType:2},EMPTY_FUNC,EMPTY_FUNC)
      )
    .finally(function(){
      for(idx in tcps){
        uexSocketMgr.close(tcps[idx]);
      }
    })
    .subscribe(
      function(idx){CC.log("createTCP ~> test #" + idx + " passed.");},
      function(){UNIT_TEST.assert(false);},
      function(){UNIT_TEST.assert(true);}
      );
  };
  

  SocketCase.createUDP = function(){
    CC.log("start test 'createUDP' with different arguments.");
    CC.log("createUDP without 'port' should fail.");
    CC.log("createUDP with port that already in use should fail.");
    var count = 0,udps = [];

    function createUDPSignal(params,onData,shouldFail){
      return Rx.Observable.create(function (observer) {
        var idx = count++;
        var udp = uexSocketMgr.createUDP(params,onData);
        if (udp) {udps.push(udp)};
        if (udp && shouldFail) {
          CC.log("createUDP ~> test #" + idx + " should fail,but succeeded!");
          observer.onError(ERROR);
        }else if (!udp && !shouldFail){
          CC.log("createUDP ~> failed with params: " + JSON.stringify(params) + ",onData: " + onData);
          observer.onError(ERROR);
        }else{
          observer.onNext(idx);
          observer.onCompleted();
        }
      });
    }
    var tmpPort = 7000;
    Rx.Observable
    .merge(
      createUDPSignal(null,null,SHOULD_FAIL),
      createUDPSignal({port: tmpPort},null),
      createUDPSignal({port: tmpPort},null,SHOULD_FAIL),
      createUDPSignal({port: ++tmpPort},EMPTY_FUNC),
      createUDPSignal({port: ++tmpPort,dataType:0},null),
      createUDPSignal({port: ++tmpPort,dataType:1},EMPTY_FUNC),
      createUDPSignal({port: ++tmpPort,dataType:2},EMPTY_FUNC)
      )
    .finally(function(){
      for(idx in udps){
        uexSocketMgr.close(udps[idx]);
      }
    })     
    .subscribe(
      function(idx){CC.log("createUDP ~> test #" + idx + " passed.");},
      function(){UNIT_TEST.assert(false);},
      function(){UNIT_TEST.assert(true);}
      );
  };

  SocketCase.connect = function(){
    CC.log("start test 'connect' with different arguments.");
    CC.log("connect without 'port' or 'host' should fail.");
    CC.log("connect tcp that already connected should fail.");
    CC.log("connect success will invoke TCP onStatus callback.");
    var tcp = null,count = 0;
    function connectSignal(param,shouldFail){
      return Rx.Observable.create(function (observer) {
        var idx = count++;
        uexSocketMgr.connect(tcp,param,function(err){
          if (!err && shouldFail) {
            CC.log("connect ~> test #" + idx + " should fail but succeeded!");
            observer.onError(ERROR);
          }else if(err && !shouldFail){
            CC.log("connect ~> test #" + idx + " failed with param: " + JSON.stringify(param));
            observer.onError(ERROR);
          }else{
            observer.onNext(idx);
            observer.onCompleted();
          }
        });
      });
    }
    Rx.Observable
    .create(function (observer) {
      tcp = uexSocketMgr.createTCP(null, EMPTY_FUNC, function(status){
        CC.log("connect ~> TCP onStatus change to: " + status);
      });
      if (!tcp) {
        CC.log("connect ~> create TCP failed!");
        observer.onError(ERROR);
      }else{
        CC.log("connect ~> TCP created!");
        observer.onCompleted();
      };
    })
    .subscribe(
      EMPTY_FUNC,
      function(){UNIT_TEST.assert(false);},
      function(){
        Rx.Observable
        .merge(
          connectSignal(null,SHOULD_FAIL),
          connectSignal({port: HOST_TCP_PORT},SHOULD_FAIL),
          connectSignal({host: HOST},SHOULD_FAIL),
          connectSignal({port: HOST_TCP_PORT,host: HOST})
          )
        .finally(function(){tcp && uexSocketMgr.close(tcp);})
        .subscribe(
          function(idx){CC.log("connect ~> test #" + idx + " passed.");},
          function(){UNIT_TEST.assert(false);},
          function(){UNIT_TEST.assert(true);}
          );
      }
      );
  };
  SocketCase.send = function(){
    CC.log("start test 'send' in different condition.");
    CC.log("send without host port or data should fail.");
    CC.log("when mutiple send called, each callback should be invoked eventually.");
    var count = 0,udp = null;


    function sendSignal(udp,param,shouldFail){
      return Rx.Observable.create(function (observer) {
        var idx = count++;
        uexSocketMgr.send(udp,param,function(err){
          if (!err && shouldFail) {
            CC.log("send ~> test #" + idx + " should fail but succeeded!");
            observer.onError(ERROR);
          }else if(err && !shouldFail){
            CC.log("send ~> test #" + idx + " failed with param: " + JSON.stringify(param));
            observer.onError(ERROR);
          }else{
            observer.onNext(idx);
            observer.onCompleted();
          }
        });
      });
    }

    Rx.Observable
    .create(function (observer) {
      udp = uexSocketMgr.createUDP({port: 8000},function(info){
        CC.log("send ~> UDP onData received: '" + info.data + "' from " + info.host + ":" + info.port);
      });
      if (!udp) {
        CC.log("send ~> create UDP failed!");
        observer.onError(ERROR);
      }else{
        CC.log("send ~> UDP created!");
        observer.onCompleted();
      };
    })
    .subscribe(
      EMPTY_FUNC,
      function(){UNIT_TEST.assert(false);},
      function(){
        sendSignal(null,null,SHOULD_FAIL)
        .concat(sendSignal(udp,null,SHOULD_FAIL))
        .concat(sendSignal(udp,generateUDPBody(HOST),SHOULD_FAIL))
        .concat(sendSignal(udp,generateUDPBody(HOST,HOST_UDP_PORT),SHOULD_FAIL))
        .concat(sendSignal(udp,generateUDPBody(HOST,HOST_UDP_PORT,CC.randomString(10))))
        .concat(
              Rx.Observable.merge(//同时发送多条消息
                sendSignal(udp,generateUDPBody(HOST,HOST_UDP_PORT,CC.randomString(10))),
                sendSignal(udp,generateUDPBody(HOST,HOST_UDP_PORT,CC.randomString(10))),
                sendSignal(udp,generateUDPBody(HOST,HOST_UDP_PORT,CC.randomString(10))),
                sendSignal(udp,generateUDPBody(HOST,HOST_UDP_PORT,CC.randomString(10))),
                sendSignal(udp,generateUDPBody(HOST,HOST_UDP_PORT,CC.randomString(10)))
                )
              )
        .finally(function(){udp && uexSocketMgr.close(udp);})
        .subscribe(
          function(idx){CC.log("send ~> test #" + idx + " passed.");},
          function(){UNIT_TEST.assert(false);},
          function(){UNIT_TEST.assert(true);}
          );
      }
      );
};

SocketCase.write = function(){
  CC.log("start test 'write' in different condition.");
  CC.log("write without data should fail.");
  CC.log("when mutiple write called, each callback should be invoked eventually.");
  var tcp = null,count = 0;

  function writeSignal(inTCP,param,shouldFail){
    return Rx.Observable.create(function (observer) {
      var idx = count++;
      uexSocketMgr.write(inTCP,param,function(err){
        if (!err && shouldFail) {
          CC.log("write ~> test #" + idx + " should fail but succeeded!");
          observer.onError(ERROR);
        }else if(err && !shouldFail){
          CC.log("write ~> test #" + idx + " failed with param: " + JSON.stringify(param));
          observer.onError(ERROR);
        }else{
          observer.onNext(idx);
          observer.onCompleted();
        }
      });
    });
  }


  Rx.Observable
    .create(function (observer) {
      tcp = uexSocketMgr.createTCP(null,null,function(info){
        CC.log("write ~> TCP onData received: '" + info.data + "'");
      });
      if (!tcp) {
        CC.log("write ~> create TCP failed!");
        observer.onError(ERROR);
      }else{
        CC.log("write ~> TCP created!");
        observer.onCompleted();
      };
    })
    .concat(
      Rx.Observable.create(function (observer) {
        uexSocketMgr.connect(tcp,{host: HOST,port: HOST_TCP_PORT},function(err){
          if(err){
            CC.log("write ~> TCP connect failed!" + tcp);
            observer.onError(ERROR);
          }else{
            CC.log("write ~> TCP connect succeeded!" + tcp);
            observer.onCompleted();
          }
        });
      })
    )
    .subscribe(
      EMPTY_FUNC,
      function(){UNIT_TEST.assert(false);},
      function(){
        writeSignal(null,null,SHOULD_FAIL)
          .concat(writeSignal(tcp,null,SHOULD_FAIL))
          .concat(writeSignal(tcp,{data: CC.randomString(10)}))
          .concat(
            Rx.Observable.merge(//同时发送多条消息
              writeSignal(tcp,{data: CC.randomString(10)}),
              writeSignal(tcp,{data: CC.randomString(10)}),
              writeSignal(tcp,{data: CC.randomString(10)}),
              writeSignal(tcp,{data: CC.randomString(10)}),
              writeSignal(tcp,{data: CC.randomString(10)})
              )
            )
          .finally(function(){tcp && uexSocketMgr.close(tcp);})
          .subscribe(
            function(idx){CC.log("write ~> test #" + idx + " passed.");},
            function(){UNIT_TEST.assert(false);},
            function(){UNIT_TEST.assert(true);}
          );
        }
    );
};

  SocketCase.STABILITY = function(){
    CC.log("start test STABILITY with echo server!");
    CC.log("when receiving TCP data,an UDP msg will send");
    CC.log("when receiving UDP data,an TCP msg will send");
    CC.log("STABILITY lasts for 10 seconds,or any error happends");
    var tcp,udp,timer,count = 0,isFinished = false;
  
    function cleanup(){
      tcp && uexSocketMgr.close(tcp);
      udp && uexSocketMgr.close(udp);
      timer && clearTimeout(timer);
      isFinished = true;
    }

    var subject = new Rx.Subject();
    subject.subscribe(
      EMPTY_FUNC,
      function(){cleanup();UNIT_TEST.assert(false);},
      function(){cleanup();UNIT_TEST.assert(true);}
    );

    function startTimer(){
      timer = setTimeout(function() {subject.onCompleted();}, 10000);
    }

    function sendMsg(){
      CC.log("STABILITY ~> UDP send msg #" + count++);
      uexSocketMgr.send(udp,generateUDPBody(HOST,HOST_UDP_PORT,CC.randomString(10)),function(err){
        if (err && !isFinished) { 
          CC.log("STABILITY ~> UDP send msg ERROR!");
          subject.onError(ERROR)
        };
      });
    }

    function writeMsg(){
      CC.log("STABILITY ~> TCP write msg #" + count++);
      uexSocketMgr.write(tcp,{data: CC.randomString(10)},function(err){
        if (err && !isFinished) {
          CC.log("STABILITY ~> TCP write msg ERROR!");
          subject.onError(ERROR)
        };
      });
    }

    tcp = uexSocketMgr.createTCP(null,null,function(info){
      CC.log("STABILITY ~> TCP onData received: '" + info.data + "'");
      sendMsg();
    });
    udp = uexSocketMgr.createUDP({port:9000},function(info){
      CC.log("STABILITY ~> UDP onData received: '" + info.data + "' from " + info.host + ":" + info.port);
      writeMsg();
    });
  
    if (!tcp || !udp) {
      CC.log("STABILITY ~> create TCP or UDP failed!");
      subject.onError(ERROR);
    };
    uexSocketMgr.connect(tcp,{host: HOST,port: HOST_TCP_PORT},function(err){
      if (err) {
        CC.log("STABILITY ~> TCP connect failed!");
        subject.onError(ERROR);
      }else{
        startTimer();
      }
    });
  }

  UNIT_TEST.addCase("SocketMgr", SocketCase);
});

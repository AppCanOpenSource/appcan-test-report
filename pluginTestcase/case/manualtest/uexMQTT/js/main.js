 window.uexOnload = function() {

     uexMQTT.onStatusChange = function(data) {
         document.getElementById("status").innerHTML = "status: " + data.status;
     }
     uexMQTT.onNewMessage = function(data) {
         alert("receive message!\nmid: " + data.mid + "\non topic: " + data.topic + "\nqos: " + data.qos + "\nretainFlag: " + data.retainFlag + "\ndata: " + data.data);
     }
 }

 // var test = function(){
 //   uexMQTT.test();
 // }
 var init = function() {
     uexMQTT.init();
 }
 var connect = function() {
     uexMQTT.connect({
         server: "test.mosquitto.org", //String,必选,服务器地址
         port: 1883, //Number,必选,服务器端口
         keepAliveInterval: 30, //Number,必选,心跳包发送频率,单位:秒
         // LWT:{//Object,可选,Last Will and Testament相关设置
         //   enable:true,//Boolean, 是否启用LWT
         //   topic:"willTopic",//String,willMessage的topic
         //   qos:1,//Number,willMessage的qos
         //   data:"willData",//String,willMessage的data
         //   retainFlag:true,//Boolean,willMessage的retainFlag
         // }
     },function (error, data) {
         if (!error){
             alert("connect success...")
         }else{
             alert("failed. "+data)
         }
     });
 }
 var subscribe = function() {
     uexMQTT.subscribe({
         topic: "b1e57467c92140e299022deb808cdd24/000000/get", //String,必选,要订阅的topic
         qos: 1, //Number,必选 此topic的qos
     },function (error, data) {
         if (!error){
             alert("subscribe success..."+data)
         }else{
             alert("failed. "+data)
         }
     });
 }
 var unsubscribe = function() {
     uexMQTT.unsubscribe({
         topic: "b1e57467c92140e299022deb808cdd24/000000/get", //String,必选,要订阅的topic
     },function (error, data) {
         if (!error){
             alert("unsubscribe success..."+data)
         }else{
             alert("failed. "+data)
         }
     });
 }
 var publish = function() {
     uexMQTT.publish({
         id: "uid123456", //String,必选,自定义id,用于在cbPublish中区分消息
         topic: "b1e57467c92140e299022deb808cdd24/000000/set", //String,必选,发布消息的topic
         qos: 0, //Number,必选,要发布消息的qos
         data: "heeello!", //String,必选,要发布的消息数据
         retainFlag: false //Boolean,可选. MQTT broker是否要保留此消息,默认false
     },function (error, data) {
         if (!error){
             alert("publish success...")
         }else{
             alert("failed. "+data)
         }
     });
 }
 var disconnect = function() {
     uexMQTT.disconnect(function (error, data) {
         if (!error){
             alert("disconnect success...")
         }else{
             alert("disconnect failed...")
         }
     });
 }

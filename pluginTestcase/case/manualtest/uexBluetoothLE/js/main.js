function init() {
  var params = {};
  var data = JSON.stringify(params);
  uexBluetoothLE.init(data);
}

function connect() {
  var params = {
    address: "53:9e:06:7e:2e:9d"
  };
  var data = JSON.stringify(params);
  uexBluetoothLE.connect(data);
}

function disconnect() {
  var params = {};
  var data = JSON.stringify(params);
  uexBluetoothLE.disconnect(data);
}

function scanDevice() {
  var uuid = new Array();
  uuid[0] = "00001800-0000-1000-8000-00805f9b34fb";
  uexBluetoothLE.scanDevice(JSON.stringify(uuid));
}

function stopScanDevice() {
  var params = {};
  var data = JSON.stringify(params);
  uexBluetoothLE.stopScanDevice(data);
}

function writeCharacteristic() {
  var params = {};
  var data = JSON.stringify(params);
  uexBluetoothLE.writeCharacteristic(data);
}

function readCharacteristic() {
  var params = {};
  var data = JSON.stringify(params);
  uexBluetoothLE.readCharacteristic(data);
}

function searchForCharacteristic() {
  var params = {};
  var data = JSON.stringify(params);
  uexBluetoothLE.searchForCharacteristic(data);
}

function searchForDescriptor() {
  var params = {};
  var data = JSON.stringify(params);
  uexBluetoothLE.searchForDescriptor(data);
}

function readDescriptor() {
  var params = {};
  var data = JSON.stringify(params);
  uexBluetoothLE.readDescriptor(data);
}

function writeDescriptor() {
  var params = {};
  var data = JSON.stringify(params);
  uexBluetoothLE.writeDescriptor(data);
}


window.uexOnload = function(type) {
  if (type == 0) {
    uexBluetoothLE.cbConnect = cbConnect;
    uexBluetoothLE.onLeScan = onLeScan;
    uexBluetoothLE.onConnectionStateChange = onConnectionStateChange;
    uexBluetoothLE.onServicesDiscovered = onServicesDiscovered;
    uexBluetoothLE.cbCharacteristicRead = onCharacteristicRead;
    uexBluetoothLE.onCharacteristicChanged = onCharacteristicChanged;
    uexBluetoothLE.cbCharacteristicWrite = onCharacteristicWrite;
    uexBluetoothLE.cbSearchForCharacteristic = cbSearchForCharacteristic;
    uexBluetoothLE.cbSearchForDescriptor = cbSearchForDescriptor;
    uexBluetoothLE.cbReadDescriptor = cbReadDescriptor;
    uexBluetoothLE.cbWriteDescriptor = cbWriteDescriptor;
    uexBluetoothLE.cbInit = cbInit;

  }
};

function cbConnect(info) {
  alert(info);
}

function cbInit(info) {
  alert(info);
}

function onLeScan(info) {
  alert(info);
}

function onConnectionStateChange(info) {
  alert(info);
}

function onServicesDiscovered(info) {
  alert(info);
}

function onCharacteristicRead(info) {
  alert(info);
}

function onCharacteristicChanged(info) {
  alert(info);
}

function onCharacteristicWrite(info) {
  alert(info);
}

function cbSearchForCharacteristic(info) {
  alert(info);
}

function cbSearchForDescriptor(info) {
  alert(info);
}

function cbReadDescriptor(info) {
  alert(info);
}

function cbWriteDescriptor(info) {
  alert(info);
}

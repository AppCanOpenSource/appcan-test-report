define(["CC"],function(CC){
  if (!UNIT_TEST) {
    return;
  };
  var TEST_CASE = {};
  TEST_CASE.open = function(){
    var json ={
      "emojicons": "res://emojicons/emojicons.xml",
      "placeHold": "请输入内容"
    };
    uexInputTextFieldView.open(json);
    CC.confirm("uexInputTextFieldView被打开了吗?",function(ret){
      UNIT_TEST.assertTrue(ret);
    });
  };
  TEST_CASE.getInputBarHeight = function(){
    var ret = uexInputTextFieldView.getInputBarHeight()
    CC.log("inputBarHeight = " + ret);
    UNIT_TEST.assertTrue(ret === 0 || !!(ret));
  };
  TEST_CASE.setInputFocused = function(){
    uexInputTextFieldView.onKeyBoardShow = function(dataStr){
      uexInputTextFieldView.onKeyBoardShow = null
      var data = JSON.parse(dataStr);
      var status = data ? data.status : null
      CC.log("onKeyBoardShow status: " + status);
      UNIT_TEST.assertDelay(status === 1,2000);
    }
    uexInputTextFieldView.setInputFocused();
  }
  TEST_CASE.onKeyBoardShow = function(){
    uexInputTextFieldView.onKeyBoardShow = function(dataStr){
      uexInputTextFieldView.onKeyBoardShow = null
      var data = JSON.parse(dataStr);
      var status = data ? data.status : null
      CC.log("onKeyBoardShow status: " + status);
      UNIT_TEST.assertTrue(status === 0)
    }
    CC.toast("请点击屏幕软键盘以外的区域,以关闭软键盘");
  }

  TEST_CASE.onCommitJson = function(){
    uexInputTextFieldView.onCommitJson = function(data){
      uexInputTextFieldView.onCommitJson = null;
      var input = data ? data.emojiconsText : null
      CC.log("input: " + input)
      UNIT_TEST.assert(input)
    }
    CC.toast("请发送文字");
  };
  TEST_CASE.close = function(){
    uexInputTextFieldView.close();
    CC.confirm("uexInputTextFieldView被关闭了吗?",function(ret){
      UNIT_TEST.assertTrue(ret);
    });
  };
  UNIT_TEST.addCase("uexInputTextFieldView", TEST_CASE);
});
/**
 * @author lkl
 */
define(function(){
  if (!UNIT_TEST) return;

  var TEST_CASE = {};
  
  TEST_CASE.canAuthenticate = function(){
    UNIT_TEST.assert(uexTouchID.canAuthenticate() == 0);
  }
  TEST_CASE.authenticate = function(){
    uexTouchID.authenticate({
      hint: "AppCan需要验证指纹"
    },function(ret){
      UNIT_TEST.assert(ret == 0);
    })
  }

  UNIT_TEST.addCase("uexTouchID", TEST_CASE);
});

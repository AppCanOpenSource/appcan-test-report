/**
 * Created by ylt on 16/8/18.
 */
if (UNIT_TEST) {
    var uexXMLHttpMgrCase = {
        "POST" : function() {
            var self = this;
            appcan.request.ajax({
                url : "http://42.96.172.127:19898/app/login",
                type : "POST",
                data : $.param({"username":"admin","password":"admin"}),
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                success : function(data) {
                    UNIT_TEST.log("POST LOGIN: " + JSON.stringify(data));
                    UNIT_TEST.assertEqual(data.status, 0);
                },
                error : function(e, err) {
                    UNIT_TEST.log(e);
                    UNIT_TEST.assertNotEqual(data.status, 0);
                }
            });
        }
    }
    UNIT_TEST.addCase("uexXMLHttpMgr", uexXMLHttpMgrCase);
}
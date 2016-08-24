/**
 * Created by ylt on 16/8/18.
 */
if (UNIT_TEST) {

  //UNIT_TEST.log("###########先启动服务器，更新请求的URL地址。###########");

	var uexXMLHttpMgrCase = {
		"testPostInAppcanJS" : function() {

		    var reqUrl = "http://42.96.172.127:19898/app/login";

	    	testPostInAppcanJS(reqUrl);
		},
		"testGet" : function () {

//		    var reqUrl = "http://192.168.1.47:1337/test?key1=value1&key2=value2&arr[]=aaa&arr[]=bbb&arr[]=ccc";

		    var reqUrl = "http://139.224.11.153:45678/get";

			testGet(reqUrl);
		},
		"testPostWithData" : function () {

//		    var reqUrl = "http://192.168.1.47:1337/testPost";

		    var reqUrl = "http://139.224.11.153:45678/post";

			testPostWithData(reqUrl);
		},
		"testPostWithBody" : function () {

//		    var reqUrl = "http://192.168.1.47:1337/testPostBody";

		    var reqUrl = "http://139.224.11.153:45678/post";

			testPostWithBody(reqUrl);
		},
		"testPostWithStream" : function () {

//		    var reqUrl = "http://192.168.1.47:1337/testPostStream";

            var reqUrl = "http://139.224.11.153:45678/post";

			testPostWithStream(reqUrl);
		},
		"testCookie" : function () {

//		    var reqUrl = "http://192.168.1.47:1337";

		    var reqUrl = "http://139.224.11.153:45678/post";

			testCookie(reqUrl);
		},

	}

	function testPostInAppcanJS(reqUrl) {
		var self = this;
	    appcan.request.ajax({
	        url : reqUrl,
	        type : "POST",
	        data : $.param({"username":"admin","password":"admin"}),
	        dataType : "json",
	        contentType : "application/x-www-form-urlencoded",
	        success : function(data) {
	            UNIT_TEST.log("POST LOGIN: " + JSON.stringify(data));
	            UNIT_TEST.assertEqual(data.state, 0);
	        },
	        error : function(e, err) {
	            UNIT_TEST.log(e);
	            UNIT_TEST.assertNotEqual(data.state, 0);
	        }
	    });
	}

	function testGet(reqUrl) {
		var req = uexXmlHttpMgr.create({
            method:"GET",
            url:reqUrl,
            timeout:15000,
        });
        if(!req){
            UNIT_TEST.log("创建请求失败！");
        } else {
            UNIT_TEST.log("创建请求成功！");
        }

        var header = {
            Contenttype:"adsf",
            testHeaderField:"testHeaderValue"
        }
        var ret = uexXmlHttpMgr.setHeaders(req, JSON.stringify(header));

        uexXmlHttpMgr.send(req, 0, function(state,resStr,resCode,resInfo){

            UNIT_TEST.log("state:" + state  + "\nresult:" + resStr + "\nresCode:" + resCode + "\nresInfo:" + JSON.stringify(resInfo));

            uexXmlHttpMgr.close(req);

            if (state == 1) {
                UNIT_TEST.assertEqual(0, 0);
            } else {
                UNIT_TEST.assertEqual(1, 0);
            }

       	},
       	function(progress){

       	});
	}

 	function testPostWithData(reqUrl) { //Content-Type: multipart/form-data（有文件） or application/x-www-form-urlencoded(默认)

       var req = uexXmlHttpMgr.create({
           method:"POST",
           url:reqUrl,
           timeout:15000,
       });
       if(!req){
           UNIT_TEST.log("创建请求失败！");
       } else {
           UNIT_TEST.log("创建请求成功！");
       }


       var result1 = uexXmlHttpMgr.setPostData(req,0, "field1", "Hello");
       var result2 = uexXmlHttpMgr.setPostData(req,1, "field2", 'res://image.jpg');
       var result2 = uexXmlHttpMgr.setPostData(req,1, "field3", 'res://image.jpg');



       uexXmlHttpMgr.send(req, 0, function(state,resStr,resCode,resInfo){

           UNIT_TEST.log("state:" + state  + "\nresult:" + resStr + "\nresCode:" + resCode + "\nresInfo:" + JSON.stringify(resInfo));

           uexXmlHttpMgr.close(req);

           if (state == 1) {
               UNIT_TEST.assertEqual(0, 0);
           } else {
               UNIT_TEST.assertEqual(1, 0);
           }

      	},
      	function(progress){

      	});

    }

    function testPostWithBody(reqUrl) {
    	var req = uexXmlHttpMgr.create({
           method:"POST",
           url:reqUrl,
           timeout:15000,
       });
       if(!req){
           UNIT_TEST.log("创建请求失败！");
       } else {
           UNIT_TEST.log("创建请求成功！");
       }

       var header = {
           'Content-type':"text/html"
       }
       var ret = uexXmlHttpMgr.setHeaders(req, JSON.stringify(header));
       var ret = uexXmlHttpMgr.setBody(req, "body content");


       uexXmlHttpMgr.send(req, 0, function(state,resStr,resCode,resInfo){

	           UNIT_TEST.log("state:" + state  + "\nresult:" + resStr + "\nresCode:" + resCode + "\nresInfo:" + JSON.stringify(resInfo));

	           uexXmlHttpMgr.close(req);

	           if (state == 1) {
	               UNIT_TEST.assertEqual(0, 0);
	           } else {
	               UNIT_TEST.assertEqual(1, 0);
	           }

      	},
      	function(progress){

      	});

    }

    function testPostWithStream(reqUrl) {
    	var req = uexXmlHttpMgr.create({
                    method:"POST",
                    url:reqUrl,
                    timeout:15000});
        if(!req){
            UNIT_TEST.log("创建请求失败！");
        } else {
            UNIT_TEST.log("创建请求成功！");
        }



        var header = {
            'Content-type':'application/vnd.custom-type',
        }

        var ret = uexXmlHttpMgr.setHeaders(req, JSON.stringify(header));

        var ret = uexXmlHttpMgr.setAppVerify(req, 1);

        var file = "res://icon.png";
        var ret = uexXmlHttpMgr.setInputStream(req, file);


         uexXmlHttpMgr.send(req, 0, function(state,resStr,resCode,resInfo){

           UNIT_TEST.log("state:" + state  + "\nresult:" + resStr + "\nresCode:" + resCode + "\nresInfo:" + JSON.stringify(resInfo));

           uexXmlHttpMgr.close(req);

           if (state == 1) {
               UNIT_TEST.assertEqual(0, 0);
           } else {
               UNIT_TEST.assertEqual(1, 0);
           }

      	},
      	function(progress){

      	});
    }

    function testCookie(reqUrl) {
        var ret = uexXmlHttpMgr.getCookie(reqUrl);
        UNIT_TEST.log("get cookie " + ret);

        uexXmlHttpMgr.clearCookie();

        ret = uexXmlHttpMgr.getCookie(reqUrl);
        UNIT_TEST.log("after clear cookie " + ret);

        UNIT_TEST.assertEqual(0, 0);
	}


	UNIT_TEST.addCase("uexXMLHttpMgr", uexXMLHttpMgrCase);
}



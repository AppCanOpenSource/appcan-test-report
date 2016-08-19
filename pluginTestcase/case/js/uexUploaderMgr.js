/**
 * Created by ylt on 16/8/18.
 */
if (UNIT_TEST) {


    var uexUploaderMgrCase = {
        "create":function(){
            var uploader = uexUploaderMgr.create({
                url: "http://192.168.1.4:45678/post",
                type: 1
            });
            if(uploader!=null){
                uexUploaderMgr.closeUploader(uploader);
            }
            UNIT_TEST.assertNotEqual(uploader,null);
        },
        "closeUploader":function(){
            var uploader = uexUploaderMgr.create({
                url: "http://139.224.11.153:45678/post",
                type: 1
            });
            if(uploader!=null){
                var result=uexUploaderMgr.closeUploader(uploader);
                UNIT_TEST.assertTrue(result);
            }else{
                UNIT_TEST.assert(false);
            }
        },
        "setHeaders":function () {
            var uploader=uexUploaderMgr.create({
                url: "http://139.224.11.153:45678/post",
                type: 1
            });
            if (uploader!=null){
                var headJson = {"myHeaderKey":"myHeaderValue"};
                var result=uexUploaderMgr.setHeaders(uploader,headJson);
                UNIT_TEST.assertTrue(result);
            }else{
                UNIT_TEST.assert(false);
            }
            if(uploader!=null){
                uexUploaderMgr.closeUploader(uploader);
            }
        },
        "uploadFile":function () {
            var uploader=uexUploaderMgr.create({
                url: "http://139.224.11.153:45678/post",
                type: 1
            });
            if (uploader!=null){
                uexUploaderMgr.uploadFile(uploader,"res://image.jpg","imageField",1,640,function(packageSize, percent, responseString, status){
                    switch (status) {
                        case 0:
                            UNIT_TEST.log("上传包大小:"+packageSize+"<br>上传进度:"+percent+"%");
                            break;
                        case 1:
                            UNIT_TEST.log("上传成功,服务器response:"+responseString);
                            UNIT_TEST.assert(true);
                            break;
                        case 2:
                            alert("上传失败");
                            UNIT_TEST.assert(false);
                            break;
                    }
                });
            }else {
                UNIT_TEST.assert(false);
            }

        }

    };

    UNIT_TEST.addCase("uploaderMgr", uexUploaderMgrCase);
}
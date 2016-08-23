/**
 * Created by ylt on 16/8/18.
 */
if (UNIT_TEST) {
    var uexFileMgrCase = {
        "create" : function() {
            var f = uexFileMgr.create({
                path:"wgt://create.txt"
            });
            if (f != null) {
                uexFileMgr.closeFile(f);
            }
            UNIT_TEST.assertNotEqual(f, 0);

        },
        "mkdir":function () {
            uexFileMgr.deleteFileByPath("wgt://data/test11");
            var result=uexFileMgr.mkdir({
                path:"wgt://data/test11"
            });
            UNIT_TEST.assertTrue(result);
        },
        "open" : function() {
            var f = uexFileMgr.open({
                path:"wgt://demo.txt",
                mode:2
            });
            if (f != null) {
                uexFileMgr.closeFile(f);
                UNIT_TEST.assert(true);
            }else{
                UNIT_TEST.assert(false);
            }
        },
        "seekFile":function () {
            var f = uexFileMgr.open({
                path:"wgt://seekDemo.txt",
                mode:7
            });
            if (f != null) {
                uexFileMgr.writeFile(f,0,"this is a case!this is a case!this is a case!this is a " +
                    "case!this is a case!this is a case!this is a case!",function(ret) {
                    var result=uexFileMgr.seekFile(f,5);
                    uexFileMgr.closeFile(f);
                    UNIT_TEST.assertNotEqual(result,-1);
                })
            } else {
                UNIT_TEST.assert(false);
            }
        },
        "seekBeginOfFile":function () {
            var f = uexFileMgr.open({
                path:"wgt://seekDemo.txt",
                mode:1
            });
            if (f != null) {
                var result = uexFileMgr.seekBeginOfFile(f);
                uexFileMgr.closeFile(f);
                UNIT_TEST.assertNotEqual(result, -1);
            } else {
                UNIT_TEST.assert(false);
            }
        },
        "seekEndOfFile":function () {
            var f = uexFileMgr.open({
                path:"wgt://seekDemo.txt",
                mode:1
            });
            if (f != null) {
                var result = uexFileMgr.seekEndOfFile(f);
                uexFileMgr.closeFile(f);
                UNIT_TEST.assertNotEqual(result, -1);
            } else {
                UNIT_TEST.assert(false);
            }
        },
//        "getReaderOffset":function () {
//            var f = uexFileMgr.open({
//                path:"wgt://seekDemo.txt",
//                mode:1
//            });
//            if (f != null) {
//                uexFileMgr.seekFile(f,5);
//                var offset=uexFileMgr.getReaderOffset(f);
//                uexFileMgr.closeFile(f);
//                UNIT_TEST.log("offset1111: "+offset);
//                alert(offset);
//                UNIT_TEST.assertEqual(offset, 5);
//            } else {
//                UNIT_TEST.assert(false);
//            }
//        },
//        "readPercent":function () {
//            var f = uexFileMgr.open({
//                path:"wgt://seekDemo.txt",
//                mode:1
//            });
//            if (f != null) {
//                uexFileMgr.readPercent(f,20,5,function (error,data) {
//                    if(!error){
//                        UNIT_TEST.log(data);
//                        UNIT_TEST.assertNotEqual(data,null)
//                    }else{
//                        UNIT_TEST.assert(false);
//                    }
//                });
//                uexFileMgr.closeFile(f);
//            } else {
//                UNIT_TEST.assert(false);
//            }
//        },
//        "readNext":function () {
//            var f = uexFileMgr.open({
//                path:"wgt://seekDemo.txt",
//                mode:1
//            });
//            if (f != null) {
//                uexFileMgr.readNext(f, 20,function(error,data){
//                    if(!error){
//                        UNIT_TEST.log(data);
//                        UNIT_TEST.assert(true);
//                    }else{
//                        UNIT_TEST.assert(false);
//                    }
//                });
//                uexFileMgr.closeFile(f);
//            } else {
//                UNIT_TEST.assert(false);
//            }
//        },
//        "readPre":function () {
//            var f = uexFileMgr.open({
//                path:"wgt://seekDemo.txt",
//                mode:1
//            });
//            if (f != null) {
//                uexFileMgr.seekEndOfFile(f);
//                uexFileMgr.readPre(f, 20,function(error,data){
//                    if(!error){
//                        UNIT_TEST.log(data);
//                        UNIT_TEST.assert(true);
//                    }else{
//                        UNIT_TEST.assert(false);
//                    }
//                });
//                uexFileMgr.closeFile(f);
//            } else {
//                UNIT_TEST.assert(false);
//            }
//        },
        "deleteFileByPath":function () {
            var file = uexFileMgr.open({
                path: "wgt://data/222.txt",
                mode: 4
            });
            if(!file){
                UNIT_TEST.assert(false);
            }else{
                var ret = uexFileMgr.deleteFileByPath("wgt://data/222.txt");
                uexFileMgr.closeFile(file);
                UNIT_TEST.assertTrue(ret);
            }
        },
        "isFileExistByPath":function () {
            var result= uexFileMgr.isFileExistByPath("wgt://data/222.txt");
            UNIT_TEST.assertTrue(!result);
        },
        "getFileTypeByPath": function () {
            var result=uexFileMgr.getFileTypeByPath("wgt://data");
            UNIT_TEST.assertEqual(result,1);
        },
        "writeFile" : function() {
            var f = uexFileMgr.open({
                path:"wgt://demo.txt", 
                mode:2
            });
            if (f != null) {
                uexFileMgr.writeFile(f,0,"this is a case", function(error) {
                    uexFileMgr.closeFile(f);;
                    UNIT_TEST.assertEqual(error,0);
                })
            } else {
                UNIT_TEST.assert(false);
            }
        },
        "readFile" : function() {
            var f = uexFileMgr.open({
                path:"wgt://demo.txt",
                mode:2
            });
            if (f != null) {
                uexFileMgr.readFile(f,-1, 0, function(err, ret) {
                    uexFileMgr.closeFile(f);;
                    UNIT_TEST.log(err + "--" + ret);
                    if (!err)
                        UNIT_TEST.assertEqual(ret, "this is a case");
                    else
                        UNIT_TEST.assert(false);
                })
            } else
                UNIT_TEST.assert(false);
        },
        "renameFile" : function() {
            uexFileMgr.renameFile({
                oldFilePath:"wgt://demo.txt",
                newFilePath:"wgt://open.txt"
            }, function(error) {
                UNIT_TEST.assertEqual(error,0);
            });
        },
        "getFileRealPath" : function() {
            var p = uexFileMgr.getFileRealPath("wgt://open.txt");
            UNIT_TEST.assertString(p);
        },
        "getFileSize" : function() {
            var file=uexFileMgr.open({
                path:"wgt://open.txt",
                mode: 3
            });
            var size = uexFileMgr.getFileSize(file,"wgt://open.txt");
            if (size!=-1){
                UNIT_TEST.log("size:"+size);
                UNIT_TEST.assert(true);
            }else{
                UNIT_TEST.assert(false);
            }
        },
        "getFilePath":function () {
            var file = uexFileMgr.open({
                path: "wgt://data/1.txt",
                mode: 3
            });
            var path = uexFileMgr.getFilePath(file);
            UNIT_TEST.assertNotEqual(path,null);
        },
        "closeFile":function () {
            var file=uexFileMgr.open({
                path:"wgt://open.txt",
                mode:3
            });
            if(file!=null){
                var result =uexFileMgr.closeFile(file);
                UNIT_TEST.assertTrue(result);
            }else{
                UNIT_TEST.assert(false);
            }
        },
        "getFileListByPath" : function() {
            var info = uexFileMgr.getFileListByPath("wgt://");
            UNIT_TEST.log(JSON.stringify(info));
            UNIT_TEST.assertTrue(info != null);
        },
        "explorer" : function() {
            uexFileMgr.explorer("wgt://", function(error, path) {
                UNIT_TEST.log(JSON.stringify(path));
                if (!error) {
                    UNIT_TEST.assert(true);
                } else
                    UNIT_TEST.assert(false);
            })
        },
        "multiExplorer" : function() {
            uexFileMgr.multiExplorer("wgt://", function(error, path) {
                UNIT_TEST.log(JSON.stringify(path));
                if (!error) {
                    UNIT_TEST.assert(true);
                } else
                    UNIT_TEST.assert(false);
            })
        },
        "isFileExistByPath" : function() {
            UNIT_TEST.assertTrue(uexFileMgr.isFileExistByPath("wgt://open.txt"));
        },
        "createWithPassword":function () {
            var file = uexFileMgr.createWithPassword({
                path: "wgt://data/123456.txt",
                password: "123456",
                mode: 3
            });
            if(file!=null){
                UNIT_TEST.assert(true);
            }else{
                UNIT_TEST.assert(false);
            }
        },
        "openWithPassword":function () {
            var file = uexFileMgr.openWithPassword({
                path: "wgt://data/123456.txt",
                password: "123456",
                mode: 3
            });
            if(!file){
                UNIT_TEST.assert(false);
            }else{
                UNIT_TEST.assert(true);
            }
        },
        "search":function () {
            var data = {
                path:"res://",
                flag:5,
                keywords:["case","main"],
                suffixes:["txt","js"]
            };
            uexFileMgr.search(data,function(err,result){
                if(!err){
                    UNIT_TEST.log(JSON.stringify(result));
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.log(false);
                }
            });
        },
        "getFileSizeByPath":function () {
            var params = {
                path:"wgt://",
                unit:"KB"
            }
            uexFileMgr.getFileSizeByPath(params,function(error,info){
                if(!error){
                    UNIT_TEST.log(JSON.stringify(info));
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.assert(false);
                }
            });
        },
        "copy":function () {
            uexFileMgr.mkdir({
                path:"wgt://test2/"
            });
            uexFileMgr.copy({
                src: "wgt://data/123456.txt",
                target: "wgt://test2/"
            },function(error){
                if(!error){
                    var ret = uexFileMgr.deleteFileByPath("wgt://test2/123456.txt");
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.assert(false);
                }
            });
        }
    };
    
    UNIT_TEST.addCase("file", uexFileMgrCase);
}
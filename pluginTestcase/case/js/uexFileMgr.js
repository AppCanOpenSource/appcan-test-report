/**
 * Created by ylt on 16/8/18.
 */
if (UNIT_TEST) {
    var uexFileMgrCase = {
        "create" : function() {
            var f = appcan.file.create("wgt://create.txt");
            if (f != null) {
                f.close();
            }
            UNIT_TEST.assertNotEqual(f, 0);

        },
        "createSecure" : function() {
            var f = appcan.file.createSecure("wgt://createSecure.txt");
            if (f != null) {
                f.close();
            }
            UNIT_TEST.assertNotEqual(f, 0);

        },
        "open" : function() {
            var f = appcan.file.open("wgt://demo.txt", 2);
            if (f != null) {
                f.close();
            }
            UNIT_TEST.assertNotEqual(f, 0);
        },
        "openSecure" : function() {
            var f = appcan.file.openSecure("wgt://secure.txt", 2, "appcan.cn");
            if (f != null) {
                f.close();
            }
            UNIT_TEST.assertNotEqual(f, 0);
        },
        "write" : function() {
            var f = appcan.file.open("wgt://demo.txt", 2);
            if (f != null) {
                f.write("this is a case", 0, function(ret) {
                    alert(ret);
                    f.close();
                    UNIT_TEST.assertTrue(ret);
                })
            } else
                UNIT_TEST.assert(false);
        },
        "read" : function() {
            var f = appcan.file.open("wgt://demo.txt", 2);
            if (f != null) {
                f.read(-1, 0, function(err, ret) {
                    f.close();
                    UNIT_TEST.log(err + "--" + ret);
                    if (!err)
                        UNIT_TEST.assertEqual(ret, "this is a case");
                    else
                        UNIT_TEST.assert(false);
                })
            } else
                UNIT_TEST.assert(false);
        },
        "deleteFile" : function() {
            var ret = appcan.file.remove("wgt://secure.txt");
            UNIT_TEST.assertTrue(ret);
        },
        "renameFile" : function() {
            appcan.file.rename("wgt://demo.txt", "wgt://open.txt", function(res) {
                UNIT_TEST.assertTrue(!res);
            });
        },
        "createTime" : function() {
            var t = appcan.file.createTime("wgt://open.txt");
            UNIT_TEST.log("time is " + t);
            UNIT_TEST.assertString(t);
        },
        "getRealPath" : function() {
            var p = appcan.file.getRealPath("wgt://open.txt");
            UNIT_TEST.assertString(p);
        },
        "fileSize" : function() {
            var p = appcan.file.fileSize("wgt://open.txt", function(info) {
                UNIT_TEST.log(JSON.stringify(info));
                UNIT_TEST.assertTrue(info != null);
            });
        },
        "fileList" : function() {
            var info = appcan.file.fileList("wgt://");
            UNIT_TEST.log(JSON.stringify(info));
            UNIT_TEST.assertTrue(info != null);
        },
        "writeAll" : function() {
            appcan.file.writeAll("wgt://all.txt", "this is a case", function(error) {
                UNIT_TEST.assertTrue(error);
            })
        },
        "readAll" : function() {
            appcan.file.readAll("wgt://all.txt", function(error, data) {
                UNIT_TEST.log(error + "--" + data);
                if (!error)
                    UNIT_TEST.assertEqual(data, "this is a case");
                else
                    UNIT_TEST.assert(false);
            })
        },
        "writeAllSecure" : function() {
            appcan.file.writeAll("wgt://allSecure.txt", "this is a case", function(error) {
                UNIT_TEST.assertTrue(error);
            }, "appcan.cn")
        },
        "readAllSecure" : function() {
            appcan.file.readAll("wgt://allSecure.txt", function(error, data) {
                UNIT_TEST.log(error + "--" + data);
                if (!error)
                    UNIT_TEST.assertEqual(data, "this is a case");
                else
                    UNIT_TEST.assert(false);
            }, "appcan.cn")
        },
        "stat" : function() {
            UNIT_TEST.assertEqual(appcan.file.stat("wgt://all.txt"), 0)
        },
        "explorer" : function() {
            appcan.file.explorer("wgt://", function(error, path) {
                UNIT_TEST.log(JSON.stringify(path));
                if (!error) {
                    UNIT_TEST.assert(true);
                } else
                    UNIT_TEST.assert(false);
            })
        },
        "multiExplorer" : function() {
            appcan.file.multiExplorer("wgt://", function(error, path) {
                UNIT_TEST.log(JSON.stringify(path));
                if (!error) {
                    UNIT_TEST.assert(true);
                } else
                    UNIT_TEST.assert(false);
            })
        },
        "exists" : function() {
            UNIT_TEST.assertTrue(appcan.file.exists("wgt://all.txt"));
        }
    };
    UNIT_TEST.addCase("file", uexFileMgrCase);
}
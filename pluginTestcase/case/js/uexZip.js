if (UNIT_TEST) {
    var srcPath = "wgt://data/test.txt";
    var zippedPath = "wgt://data/test.zip";
    var password = "123456";
    var creatFile = function() {
        var srcRet = uexFileMgr.isFileExistByPath(srcPath);
        if (srcRet) {
            uexFileMgr.deleteFileByPath(srcPath);
        }
        var zippedRet = uexFileMgr.isFileExistByPath(zippedPath);
        if (zippedRet) {
            uexFileMgr.deleteFileByPath(zippedPath);
        }
        var file = uexFileMgr.open({
            path: srcPath,
            mode: 3
        });
        uexFileMgr.writeFile(file, 0, "this is test data,this is test data,this is test data,this is test data",
        function(error) {
            if (!error) {
                UNIT_TEST.log("写入数据成功");
            } else {
                UNIT_TEST.log("写入数据失败");
            }

        });
    }
    var uexZipCase = {
        "zip": function() {
            creatFile();

            uexZip.zip(srcPath, zippedPath,
            function(error) {
                if (!error) {
                    UNIT_TEST.log("压缩成功");
                    UNIT_TEST.assert(true);
                } else {
                    UNIT_TEST.log("压缩失败");
                    UNIT_TEST.assert(false);
                }

            });

        },
        "unzip": function() {
            var srcRet = uexFileMgr.isFileExistByPath(srcPath);
            if (srcRet) {
                uexFileMgr.deleteFileByPath(srcPath);
            }
            uexZip.unzip(zippedPath, srcPath, function(error) {
                if (!error) {
                    UNIT_TEST.log("解压成功");
                    UNIT_TEST.assert(true);
                    var zippedRet = uexFileMgr.isFileExistByPath(zippedPath);
                    if (zippedRet) {
                        uexFileMgr.deleteFileByPath(zippedPath);
                    }
                } else {
                    UNIT_TEST.log("解压失败");
                    UNIT_TEST.assert(false);
                }

            });

        },
        "zipWithPassword": function() {
            creatFile();
            uexZip.zipWithPassword(srcPath, zippedPath, password, function(error) {
                if (!error) {
                    UNIT_TEST.log("以加密的方式压缩文件成功");
                    UNIT_TEST.assert(true);
                    var srcRet = uexFileMgr.isFileExistByPath(srcPath);
                    if (srcRet) {
                        uexFileMgr.deleteFileByPath(srcPath);
                    }
                } else {
                    UNIT_TEST.log("以加密的方式压缩文件失败");
                    UNIT_TEST.assert(false);
                }
            });

        },
        "unzipWithPassword": function() {
            uexZip.unzipWithPassword(zippedPath, srcPath, password, function(error) {
                if (!error) {
                    UNIT_TEST.log("解压缩加密的文件成功");
                    UNIT_TEST.assert(true);

                } else {
                    UNIT_TEST.log("解压缩加密的文件失败");
                    UNIT_TEST.assert(false);
                }
            });
        }
    }
    UNIT_TEST.addCase("zip", uexZipCase);
}
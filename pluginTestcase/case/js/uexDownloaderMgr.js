/**
 * Created by ylt on 16/8/19.
 */
if (UNIT_TEST) {
    var downloadUrl="http://pic.fxxz.com/up/2016-5/201654940195240.jpg";
    var uexDownloaderMgrCase = {
        "create": function () {
            var downloader = uexDownloaderMgr.create();
            if (downloader != null) {
                uexDownloaderMgr.closeDownloader(downloader)
            }
            UNIT_TEST.assertNotEqual(downloader, null);
        },
        "setHeaders": function () {
            var downloader = uexDownloaderMgr.create();
            if (downloader != null) {
                uexDownloaderMgr.setHeaders(downloader, '{"Content-type":"application/json;charset=utf-8"}');
                uexDownloaderMgr.closeDownloader(downloader);
                UNIT_TEST.assert(true);
            } else {
                UNIT_TEST.assert(false);
            }
        },
        "download": function () {
            var downloader = uexDownloaderMgr.create();
            if (downloader != null) {
                uexDownloaderMgr.download(downloader,
                    downloadUrl,
                    "wgt://data/down/1284565196.jpg",
                    1,
                    function (fileSize, percent, status) {
                        switch (status) {
                            case 0:
                                UNIT_TEST.log("文件大小：" + fileSize + "字节<br>下载进度：" + percent);
                                return;
                                break;
                            case 1:
                                UNIT_TEST.log("下载完成");
                                UNIT_TEST.assert(true);
                                uexDownloaderMgr.closeDownloader(downloader);
                                break;
                            case 2:
                                UNIT_TEST.log("下载失败");
                                UNIT_TEST.assert(false);
                                break;
                        }
                    });
            } else {
                UNIT_TEST.assert(false);
            }
        },
        "cancelDownload":function () {
            var date=new Date().getMilliseconds();
            var flag=true;
            var downloader = uexDownloaderMgr.create();
            if (downloader != null) {
                uexDownloaderMgr.download(downloader,
                    downloadUrl,
                    "wgt://data/down/"+date+".jpg",
                    1,
                    function (fileSize, percent, status) {
                        if (percent>=50&&flag){
                            flag=false;
                            uexDownloaderMgr.cancelDownload(downloadUrl)
                            UNIT_TEST.assert(true);
                        }else {
                            switch (status) {
                                case 0:
                                    UNIT_TEST.log("文件大小：" + fileSize + "字节<br>下载进度：" + percent);
                                    return;
                                    break;
                                case 1:
                                    UNIT_TEST.log("下载完成");
                                    uexDownloaderMgr.closeDownloader(downloader);
                                    break;
                                case 2:
                                    UNIT_TEST.log("下载失败");
                                    UNIT_TEST.assert(false);
                                    break;
                            }
                        }
                    });
            } else {
                UNIT_TEST.assert(false);
            }
        },
        "closeDownloader":function () {
            var downloader = uexDownloaderMgr.create();
            if (downloader != null) {
                uexDownloaderMgr.closeDownloader(downloader);
                UNIT_TEST.assert(true);
            } else {
                UNIT_TEST.assert(false);
            }
        },
        "getInfo": function () {
            var date=new Date().getMilliseconds();
            var flag=true;
            var downloader = uexDownloaderMgr.create();
            if (downloader != null) {
                uexDownloaderMgr.download(downloader,
                    downloadUrl,
                    "wgt://data/down/"+date+".jpg",
                    1,
                    function (fileSize, percent, status) {
                        if (percent>=50&&flag){
                            flag=false;
                            var result=uexDownloaderMgr.getInfo(downloadUrl);
                            if (result==null){
                                UNIT_TEST.assert(false);
                            }else{
                                UNIT_TEST.log(JSON.stringify(result));
                                UNIT_TEST.assert(true);
                            }
                            uexDownloaderMgr.closeDownloader(downloader);
                        }
                        switch (status) {
                                case 0:
                                    UNIT_TEST.log("文件大小：" + fileSize + "字节<br>下载进度：" + percent);
                                    return;
                                    break;
                                case 1:
                                    UNIT_TEST.log("下载完成");
                                    uexDownloaderMgr.closeDownloader(downloader);
                                    break;
                                case 2:
                                    UNIT_TEST.log("下载失败");
                                    break;
                        }
                    });
            } else {
                UNIT_TEST.assert(false);
            }
        }
    };
    UNIT_TEST.addCase("uexDownloaderMgr", uexDownloaderMgrCase);
}
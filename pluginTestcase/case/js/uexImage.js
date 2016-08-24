/**
 * Created by ylt on 16/8/23.
 */

if (UNIT_TEST) {


    var uexImageCase = {
        "openPicker": function () {
            var data = {
                min: 2,
                max: 3,
                quality: 0.8,
                detailedInfo: true
            }
            uexImage.openPicker(data, function (error, info) {
                if (error == -1) {
                    UNIT_TEST.log("取消操作");
                    UNIT_TEST.assert(true)
                } else if (error == 0) {
                    UNIT_TEST.log(info.data);
                    if (info.detailedImageInfo) {
                        UNIT_TEST.log(JSON.stringify(info.detailedImageInfo));
                    }
                    UNIT_TEST.assert(true);
                } else {
                    UNIT_TEST.assert(false);
                }
            });
        },
        "openBrowser":function () {
            var data ={
                displayActionButton:true,
                displayNavArrows:true,
                enableGrid:true,
                startIndex:2,
                data:["res://photo1.jpg",
                    {
                        src:"res://photo2.jpg",
                        thumb:"res://photo2t.jpg"
                    },
                    {
                        src:"res://photo3.jpg",
                        thumb:"res://photo3t.jpg",
                        desc:"22222222222222"
                    },
                    {
                        src:"http://pic.fxxz.com/up/2016-5/201654940195240.jpg",
                        thumb:"res://photo4t.jpg",
                        desc:"22222222222222"
                    }]
            };
            uexImage.openBrowser(data,function(){
                UNIT_TEST.assert(true);
            });
        },
        "openCropper":function () {
            var data={
                src:"res://photo4.jpg",
                mode:2
            };
            uexImage.openCropper(data,function(error,info){
                if(error==-1){
                    UNIT_TEST.log("操作取消");
                    UNIT_TEST.assert(true);
                }else if(error==0) {
                    UNIT_TEST.log(info.data);
                    UNIT_TEST.assert(true);
                }
            });
        },
        "saveToPhotoAlbum":function () {
            var data={
                localPath:"res://photo4.jpg"
            };
            var json=JSON.stringify(data);
            uexImage.saveToPhotoAlbum(json,function(err,errStr){
                if(!err){
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.assert(false);
                }
            });
        },
        "clearOutputImages":function () {
            var ret = uexImage.clearOutputImages();
            UNIT_TEST.assertTrue(ret);
        }
    };

    UNIT_TEST.addCase("uexImage", uexImageCase);
}


if (UNIT_TEST) {
    var uexBaiduMapCase = {
        "open":function(){
            var width=document.documentElement.clientWidth;
            uexBaiduMap.open(0,100,width,640,"116.309","39.977", function(){
                UNIT_TEST.assert(true);
            });
        },
        "hideMap":function () {
            setTimeout('uexBaiduMap.hideMap();UNIT_TEST.assertTrue(true);',1000);
        },
        "showMap":function () {
            setTimeout('uexBaiduMap.showMap();UNIT_TEST.assertTrue(true);',1000);
        },
        "setMapType":function () {
            uexBaiduMap.setMapType(2);
            UNIT_TEST.assertDelay(true);
        },
        "setTrafficEnabled":function () {
            uexBaiduMap.setMapType(1);
            uexBaiduMap.setTrafficEnabled(1);
            UNIT_TEST.assertDelay(true,2000);
        },
        "setCenter":function () {
            uexBaiduMap.setTrafficEnabled(0);
            uexBaiduMap.setCenter(121.481,31.227);
            UNIT_TEST.assertDelay(true);
        },
        "getCenter":function () {
            var data = uexBaiduMap.getCenter();
            UNIT_TEST.log(JSON.stringify(data));
            UNIT_TEST.assertNotEqual(data,null);
        },
        "setZoomLevel":function () {
            uexBaiduMap.setZoomLevel(15);
            UNIT_TEST.assertDelay(true);
        },
        "zoomIn":function () {
            uexBaiduMap.zoomIn();
            UNIT_TEST.assertDelay(true);
        },
        "zoomOut":function () {
            uexBaiduMap.zoomOut();
            UNIT_TEST.assertDelay(true);
        },
        "rotate":function () {
            uexBaiduMap.rotate(90);
            UNIT_TEST.assertDelay(true);
        },
        "overlook":function () {
            uexBaiduMap.overlook(-30);
            UNIT_TEST.assertDelay(true);
        },
        "setZoomEnable":function () {
            uexBaiduMap.overlook(0);
            uexBaiduMap.setZoomEnable(1);
            UNIT_TEST.assertDelay(true);
        },
        "setRotateEnable":function () {
            uexBaiduMap.setRotateEnable(1);
            UNIT_TEST.assertDelay(true);
        },
        "setCompassEnable":function () {
            uexBaiduMap.setCompassEnable(1);
            UNIT_TEST.assertDelay(true);
        },
        "setScrollEnable":function () {
            uexBaiduMap.setScrollEnable(1);
            UNIT_TEST.assertDelay(true);
        },
        "setOverlookEnable":function () {
            uexBaiduMap.setOverlookEnable(1);
            UNIT_TEST.assertDelay(true);
        },
        "addMarkersOverlay":function () {
            uexBaiduMap.setCenter(116.400,39.940);
            var data = [
                {
                    id:"10001",
                    longitude:"116.400244",
                    latitude:"39.963175",
                    icon:"http://www.iconpng.com/png/mapmarkers/marker_inside_azure.png",
                    bubble:{
                        title:"title1"
                    }
                },
                {
                    id:"10002",
                    longitude:"116.369199",
                    latitude:"39.942821",
                    bubble:{
                        title:"title2",
                        bgImage:"res://btn.png"
                    }
                },
                {
                    id:"111",
                    longitude:"116.404",
                    latitude:"39.915",
                    icon:"http://www.iconpng.com/png/mapmarkers/marker_inside_azure.png",
                    bubble:{
                        title:"title3",
                        bgImage:"res://btn.png"
                    }
                }
            ];
            var ids=uexBaiduMap.addMarkersOverlay(JSON.stringify(data));
            if(!ids){
                UNIT_TEST.assert(false);
            }else{
                UNIT_TEST.assertDelay(true);
            }
        },
        "setMarkerOverlay":function () {
            uexBaiduMap.setCenter(116.232323,39.021514);
            var makerInfo =
            {
                makerInfo: {
                    bubble: {
                        bgImage: "res://btn.png",
                        title: "这是标题"
                    },
                    latitude: "39.021514",
                    longitude: "116.232323"
                }
            };
            var makerId = '10001';
            uexBaiduMap. setMarkerOverlay (makerId, makerInfo);
            UNIT_TEST.assertDelay(true);
        },
        "onMarkerClickListener":function () {
            var assert=false;
            uexBaiduMap.onMarkerClickListener=function (data) {
                if (!assert){
                    UNIT_TEST.log(data);
                    assert=true;
                    UNIT_TEST.assert(true);
                }
            };
            UNIT_TEST.log("请点击标注")
        },

        "showBubble":function () {
            uexBaiduMap.setCenter(116.232323,39.021514);
            var makerId = '10001';
            uexBaiduMap. showBubble (makerId);
            UNIT_TEST.assertDelay(true);
        },

        "onMarkerBubbleClickListener":function () {
            var assert=false;
            uexBaiduMap.onMarkerBubbleClickListener=function (data) {
                if (!assert){
                    UNIT_TEST.log(data);
                    assert=true;
                    UNIT_TEST.assert(true);
                }
            };
            UNIT_TEST.log("请点击标注气泡")
        },

        "hideBubble":function () {
            uexBaiduMap. hideBubble ();
            UNIT_TEST.assertDelay(true);
        },
        "removeMakersOverlay":function () {
            var ids='["150","151"]';
            uexBaiduMap.removeMakersOverlay(ids);
            UNIT_TEST.assertDelay(true);
        },
        "addDotOverlay":function () {
            uexBaiduMap.setCenter(116.400244,39.963175);
            var dotInfo={
                fillColor:"#990033",
                id:"150",
                longitude:"116.400244",
                latitude:"39.963175",
                radius:"50"
            };
            var id=uexBaiduMap.addDotOverlay(dotInfo);
            if(!id){
                UNIT_TEST.assert(false);
            }else {
                UNIT_TEST.assertDelay(true);
            }
        },
        "addPolylineOverlay":function () {
            uexBaiduMap.setCenter(116.357428,39.93923);
            uexBaiduMap.setZoomLevel(13);
            var polylineInfo=
            {
                fillColor:"#990033",
                id:"151",
                lineWidth:"10.0",
                property:
                    [
                        {
                            longitude:"116.357428",
                            latitude:"39.93923"
                        },
                        {
                            longitude:"116.401394",
                            latitude:"39.942821"
                        },
                        {
                            longitude:"116.347428",
                            latitude:"39.89923"
                        }
                    ]
            };
            var id=uexBaiduMap.addPolylineOverlay(polylineInfo);
            if(!id){
                UNIT_TEST.assert(false);
            }else {
                UNIT_TEST.assertDelay(true);
            }
        },
        "addArcOverlay":function () {
            var data={
                centerLatitude:"39.942821",
                centerLongitude:"116.369199",
                endLatitude:"39.906965",
                endLongitude:"116.401394",
                id:"152",
                lineWidth:"2.0",
                startLatitude:"39.963175",
                startLongitude:"116.400244",
                strokeColor:"#990033"
            };
            var id=uexBaiduMap.addArcOverlay(data);
            if(!id){
                UNIT_TEST.assert(false);
            }else {
                UNIT_TEST.assertDelay(true);
            }
        },
        "addCircleOverlay":function () {
            var data={
                fillColor:"#4169E1",
                id:"153",latitude:"39.915",
                lineWidth:"4",
                longitude:"116.404",
                radius:"1000",
                strokeColor:"#990033"
            };
            var id=uexBaiduMap.addCircleOverlay(data);
            if(!id){
                UNIT_TEST.assert(false);
            }else {
                UNIT_TEST.assertDelay(true);
            }
        },
        "addPolygonOverlay":function () {
            var data={
                fillColor:"#990033",
                id:"154",
                lineWidth:"2.0",
                property:[
                    {
                        latitude:"39.93923",
                        longitude:"116.357428"
                    },
                    {
                        latitude:"39.91923",
                        longitude:"116.327428"
                    },
                    {
                        latitude:"39.89923",
                        longitude:"116.347428"
                    },
                    {
                        latitude:"39.89923",
                        longitude:"116.367428"
                    }
                ],
                strokeColor:"#990033"
            };
            var id=uexBaiduMap.addPolygonOverlay(data);
            if(!id){
                UNIT_TEST.assert(false);
            }else {
                UNIT_TEST.assertDelay(true);
            }
        },
        "addGroundOverlay":function () {
            var data={
                id:"155",
                imageHeight:"5000",
                imageUrl:"http://img0.bdstatic.com/img/image/9baf75d938553886ce515def29441ed31409109131.jpg",
                imageWidth:"10000",
                property:[
                    {
                        longitude:"116.380338",
                        latitude:"39.92235"
                    },
                    {
                        longitude:"116.414977",
                        latitude:"39.947246"
                    }
                ],
                transparency:"0.8"
            };
            var id=uexBaiduMap.addGroundOverlay(data);
            if(!id){
                UNIT_TEST.assert(false);
            }else {
                UNIT_TEST.assertDelay(true);
            }
        },
        "addTextOverlay":function () {
            var data={
                bgColor: "#FFFF00",
                fontSize: "24",
                id: "156",
                longitude: "116.400244",
                latitude: "39.963175",
                rotate: "-30",
                text: "baidu map"
            };
            var id=uexBaiduMap.addTextOverlay(data);
            if(!id){
                UNIT_TEST.assert(false);
            }else {
                UNIT_TEST.assertDelay(true);
            }
        },
        "removeOverlay":function () {
            uexBaiduMap.removeOverlay("150");
            UNIT_TEST.assertDelay(true);
        },
        "poiSearchInCity":function () {
            var data={
                city: "北京",
                searchKey: "114",
                pageNum: "0"
            };
            uexBaiduMap.poiSearchInCity(data, function(error,data) {
                if (!error){
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }else {
                    UNIT_TEST.assert(false);
                }
            });
         },
        "poiNearbySearch":function () {
            var data ={
                longitude: "116.309",
                latitude: "39.977",
                radius: "1000",
                searchKey: "电影院",
                pageNum: "0"
            };
            uexBaiduMap.poiNearbySearch (data, function(error,data) {
                if (!error){
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }else {
                    UNIT_TEST.assert(false);
                }
            });
        },
        "poiBoundSearch":function () {
            var data={
                searchKey: "电影院",
                pageNum: "0",
                northeast: {
                    longitude: "116.326664",
                    latitude: "39.991418"
                },
                southwest: {
                    longitude: "116.312705",
                    latitude: "39.981730"
                }
            };
            uexBaiduMap.poiBoundSearch(data, function(error,data) {
                if (!error){
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }else {
                    UNIT_TEST.assert(false);
                }
            });
        },
        "busLineSearch":function () {
            var data={
                city: "北京",
                busLineName: "114"
            };
            uexBaiduMap.busLineSearch(data, function(error,data) {
                if (!error){
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }else {
                    UNIT_TEST.assert(false);
                }
            });
        },
        "preBusLineNode":function () {
            uexBaiduMap.preBusLineNode();
            UNIT_TEST.assert(true);
        },
        "nextBusLineNode":function () {
            uexBaiduMap.nextBusLineNode();
            UNIT_TEST.assert(true);
        },
        "removeBusLine":function () {
            uexBaiduMap.removeBusLine();
            UNIT_TEST.assert(true);
        },
        "searchRoutePlan":function () {
            var data = {
                id: "rp345",
                type: "0",
                start: {
                    city: "北京",
                    name: "天安门"
                },
                end:{
                    city: "北京",
                    name: "百度大厦",
                    longitude: "116.307827",
                    latitude: "40.056957"
                }
            };
            var id=uexBaiduMap.searchRoutePlan(data);
            UNIT_TEST.assertNotEqual(id,null);
        },
        "preRouteNode":function () {
            uexBaiduMap.preRouteNode();
            UNIT_TEST.assert(true);
        },

        "nextRouteNode":function () {
            uexBaiduMap.nextRouteNode();
            UNIT_TEST.assert(true);
        },
        "removeRoutePlan":function () {
            uexBaiduMap.removeRoutePlan("rp345");
            UNIT_TEST.assert(true);
        },
        "geocode":function () {
            var data=
            {
                city: "北京",
                address: "东长安街33号"
            };

            uexBaiduMap.geocode(data, function(error,data) {
                if (!error){
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }else {
                    UNIT_TEST.assert(false);
                }
            });
        },
        "reverseGeocode":function () {
            var data={
                longitude: "116.307827",
                latitude: "40.056957"
            };
            uexBaiduMap.reverseGeocode(data, function(error,data) {
                if (!error){
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }else {
                    UNIT_TEST.assert(false);
                }
            });

        },
        "getCurrentLocation":function () {
            uexBaiduMap.getCurrentLocation(function(error,data){
                if (!error){
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }else {
                    UNIT_TEST.assert(false);
                }
            });

        },
        "startLocation":function () {
            uexBaiduMap.startLocation();
            UNIT_TEST.assertDelay(true);
        },
        "stopLocation":function () {
            uexBaiduMap.stopLocation();
            UNIT_TEST.assert(true);
        },
        "setMyLocationEnable":function () {
            uexBaiduMap.setMyLocationEnable(1);
            UNIT_TEST.assertDelay(true);
        },
        "setUserTrackingMode":function () {
            uexBaiduMap.setUserTrackingMode(0);
            UNIT_TEST.assertDelay(true);
        },
        "zoomControlsEnabled":function () {
            uexBaiduMap.zoomControlsEnabled(0);
            UNIT_TEST.assertDelay(true);
        },
        "getDistance":function () {
            var distance = uexBaiduMap.getDistance("40.056957","116.307827","40.05000","116.30999");
            UNIT_TEST.log(distance);
            UNIT_TEST.assertDelay(true);
        },

        "onMapClickListener":function () {
            var assert=false;
            uexBaiduMap.onMapClickListener=function (data) {
                if (!assert){
                    assert=true;
                    UNIT_TEST.log(data);
                    UNIT_TEST.assert(true);
                }
            };
            UNIT_TEST.log("请点击地图")
        },

        "onMapDoubleClickListener":function () {
            var assert=false;
            uexBaiduMap.onMapDoubleClickListener=function (data) {
                if (!assert){
                    UNIT_TEST.log(data);
                    assert=true;
                    UNIT_TEST.assert(true);
                }
            };
            UNIT_TEST.log("请双击地图")
        },

        "onMapLongClickListener":function () {
            var assert=false;
            uexBaiduMap.onMapLongClickListener=function (data) {
                if (!assert){
                    UNIT_TEST.log(data);
                    assert=true;
                    UNIT_TEST.assert(true);
                }
            };
            UNIT_TEST.log("请长按地图")
        },

        "onMapStatusChangeListener":function () {
            var assert=false;
            uexBaiduMap.onMapStatusChangeListener=function (data) {
                if (!assert){
                    UNIT_TEST.log(data);
                    assert=true;
                    UNIT_TEST.assert(true);
                }
            };
            UNIT_TEST.log("请拖动,缩放地图")
        },

        "onReceiveLocation":function () {
            var assert=false;
            uexBaiduMap.onReceiveLocation=function (data) {
                if (!assert){
                    UNIT_TEST.log(data);
                    assert=true;
                    UNIT_TEST.assert(true);
                    uexBaiduMap.stopLocation();    }
            };
            uexBaiduMap.startLocation();
        },

        "onSearchRoutePlan":function () {
            var assert=false;
            uexBaiduMap.onSearchRoutePlan=function (data) {
                if (!assert){
                    UNIT_TEST.log(data);
                    assert=true;
                    UNIT_TEST.assert(true);
                }
            };
            var data = {
                id: "rp345",
                type: "0",
                start: {
                    city: "北京",
                    name: "天安门"
                },
                end:{
                    city: "北京",
                    name: "百度大厦",
                    longitude: "116.307827",
                    latitude: "40.056957"
                }
            };
            uexBaiduMap.searchRoutePlan(data);
        },

        "onZoomLevelChangeListener":function () {
            var assert=false;
            uexBaiduMap.onZoomLevelChangeListener=function (data) {
                if (!assert){
                    UNIT_TEST.log(data);
                    assert=true;
                    UNIT_TEST.assert(true);
                }
            };
            UNIT_TEST.log("请缩放地图");
        },



        "close":function () {
            uexBaiduMap.close();
            UNIT_TEST.assert(true);
        }

    };

    UNIT_TEST.addCase("uexBaiduMap", uexBaiduMapCase);
}
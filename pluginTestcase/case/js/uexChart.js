/**
 * @author lkl
 */
define(["CC"],function(CC){
    if (!UNIT_TEST) return;
    var TEST_CASE = {};
  
    TEST_CASE.openPieChart = function(){
        var wid = window.screen.width;
        var hei = window.screen.height - 300;
        var param = {
            id:'1',
            left: 0,
            top: (uexWindow.getHeight() * 0.2) | 0,
            width: uexWindow.getWidth(),
            height: (uexWindow.getHeight() * 0.7) | 0,
            bgColor:"#cccccc",
            showUnit:true,
            unit:"cc",
            showCenter:true,
            centerColor:"#00000000",
            centerTitle:"我是标题!",
            centerSummary:"我是子标题",
            centerRadius:55,
            centerTransRadius:57,
            valueTextColor:"#ffffff",
            valueTextSize:15,
            desc:"测试饼状图功能",
            descTextColor:"#000000",
            descTextSize:9,
            showTitle:true,
            showValue:true,
            showPercent:false,
            showLegend:true,
            legendPosition:"bottom",
            duration:800,
            data:[
                {
                    title:"title1",
                    color:"#c12552",
                    value:0.9
                },
                {
                    title:"title2",
                    color:"#ff6600",
                    value:0.5
                },
                {
                    title:"title3",
                    color:"#f5c700",
                    value:0.6
                },
                {
                    title:"title4",
                    color:"#6a961f",
                    value:0.4
                },
                {
                    title:"title5",
                    color:"#b36435",
                    value:0.8
                }
            ]
        };
        uexChart.openPieChart(JSON.stringify(param));
        CC.confirm("请确认饼状图被正确打开.",function(ret){
            UNIT_TEST.assert(ret);
        });
    };
    TEST_CASE.closePieChart = function(){
        var params = ['1'];
        var data = JSON.stringify(params);
        uexChart.closePieChart(data);
        CC.confirm("请确认饼状图被关闭.",function(ret){
            UNIT_TEST.assert(ret);
        });
    };
    TEST_CASE.openLineChart = function(){
        var wid = window.screen.width;
        var hei = window.screen.height - 300;
        var param = {
            id:'1',
            left: 0,
            top: (uexWindow.getHeight() * 0.2) | 0,
            width: uexWindow.getWidth(),
            height: (uexWindow.getHeight() * 0.7) | 0,
            bgColor:"#00000000",
            showUnit:true,
            unit:"cc",
            valueTextColor:"#000000",
            valueTextSize:15,
            desc:"测试折线图功能",
            descTextColor:"#000000",
            descTextSize:12,
            showLegend:true,
            legendPosition:"bottom",
            duration:800,
            xData:[2001,2002,2003,2004,2005,2006,2007,2008,2009,2010],
            minValue:-3,
            maxValue:12,
            borderColor:"#ccc",
            extraLines:[
                {
                    yValue:6.5,
                    lineName:"及格",
                    lineColor:"#f00",
                    textColor:"#f00",
                    textSize:12,
                    isSolid:false,
                    lineWidth:4
                },
                {
                    yValue:8.9,
                    lineName:"优秀",
                    lineColor:"#0f0",
                    textColor:"#0f0",
                    textSize:12,
                    isSolid:false,
                    lineWidth:4
              	}
           	],
            lines:[
                {
                    cubicIntensity:0.2,
                    lineName:"line1",
                    lineColor:"#ff0000",
                    lineWidth:2,
                    circleColor:"#ff6600",
                    circleSize:3,
                    isSolid:true,
                    data:[
                        {xValue:2001,yValue:1.01234},
                        {xValue:2002,yValue:3.03},
                        {xValue:2003,yValue:2.05},
                        //{xValue:2004,yValue:4},
                        //{xValue:2005,yValue:2},
                        {xValue:2006,yValue:3},
                        {xValue:2007,yValue:8},
                        {xValue:2008,yValue:10},
                        {xValue:2009,yValue:-1.2},
                        {xValue:2010,yValue:6}
                    ]
                }
            ],
            option:{
                initZoomX:2,
                initZoomY:1,
                initPositionX:0,
                initPositionY:0,
                isSupportDrag:true,
                isSupportZoomX:true,
                isSupportZoomY:false
            }
        };
        uexChart.openLineChart(JSON.stringify(param));
        CC.confirm("请确认折线图被正确打开.",function(ret){
            UNIT_TEST.assert(ret);
        });
    };
    TEST_CASE.onValueSelected = function(){
        UNIT_TEST.log('请点击折线图上任意一个点，触发onValueSelected监听事件');
        uexChart.onValueSelected = function(info){
            var data = JSON.parse(info);
            CC.confirm("请检查点击的点对应的数据，如下："+
            "\nid:" + data.id +
            "\n被点击的元素对应的y值:" + data.value +
             "\n被点击的元素所在的数据数组序号:" + data.dataSetIndex +
             "\n被点击的元素对应的x轴序号:" + data.xIndex,function(ret){
                UNIT_TEST.assert(ret);
            });
        };
    };
    TEST_CASE.closeLineChart = function(){
        var params = ['1'];
        var data = JSON.stringify(params);
        uexChart.closeLineChart(data);
        CC.confirm("请确认折线图被关闭.",function(ret){
            UNIT_TEST.assert(ret);
        });
    };
    TEST_CASE.openBarChart = function(){
        var wid = window.screen.width;
        var hei = window.screen.height - 300;
        var param = {
            id:'1',
            left: 0,
            top: (uexWindow.getHeight() * 0.2) | 0,
            width: uexWindow.getWidth(),
            height: (uexWindow.getHeight() * 0.7) | 0,
            bgColor:"#cccccc",
            showUnit:true,
            unit:"cc",
            valueTextColor:"#ffffff",
            valueTextSize:15,
            showValue:false,
            desc:"测试柱状图功能",
            descTextColor:"#050",
            descTextSize:12,
            showLegend:true,
            legendPosition:"bottom",
            maxValue:20,
            minValue:-20,
            duration:1800,
            isScrollWithWeb:true,
            borderColor:"#eee",
            bars:
                [
                    {
                        barName:"bar1",
                        barColor:"#c12552",
                        data:[
                            {xValue:2001,yValue:5},
                            {xValue:2002,yValue:1},
                            {xValue:2003,yValue:6},
                            {xValue:2004,yValue:4},
                            {xValue:2005,yValue:2},
                            {xValue:2006,yValue:3}
                         ]
                     },
                     {
                        barName:"bar2",
                        barColor:"#ff6600",
                        data:[
                            {xValue:2001,yValue:10},
                            {xValue:2002,yValue:3},
                            {xValue:2003,yValue:3},
                            {xValue:2004,yValue:2},
                            {xValue:2005,yValue:8},
                            {xValue:2006,yValue:2}
                        ]
                    }
                ],
            extraLines:[
                {
                    yValue:3.5,
                    lineName:"平均值",
                    lineColor:"#f00",
                    textColor:"#f00",
                    textSize:12,
                    isSolid:false,
                    lineWidth:4
                }
            ]
        };
        uexChart.openBarChart(JSON.stringify(param));
        CC.confirm("请确认柱状图被正确打开.",function(ret){
            UNIT_TEST.assert(ret);
        });
    };
    TEST_CASE.closeBarChart = function(){
        var params = ['1'];
        var data = JSON.stringify(params);
        uexChart.closeBarChart(data);
        CC.confirm("请确认柱状图被关闭.",function(ret){
            UNIT_TEST.assert(ret);
        });
    };

    UNIT_TEST.addCase("uexChart", TEST_CASE);
});

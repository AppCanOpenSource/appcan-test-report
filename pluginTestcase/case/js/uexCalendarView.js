
if (UNIT_TEST) {
    var uexCalendarViewCase = {
        "open":function(){
            var param = {
            x:0,
            y:100,
            w:screen.width,
            h:screen.height - 100
            }
            uexCalendarView.open(param);
            UNIT_TEST.assert(true);
        },
        "setSelectedDate":function(){
            var data ={
            date:{
            year:2014,
            month:11,
            day:11
            }
            };
            uexCalendarView.setSelectedDate(data);
            UNIT_TEST.assert(true);
        },
        "onItemClick ":function(){
            UNIT_TEST.log("请点击，触发onItemClick回调事件！");
            uexCalendarView.onItemClick  = function(json){
                UNIT_TEST.log("onItemClick :" + json);
                UNIT_TEST.assert(true);
            };
        },
        "close":function(){
            uexCalendarView.close();
            UNIT_TEST.assert(true);
        }
    };
    UNIT_TEST.addCase("uexCalendarView", uexCalendarViewCase);
}
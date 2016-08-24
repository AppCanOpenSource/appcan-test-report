if (UNIT_TEST) {
    var openDatePickerWithConfig_1 = function () {
        var params = {
            initDate:{
                year:2016,
                month:3,
                day:4
            },
            minDate:{
                limitType:0,
                data:{
                    year:2013,
                    month:12,
                    day:23
                }
            },
            maxDate:{
                limitType:0,
                data:{
                    year:2016,
                    month:3,
                    day:8
                }
            }
        }
        var data = JSON.stringify(params);
        uexControl.openDatePickerWithConfig(data, function(data) {
            if (data.year != undefined && data.month != undefined && data.day != undefined) {
                var date = new Date();
                date.setYear(data.year);
                date.setMonth(data.month -1);
                date.setDate(data.day);

                var minDate = new Date();
                minDate.setYear(2013);
                minDate.setMonth(12 - 1);
                minDate.setDate(23);

                var maxDate = new Date();
                maxDate.setYear(2016);
                maxDate.setMonth(3 - 1);
                maxDate.setDate(8);

                if (date > maxDate || date < minDate) {
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(false);
                } else {
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }

            } else {
                UNIT_TEST.assert(false);
            }
        });
    };

    var openDatePickerWithConfig_2 = function () {
        var params = {
            initDate:{
                year:2016,
                month:3,
                day:4
            },
            minDate:{
                limitType:1,
                data:{
                    day:-3
                }
            },
            maxDate:{
                limitType:1,
                data:{
                    month:1
                }
            }
        }
        var data = JSON.stringify(params);
        uexControl.openDatePickerWithConfig(data, function(data) {
            if (data.year != undefined && data.month != undefined && data.day != undefined) {
                var date = new Date();
                date.setYear(data.year);
                date.setMonth(data.month -1);
                date.setDate(data.day);

                var minDate = new Date();
                minDate.setYear(2016);
                minDate.setMonth(3 - 1);
                minDate.setDate(1);

                var maxDate = new Date();
                maxDate.setYear(2016);
                maxDate.setMonth(3);
                maxDate.setDate(4);

                if (date > maxDate || date < minDate) {
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(false);
                } else {
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }

            } else {
                UNIT_TEST.assert(false);
            }
        });
    };
    var openDatePickerWithConfig_3 = function () {
        var params = {
            initDate:{
                year:2016,
                month:3,
                day:4
            },
            maxDate:{
                limitType:1,
                data:{
                    month:1
                }
            }
        }
        var data = JSON.stringify(params);
        uexControl.openDatePickerWithConfig(data, function(data) {
            if (data.year != undefined && data.month != undefined && data.day != undefined) {
                var date = new Date();
                date.setYear(data.year);
                date.setMonth(data.month -1);
                date.setDate(data.day);

                var maxDate = new Date();
                maxDate.setYear(2016);
                maxDate.setMonth(3);
                maxDate.setDate(4);

                UNIT_TEST.log(JSON.stringify(data));
                if (date > maxDate ) {
                    UNIT_TEST.assert(false);
                } else {
                    UNIT_TEST.assert(true);
                }

            } else {
                UNIT_TEST.assert(false);
            }
        });
    };
    var uexControlCase = {
        "openDatePicker": function(){
             uexControl.openDatePicker(2016, 8, 25, function(data) {
                if (data.year != undefined && data.month != undefined && data.day != undefined) {
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                } else {
                    UNIT_TEST.assert(false);
                }
             });
        },
        "openDatePickerWithoutDay": function(){
             uexControl.openDatePickerWithoutDay(2016, 8, function(data) {
                if (data.year != undefined && data.month != undefined) {
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                } else {
                    UNIT_TEST.assert(false);
                }
             });
        },
        "openTimePicker": function(){
             uexControl.openTimePicker(10, 10, function(data) {
                if (data.hour != undefined && data.minute != undefined) {
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                } else {
                    UNIT_TEST.assert(false);
                }
             });
        },
        "openInputDialog": function(){
            uexControl.openInputDialog(0,"默认数据","按钮", function(data) {
                UNIT_TEST.log("data is:" + data);
                if (data) {
                    UNIT_TEST.assert(true);
                } else {
                    UNIT_TEST.assert(false);
                }
            })
        },
        "openDatePickerWithConfig": function (){
            var i = Math.ceil(Math.random() * 3);
            UNIT_TEST.log("[execute openDatePickerWithConfig case] :" + i);
            if (i === 1) {
                openDatePickerWithConfig_1();
            } else if (i === 2) {
                openDatePickerWithConfig_2();
            } else {
                openDatePickerWithConfig_3();
            }

        }

    };
    UNIT_TEST.addCase("control", uexControlCase);
}

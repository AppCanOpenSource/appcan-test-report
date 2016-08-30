/**
 * Created by ylt on 16/8/29.
 */

var contactName="正益移动";
var contactId="";
if (UNIT_TEST) {
    var uexContactCase = {
        "open":function(){
            uexContact.open(function(error,data){
                if(!error){
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(true);
                }else{
                    UNIT_TEST.assert(false);
                }
            });
        },
        "multiOpen":function () {
            uexContact.multiOpen(function(error,data) {
                if(!error){
                    UNIT_TEST.log(JSON.stringify(data));
                }
                UNIT_TEST.assert(!error);
            });
        },
        "addItem":function () {
            var option = {
                isNeedAlertDialog:false
            };
            uexContact.addItem(contactName,"13436827900","widgetone@3g2win.com",option,function(error, data){
                UNIT_TEST.assertTrue(!error);
            });
        },
        "deleteItem":function () {
            uexContact.deleteItem(contactName,function (error, data) {
                UNIT_TEST.assertTrue(!error);
            });
        },
        "deleteWithId":function () {
            var option = {
                isNeedAlertDialog:false
            };
            uexContact.addItem(contactName,"13436827900","widgetone@3g2win.com",option,function(error, data){
                var option = {
                    resultNum:-1,//-1表示一次返回所有结果
                    isSearchNum:false,
                    isSearchEmail:false,
                    isSearchAddress:false,
                    isSearchCompany:false,
                    isSearchTitle:false,
                    isSearchNote:false,
                    isSearchUrl:false
                };
                uexContact.search(option, function(error, data) {
                    if (!error){
                        console.dir(data[0]);
                        contactId=data[0].contactId;
                        var delOption =  {
                            contactId:contactId
                        };
                        uexContact.deleteWithId(delOption,function(error,data){
                            UNIT_TEST.assert(!error);
                        });
                    }else{
                        UNIT_TEST.assert(false);
                    }
                });
            });
        },
        "search":function () {
            var option = {
                isNeedAlertDialog:false
            };
            uexContact.addItem(contactName,"13436827900","widgetone@3g2win.com",option,function(error, data){
                var option = {
                    resultNum:-1,//-1表示一次返回所有结果
                    isSearchNum:false,
                    isSearchEmail:false,
                    isSearchAddress:false,
                    isSearchCompany:false,
                    isSearchTitle:false,
                    isSearchNote:false,
                    isSearchUrl:false
                };
                uexContact.search(option, function(error, data) {
                    UNIT_TEST.log(JSON.stringify(data));
                    UNIT_TEST.assert(!error);
                });
            });
        },
        "searchItem":function () {
            var option = {
                resultNum:-1,//-1表示一次返回所有结果
                isSearchNum:false,
                isSearchEmail:false,
                isSearchAddress:false,
                isSearchCompany:false,
                isSearchTitle:false,
                isSearchNote:false,
                isSearchUrl:false
            };
            uexContact.searchItem(contactName, option, function(error, data) {
                contactId=data[0].contactId;
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assert(!error);
            });
        },
        "modifyWithId":function () {
            var option = {
                contactId:contactId,
                name:'Appcan',
                num:'15888888888',
                email:'widgeton@zymobi.com'
            };
            uexContact.modifyWithId(JSON.stringify(option), function(error,data) {
                UNIT_TEST.assert(!error);
            });
        },
        "modifyItem":function () {
            uexContact.modifyItem(contactName,"13436827900","widgetone@3g2win.com", function(error,data) {
                UNIT_TEST.assert(!error);
            });
        },
        "addItemWithVCard":function () {
            uexContact.addItemWithVCard('BEGIN:VCARD\nVERSION:3.0\nN:韩;超\nTEL:22334752\nEMAIL:zhuliang@ceair.com\nADR:;;绥宁路628号;;上海;200335\nORG:中国东方航空股有限公司\nTITLE:项目经理\nURL:mp.ceair.com\nNOTE:名\347\211\214二维码\nEND:VCARD','',function(error,data){
                UNIT_TEST.assert(!error);
                uexContact.deleteItem("韩超");
            });
        }
    };
    UNIT_TEST.addCase("uexContact", uexContactCase);
}

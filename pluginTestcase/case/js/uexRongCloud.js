/**
 * Created by ylt on 16/8/31.
 */

if (UNIT_TEST) {

    var globalTargetId = "55666";

    var globalMsgId="";

    var uexRongCloudCase = {
        "init": function () {

            var params = {
                appKey: "e5t4ouvptdhca"
            };
            uexRongCloud.init(params, function (error, data) {
                UNIT_TEST.assert(!error);
            });

        },
        "connect": function () {

            //{"userId":"123456","token":"g3fqLjRWtJdOkUCd+uqMRFYLsaBj7tK6QZ9/KFrx+0H22Ki0yw2VryZSnIEN2vTPv9T56shgMwGSAC9SfCY27A=="}
            //{"userId":"55666","token":"l6pQSRcGYrZeC74XWtMt9lYLsaBj7tK6QZ9/KFrx+0H22Ki0yw2Vr2VWSk7VAC9zdJcAMydT35mS0vr73Hd/gw=="}
            var params = {
                // token: "g3fqLjRWtJdOkUCd+uqMRFYLsaBj7tK6QZ9/KFrx+0H22Ki0yw2VryZSnIEN2vTPv9T56shgMwGSAC9SfCY27A=="
                token: "g3fqLjRWtJdOkUCd+uqMRFYLsaBj7tK6QZ9/KFrx+0H22Ki0yw2VryZSnIEN2vTPv9T56shgMwGSAC9SfCY27A=="
            };
            uexRongCloud.connect(params, function (error, data) {
                UNIT_TEST.assert(!error);
            });

        },
        "sendTextMessage": function () {
            uexRongCloud.sendMessage({
                objectName: "RC:TxtMsg",
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                // targetId: "55666",
                extra: "extra info ...", //消息的附加字段
                //objectName 为"RC:TxtMsg"时(文字消息)
                text: "text content ..." //消息的文字内容
            }, function (error, messageId) {
                if (error == 0) {
                    UNIT_TEST.log("准备发送:" + messageId)
                } else if (error == 1) {
                    UNIT_TEST.log("发送成功:" + messageId)
                    UNIT_TEST.assert(true);
                } else if (error == 2) {
                    UNIT_TEST.log("发送失败:" + messageId)
                    UNIT_TEST.assert(false);
                }

            });
        },
        "sendVoiceMessage": function () {
            uexRongCloud.sendMessage({
                objectName: "RC:VcMsg",
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                // targetId: "55666",
                extra: "extra info ...", //消息的附加字段
                voicePath: 'res://voice.mp3', //语音文件的路径
                duration: 30, //Number类型 语音消息的时长，单位为秒
            }, function (error, messageId) {
                if (error == 0) {
                    UNIT_TEST.log("准备发送:" + messageId)
                } else if (error == 1) {
                    UNIT_TEST.log("发送成功:" + messageId)
                    UNIT_TEST.assert(true);
                } else if (error == 2) {
                    UNIT_TEST.log("发送失败:" + messageId)
                    UNIT_TEST.assert(false);
                }

            });
        },
        "sendImageMessage": function () {
            uexRongCloud.sendMessage({
                objectName: "RC:ImgMsg",
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                // targetId: "55666",
                extra: "extra info ...", //消息的附加字段
                imgPath: 'res://image.jpg', //图片的本地路径
                thumbPath: 'res://icon.png' //缩略图
            }, function (error, messageId) {
                if (error == 0) {
                    UNIT_TEST.log("准备发送:" + messageId)
                } else if (error == 1) {
                    UNIT_TEST.log("发送成功:" + messageId)
                    UNIT_TEST.assert(true);
                } else if (error == 2) {
                    UNIT_TEST.log("发送失败:" + messageId)
                    UNIT_TEST.assert(false);
                }

            });
        },
        "sendImgTxtMessage": function () {
            uexRongCloud.sendMessage({
                objectName: "RC:ImgTextMsg",
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                // targetId: "55666",
                extra: "extra info ...", //消息的附加字段
                //objectName 为"RC:ImgTextMsg"时(图文消息)
                title: '消息的标题', //消息的标题
                description: '消息的内容描述', //消息的内容描述
                // imgPath: 'http://img1.3lian.com/2015/w7/90/d/1.jpg', //发送图片的网络路径
                url: 'http://www.baidu.com' //图文消息中包含的需要跳转到的URL
            }, function (error, messageId) {
                if (error == 0) {
                    UNIT_TEST.log("准备发送:" + messageId);
                } else if (error == 1) {
                    UNIT_TEST.log("发送成功:" + messageId);
                    UNIT_TEST.assert(true);
                } else if (error == 2) {
                    UNIT_TEST.log("发送失败:" + messageId);
                    UNIT_TEST.assert(false);
                }

            });
        },
        "sendLBSMessage": function () {
            uexRongCloud.sendMessage({
                objectName: "RC:LBSMsg",
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                // targetId: "55666",
                extra: "extra info ...", //消息的附加字段
                //objectName 为"RC:LBSMsg"时(位置消息)
                latitude: '39.9087202', //维度
                longitude: '116.3974799', //经度
                poi: '北京天安门', //地理位置的名称
                imgPath: 'res://image.jpg' //地图略缩图的路径
            }, function (error, messageId) {
                if (error == 0) {
                    UNIT_TEST.log("准备发送:" + messageId);
                } else if (error == 1) {
                    UNIT_TEST.log("发送成功:" + messageId);
                    UNIT_TEST.assert(true);
                } else if (error == 2) {
                    UNIT_TEST.log("发送失败:" + messageId);
                    UNIT_TEST.assert(false);
                }

            });
        },
        "sendCMDMessage": function () {
            uexRongCloud.sendMessage({
                objectName: "RC:CmdMsg",
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                // targetId: "55666",
                extra: "extra info ...", //消息的附加字段
                name: 'action_name', //命令的名称
                data: 'action_data .....' //命令的数据
            }, function (error, messageId) {
                if (error == 0) {
                    UNIT_TEST.log("准备发送:" + messageId);
                } else if (error == 1) {
                    UNIT_TEST.log("发送成功:" + messageId);
                    UNIT_TEST.assert(true);
                } else if (error == 2) {
                    UNIT_TEST.log("发送失败:" + messageId);
                    UNIT_TEST.assert(false);
                }

            });
        },
        "getConversationList": function () {
            var result = uexRongCloud.getConversationList();
            UNIT_TEST.assertNotEqual(result, null);
        },
        "getConversation": function () {
            var params = {
                conversationType: "PRIVATE",
                targetId: globalTargetId
            };
            var result = uexRongCloud.getConversation(params);
            UNIT_TEST.assertNotEqual(result, null)
        },
        "setConversationToTop": function () {
            var params = {
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                isTop: true
            };
            uexRongCloud.setConversationToTop(params, function (error, data) {
                UNIT_TEST.assert(!error);
            });
        },
        "getConversationNotificationStatus": function () {
            var params = {
                conversationType: "PRIVATE",
                targetId: globalTargetId
            };
            uexRongCloud.getConversationNotificationStatus(params, function (error, data) {
                UNIT_TEST.assert(!error);
            });
        },
        "setConversationNotificationStatus": function () {
            var params = {
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                status: 1
            };
            uexRongCloud.setConversationNotificationStatus(params, function (error, data) {
                UNIT_TEST.assert(!error);
            });
        },
        "getLatestMessages": function () {
            var params = {
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                count: 20
            };
            uexRongCloud.getLatestMessages(params, function (error, data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assert(!error);
            });
        },
        "getHistoryMessages": function () {
            var params = {
                conversationType: "PRIVATE",
                targetId: globalTargetId,
                count: 20,
                oldestMessageId: -1
            };
            uexRongCloud.getHistoryMessages(params, function (error, data) {
                globalMsgId=data[0].messageId;
                UNIT_TEST.assert(!error);
            });
        },
        "deleteMessages": function () {
            var ids = [globalMsgId];
            var params = {
                messageIds: ids
            };
            uexRongCloud.deleteMessages(params, function (error, data) {
                UNIT_TEST.assert(!error);
            });
        },
        "clearMessages": function () {
            var params = {
                conversationType: "PRIVATE",
                targetId: globalTargetId
            };
            uexRongCloud.clearMessages(params, function (error, data) {
                UNIT_TEST.assert(!error);
            });
        },
        "removeConversation": function () {
            var params = {
                conversationType: "PRIVATE",
                targetId: globalTargetId
            };
            uexRongCloud.removeConversation(params, function (error, data) {
                UNIT_TEST.assert(!error);
            });

        },
        "clearConversations": function () {
            var types = [];
            types[0] = "PRIVATE";
            var params = {
                conversationTypes: types
            };
            uexRongCloud.clearConversations(params, function (error, data) {
                UNIT_TEST.assert(!error);
            });
        },
        "getTotalUnreadCount": function () {
            alert("请用"+globalTargetId+"的账户发送至少一条消息后点确定");
            var count = uexRongCloud.getTotalUnreadCount();
            UNIT_TEST.log("未读消息总数:"+count);
            UNIT_TEST.assert(count >= 0);
        },
        "getUnreadCount": function () {
            var params = {
                conversationType: "PRIVATE",
                targetId: globalTargetId
            };
            var count = uexRongCloud.getUnreadCount(params);
            UNIT_TEST.log(globalTargetId+"未读消息总数:"+count);
            UNIT_TEST.assert(count >= 0);
        },
        "getUnreadCountByConversationTypes": function () {
            var params = {
                conversationTypes: ["PRIVATE"]
            };
            var count = uexRongCloud.getUnreadCountByConversationTypes(params);
            UNIT_TEST.log("单聊未读消息总数:"+count);
            UNIT_TEST.assert(count >= 0);
        },
        "setMessageReceivedStatus": function () {
            var params = {
                messageId: globalMsgId, // Number 消息 Id
                receivedStatus: "READ" //"UNREAD","READ","LISTENED","DOWNLOADED"
            };
            uexRongCloud.setMessageReceivedStatus(params);
            UNIT_TEST.assert(true);
        },
        "clearMessagesUnreadStatus": function () {
             if (uexWidgetOne.platformName.indexOf('android') > -1) {
                 var params = {
                 conversationType: "PRIVATE",
                 targetId: globalTargetId
                 };
                 uexRongCloud.clearMessagesUnreadStatus(params);
                 UNIT_TEST.assert(true);
             }else{//iOS不支持
                 UNIT_TEST.log("iOS not support, let it go");
                 UNIT_TEST.assert(true);
             }
            
        },
        "disconnect": function () {
            uexRongCloud.disconnect({
                isReceivePush: true
            });
            UNIT_TEST.assert(true);
        }
    };

    UNIT_TEST.addCase("uexRongCloud", uexRongCloudCase);
}

/**
 * Created by ylt on 16/9/19.
 */

var receiveUsername = "ylt1";
var msgId=null;
var publicGroupId=null;
var privateGroupId=null;


function registerCallback() {
    uexEasemob.onConnected= function () {
        UNIT_TEST.log("onConnected.");
    };
    uexEasemob.onDisconnected = function (data) {
        UNIT_TEST.log("onDisconnected: " + data);
    };
    uexEasemob.onNewMessage = function (data) {
        UNIT_TEST.log('onNewMessage:' + data);
        msgId=JSON.parse(data).messageId;
        UNIT_TEST.log("msgId: "+msgId)
    };

    //[2.2]
    uexEasemob.onCmdMessageReceive = function (data) {
        UNIT_TEST.log('onCmdMessageReceive:' + data);
    };

    //[2.3]
    uexEasemob.onAckMessage = function (data) {
        UNIT_TEST.log('onAckMessage:' + data);
    };

    //[2.4]
    uexEasemob.onDeliveryMessage = function (data) {
        UNIT_TEST.log('onDeliveryMessage:' + data);
    };


    //[4.1]
    uexEasemob.onContactAdded = function (data) {
        UNIT_TEST.log('onContactAdded:' + data);
    };

    //[4.2]
    uexEasemob.onContactDeleted = function (data) {
        UNIT_TEST.log('onContactDeleted:' + data);
    };

    //[4.3]
    uexEasemob.onContactInvited = function (data) {
        UNIT_TEST.log('onContactInvited:' + data);
    };

    //[4.4]
    uexEasemob.onContactAgreed = function (data) {
        UNIT_TEST.log('onContactAgreed:' + data);
    };

    //[4.5]
    uexEasemob.onContactRefused = function (data) {
        UNIT_TEST.log('onContactRefused:' + data);
    };

    //[5.1]
    uexEasemob.onInvitationDeclined = function (data) {
        UNIT_TEST.log('onInvitationDeclined:' + data);
    };

    //[5.2]
    uexEasemob.onUserRemoved = function (data) {
        UNIT_TEST.log('onUserRemoved:' + data);
    };

    //[5.3]
    uexEasemob.onGroupDestroy = function (data) {
        UNIT_TEST.log('onGroupDestroy:' + data);
    };

    //[5.4]
    uexEasemob.onApplicationReceived = function (data) {
        UNIT_TEST.log('onApplicationReceived:' + data);
    };

    //[5.5]
    uexEasemob.onApplicationAccept = function (data) {
        UNIT_TEST.log('onApplicationAccept:' + data);
    };

    //[5.6]
    uexEasemob.onApplicationDeclined = function (data) {
        UNIT_TEST.log('onApplicationDeclined:' + data);
    };

    //[5.28]
    uexEasemob.onGroupUpdateInfo = function (data) {
        UNIT_TEST.log('onGroupUpdateInfo:' + data);
    };

    uexEasemob.onDidJoinedGroup = function (data) {
        alert("onDidJoinedGroup:" + data);
    };
    uexEasemob.onReceiveGroupInvitation = function (data) {
        alert("onReceiveGroupInvitation:" + data);
    };

    //[6.1]
    uexEasemob.onCallReceive = function (data) {
        UNIT_TEST.log('onCallReceive:' + data);
    };

    //[6.2]
    uexEasemob.onCallStateChanged = function (data) {
        UNIT_TEST.log('onCallStateChanged:' + data);
    };

    uexEasemob.onApnsLaunch = function (data) {
        UNIT_TEST.log('onApnsLaunch:' + data);
    };

    uexEasemob.onMessageSent = function (data) {
        UNIT_TEST.log('onMessageSent:' + data);
    };
    uexEasemob.onGroupCreated = function (data) {
        UNIT_TEST.log('onGroupCreated:' + data);
        var result=JSON.parse(data);
        if (publicGroupId==null){//两次创建群的操作,先创建公开群
            publicGroupId=result.group.groupId;
        }else{
            privateGroupId=result.group.groupId;
        }
    }

}

if (UNIT_TEST) {

    var uexEasemobCase = {
        "registerCallback":function () {
            uexEasemob.registerCallback();
            registerCallback();
            UNIT_TEST.assert(true);
        },
        "initEasemob": function () {
            uexEasemob.initEasemob({
                appKey: "easemob-demo#chatdemoui",
                apnsCertName: "chatdemoui",
                isAutoLoginEnabled: "1",
                isAutoAcceptGroupInvitation: "2"
            }, function (data) {
                UNIT_TEST.log(data);
                UNIT_TEST.assert(true);
            });
            alert("请用环信demo登录ylt1 账号,密码为123456");
            UNIT_TEST.assert(true);
        },
        "login": function () {
            uexEasemob.login({
                username: "ylt",
                password: "123456"
            }, function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assertEqual(data.result, 1);
            });
        },
        "registerUser": function () {
            var username = "ylt" +Math.floor(Math.random()*10000+1);
            uexEasemob.registerUser({
                username: username,
                password: "123456"
            }, function (data) {
                UNIT_TEST.log("注册的用户名为: " + username);
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assertEqual(data.result, 1);
            })

        },
        "updateCurrentUserNickname": function () {
            uexEasemob.updateCurrentUserNickname({
                nickname:"ylt"
            });
            UNIT_TEST.assert(true);
        },
        "sendText": function () {
            uexEasemob.sendText({
                username: receiveUsername,//单聊时聊天人的userid或者群聊时groupid
                chatType: 0,//0-单聊,1-群聊
                content: "这是一条测试文本内容",//文本内容
                ext: "name=xxx&age=18",//扩展属性(可选参数,String)
            });
            UNIT_TEST.assert(true);
        },
        "sendFile": function () {
            alert("请确保'/sdcard/pic.jpg'存在之后点确认");
            uexEasemob.sendFile({
                "username": receiveUsername,
                "chatType": 0,
                "filePath": "/sdcard/pic.jpg"
            });
            UNIT_TEST.assert(true);
        },
        "sendPicture": function () {
            uexEasemob.sendPicture({
                "username": receiveUsername,
                "chatType": 0,
                "filePath": "/sdcard/pic.jpg"
            });
            UNIT_TEST.assert(true);
        },
        "sendLocationMsg": function () {
            uexEasemob.sendLocationMsg({
                "username": receiveUsername,
                "chatType": 0,
                "locationAddress": "麦当劳",
                "latitude": "30.51667",
                "longitude": "114.31667"
            });
            UNIT_TEST.assert(true);
        },
        "sendVoice": function () {
            alert("请确保'/sdcard/voice.mp3'存在之后点确认");
            uexEasemob.sendVoice({
                "username": receiveUsername,
                "chatType": 0,
                "filePath": "/sdcard/voice.mp3",
                "length": "3"
            });
            UNIT_TEST.assert(true);
        },
        "sendVideo": function () {
            alert("请确保'/sdcard/video.mp4'存在之后点确认");
            uexEasemob.sendVideo({
                username: receiveUsername,//单聊时聊天人的userid或者群聊时groupid
                chatType: 0,//0-单聊,1-群聊
                filePath: "/sdcard/video.mp4",//视频文件路径
                length: 15,//长度(Android必选,iOS可选)
                displayName: "测试视频",//对方接收时显示的文件名(仅iOS需要)
                ext: "xxxxxxxxxx"//扩展属性(可选参数,String)
            });
            UNIT_TEST.assert(true);
        },
        "sendCmdMessage": function () {
            uexEasemob.sendCmdMessage({
                chatType: 0,//0-单聊,1-群聊
                action: "XXXXXXXXXX",//
                toUsername: receiveUsername,//
                ext: ""//扩展属性(可选参数,String)
            });
            UNIT_TEST.assert(true);
        },
        "setNotifyBySoundAndVibrate": function () {
            uexEasemob.setNotifyBySoundAndVibrate({
                "soundEnable": "0"
            });
            UNIT_TEST.assert(true);
        },
        "getMessageById": function () {
            uexEasemob.getMessageById({
                msgId: msgId
            }, function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assertNotEqual(data, null);
            });
        },
        "sendHasReadResponseForMessage": function () {
            uexEasemob.sendHasReadResponseForMessage({
                "msgId": msgId
            });
            UNIT_TEST.assert(true);
        },
        "getConversationByName": function () {
            uexEasemob.getConversationByName({
                username: receiveUsername,
                chatType: 1
            }, function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assertNotEqual(data, null);
            });
        },
        "getMessageHistory": function () {
            uexEasemob.getMessageHistory({
                username: receiveUsername,//单聊时聊天人的userName或者群聊时groupid
                chatType: 0,//0-单聊,1-群聊
                startMsgId: 0,//获取startMsgId之前的pagesize条消息
                pagesize: 0//分页大小,为0时获取所有消息(iOS在3.0.21后不支持获取所有消息),startMsgId可不传
            }, function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assertNotEqual(data, null);
            });
        },
        "getUnreadMsgCount": function () {
            alert("请用ylt1 任意发送几条消息");
            uexEasemob.getUnreadMsgCount({
                username: receiveUsername,
                chatType: 0
            }, function (data) {
                UNIT_TEST.log("未读消息数:" + data.count);
                UNIT_TEST.assert(true);
            });
        },
        "resetUnreadMsgCount": function () {
            uexEasemob.resetUnreadMsgCount({
                username: receiveUsername,
                chatType: 0
            });
            UNIT_TEST.assert(true);
        },
        "resetAllUnreadMsgCount": function () {
            uexEasemob.resetAllUnreadMsgCount();
            UNIT_TEST.assert(true);
        },
        "getMsgCount": function () {
            uexEasemob.getMsgCount({
                username: receiveUsername
            }, function (data) {
                UNIT_TEST.log("消息总数:" + data.msgCount);
                UNIT_TEST.assert(true);
            });
        },
        "clearConversation": function () {
            uexEasemob.clearConversation({
                username: receiveUsername
            });
            UNIT_TEST.assert(true);
        },
        "deleteConversation": function () {
            uexEasemob.deleteConversation({
                username: receiveUsername,
                chatType: 0
            });
            UNIT_TEST.assert(true);
        },
        "removeMessage": function () {
            uexEasemob.removeMessage({
                username: receiveUsername,
                msgId: "",
                chatType: 0
            });
            UNIT_TEST.assert(true);
        },
        "deleteAllConversation": function () {
            uexEasemob.deleteAllConversation();
            UNIT_TEST.assert(true);
        },
        "getChatterInfo": function () {
            alert("请用ylt1 任意发送几条消息");
            uexEasemob.getChatterInfo(function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assert(true);
            });
        },
        "getTotalUnreadMsgCount": function () {
            uexEasemob.getTotalUnreadMsgCount(function (data) {
                UNIT_TEST.log("未读消息总数:" + data.count);
                UNIT_TEST.assert(true);
            });
        },
        "getRecentChatters": function () {
            uexEasemob.getRecentChatters(function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assert(true);
            });
        },
        "getContactUserNames": function () {
            uexEasemob.getContactUserNames(function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assert(true);
            });
        },
        "deleteContact": function () {
            uexEasemob.deleteContact({
                username: receiveUsername
            });
            UNIT_TEST.assert(true);
        },
        "addContact": function () {
            uexEasemob.addContact({
                toAddUsername: receiveUsername,
                reason: "test 。。。。"
            });
            UNIT_TEST.assert(true);
        },
        "refuseInvitation": function () {
            alert("请发送好友请求");
            uexEasemob.refuseInvitation({
                username: receiveUsername,
                reason: "任性"
            });
            UNIT_TEST.assert(true);
        },
        "acceptInvitation": function () {
            uexEasemob.acceptInvitation({
                username: receiveUsername
            });
            UNIT_TEST.assert(true);
        },
        "addUserToBlackList": function () {
            uexEasemob.addUserToBlackList({
                username: receiveUsername
            });
            UNIT_TEST.assert(true);
        },
        "getBlackListUsernames": function () {
            uexEasemob.getBlackListUsernames(function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assert(true);
            });
        },
        "deleteUserFromBlackList": function () {
            uexEasemob.deleteUserFromBlackList({
                username: receiveUsername
            });
            UNIT_TEST.assert(true);
        },
        "createPublicGroup": function () {
            uexEasemob.createPublicGroup({
                "groupName": "PublicGroup",
                "desc": "test group",
                "needApprovalRequired": "true"
            });
            UNIT_TEST.assertDelay(true,2000);//延时创建私有群
        },
        "createPrivateGroup": function () {
            uexEasemob.createPrivateGroup({
                "groupName": "PrivateGroup",
                "desc": "test group",
                "allowInvite": "true"
            });
            UNIT_TEST.assert(true);
        },

        "addUsersToGroup": function () {
            uexEasemob.addUsersToGroup({
                "isGroupOwner": "true",
                "groupId": publicGroupId,
                "newmembers": [receiveUsername, "ylt3"]
            });
            UNIT_TEST.assert(true);
        },
        "removeUserFromGroup": function () {
            uexEasemob.removeUserFromGroup({
                groupId: publicGroupId,
                username: receiveUsername
            });
            UNIT_TEST.assert(true);
        },
        "exitFromGroup": function () {
            uexEasemob.exitFromGroup({
                groupId:"1429270913587"//ylt1创建的群
            });
            UNIT_TEST.assert(true);
        },
        "joinGroup": function () {
            uexEasemob.joinGroup({
                groupId: "1429270913587"//
            });
            UNIT_TEST.assert(true);
        },
        "getGroupsFromServer": function () {
            uexEasemob.getGroupsFromServer({
                "loadCache":"false"
            }, function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assertNotEqual(data, null);
            });
        },
        "getAllPublicGroupsFromServer": function () {
            uexEasemob.getAllPublicGroupsFromServer({
                pageSize:10,
                cursor:"15"
            }, function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assertNotEqual(data, null);
            });
        },
        "getGroup": function () {
            uexEasemob.getGroup({
                groupId:publicGroupId,
                loadCache:false
            }, function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assertNotEqual(data, null);
            });
        },
        "blockGroupMessage": function () {
            uexEasemob.blockGroupMessage({
                groupId:publicGroupId
            });
            UNIT_TEST.assert(true);
        },
        "unblockGroupMessage": function () {
            uexEasemob.unblockGroupMessage({
                groupId:publicGroupId
            });
            UNIT_TEST.assert(true);
        },
        "changeGroupName": function () {
            uexEasemob.changeGroupName({
                groupId:publicGroupId,//
                changedGroupName:"NewGroupName"//改变后的群组名称
            });
            UNIT_TEST.assert(true);
        },
        "blockUser": function () {
            uexEasemob.blockUser({
                groupId:publicGroupId,//
                username:receiveUsername
            });
            UNIT_TEST.assert(true);
        },
        "getBlockedUsers": function () {
            uexEasemob.getBlockedUsers({
                groupId:publicGroupId
            },function (data) {
                UNIT_TEST.log(JSON.stringify(data));
                UNIT_TEST.assert(true);
            });
        },
        "unblockUser": function () {
            uexEasemob.unblockUser({
                groupId:publicGroupId,//
                username:receiveUsername
            });
            UNIT_TEST.assert(true);
        },

        "acceptJoinApplication": function () {
            uexEasemob.acceptJoinApplication({
                groupId:publicGroupId,//
                username:receiveUsername
            });
            UNIT_TEST.assert(true);
        },
        "declineJoinApplication": function () {
            uexEasemob.declineJoinApplication({
                groupId:publicGroupId,//
                username:receiveUsername,
                reason:"XXXXX"
            });
            UNIT_TEST.assert(true);
        },
        "acceptInvitationFromGroup": function () {
            uexEasemob.acceptInvitationFromGroup({
                groupId:publicGroupId,//
                username:receiveUsername
            });
            UNIT_TEST.assert(true);
        },
        "declineInvitationFromGroup": function () {
            uexEasemob.declineInvitationFromGroup({
                groupId:publicGroupId,//
                username:receiveUsername,
                reason:"XXXXX"
            });
            UNIT_TEST.assert(true);
        },
        "exitAndDeleteGroup": function () {
            uexEasemob.exitAndDeleteGroup({
                groupId:publicGroupId
            });
            UNIT_TEST.assert(true);
        },
        "makeVoiceCall": function () {
            uexEasemob.makeVoiceCall({
                username:receiveUsername
            });
            UNIT_TEST.assertDelay(true,2000);
        },
        "endCall": function () {
            uexEasemob.endCall();
            UNIT_TEST.assert(true);
        },
        "answerCall": function () {
            alert("请拨打电话后点确定");
            uexEasemob.answerCall();
            UNIT_TEST.assert(true);
        },
        "rejectCall": function () {
            alert("请拨打电话后点确定");
            uexEasemob.rejectCall();
            UNIT_TEST.assert(true);
        }
    };

    UNIT_TEST.addCase("Easemob", uexEasemobCase);
}
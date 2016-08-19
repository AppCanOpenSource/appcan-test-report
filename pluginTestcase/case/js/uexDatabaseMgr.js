/**
 * Created by ylt on 16/8/18.
 */
if (UNIT_TEST) {
    var uexDatabaseMgrCase = {
        "open" : function() {
            var db = appcan.database.open("demo");
            if (db != null) {
                db.close();
            }
            UNIT_TEST.assertNotEqual(db, 0);
        },
        "createTable" : function() {
            var db = appcan.database.open("demo");
            db && db.exec("CREATE TABLE testTable (_id  INTEGER PRIMARY KEY,name TEXT)", function(error, data) {
                UNIT_TEST.log("CREATE TABLE:" + error + "--" + data);
                db.close();
                UNIT_TEST.assert(!error);
            })
            !db && UNIT_TEST.assert(false);
        },
        "insert" : function() {
            var db = appcan.database.open("demo");
            // db && db.exec("insert into testTable (_id,text) VALUES ("+(new Date()).valueOf()+",'this is a case')", function(error, data) {
            db && db.exec("INSERT INTO testTable (name) VALUES ('this is a case insert')", function(error, data) {

                UNIT_TEST.log("INSERT INTO:" + error + "--" + data);
                db.close();
                UNIT_TEST.assert(!error);
            })
            !db && UNIT_TEST.assert(false);
        },
        "query" : function() {
            var db = appcan.database.open("demo");
            db && db.select("select * from testTable", function(error, data) {
                UNIT_TEST.log("QUERY :" + error + "--" + JSON.stringify(data));
                db.close();
                UNIT_TEST.assert(!error);
            })
            !db && UNIT_TEST.assert(false);
        },
        "delete" : function() {
            var db = appcan.database.open("demo");
            db && db.exec("delete from testTable", function(error, data) {
                UNIT_TEST.log("DELETE FROM: " + error + "--" + data);
                db.close();
                UNIT_TEST.assert(!error);
            })
            !db && UNIT_TEST.assert(false);
        },
        "transaction" : function() {
            var db = appcan.database.open("demo");
            var sql = ["DROP TABLE testTable", "CREATE TABLE testTable (_id  INTEGER PRIMARY KEY,name TEXT)", "insert into testTable (name) VALUES ('this is a case--1')", "UPDATE testTable SET name='这是更改' WHERE name = 'this is a case--1'"];
            db.transaction(JSON.stringify(sql), function(error, data) {
                UNIT_TEST.log("TRANSACTION RESULT:" + error + "--" + data);
                db.close();
                UNIT_TEST.assert(!error);
            })
            !db && UNIT_TEST.assert(false);
        },
        "check" : function() {
            var db = appcan.database.open("demo");
            db && db.select("select * from testTable", function(error, data) {
                UNIT_TEST.log("QUERY :" + error + "--" + JSON.stringify(data));
                db.close();
                UNIT_TEST.assert(!error && data[0].name == "这是更改");
            })
            !db && UNIT_TEST.assert(false);
        },
        "dropTable" : function() {
            var db = appcan.database.open("demo");
            db && db.exec("DROP TABLE testTable", function(error, data) {
                UNIT_TEST.log("DROP TABLE:" + error + "--" + data);
                db.close();
                UNIT_TEST.assert(!error);
            })
            !db && UNIT_TEST.assert(false);
        }
    }
    UNIT_TEST.addCase("db", uexDatabaseMgrCase);
}
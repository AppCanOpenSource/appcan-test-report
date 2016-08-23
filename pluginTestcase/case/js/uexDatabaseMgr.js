/**
 * Created by ylt on 16/8/18.
 */
if (UNIT_TEST) {
    var uexDatabaseMgrCase = {
        "open" : function() {
            var db = uexDataBaseMgr.open("demo");
            if (db != null) {
                uexDataBaseMgr.close(db);
            }
            UNIT_TEST.assertNotEqual(db, null);
        },
        "sql":function () {
            var db = uexDataBaseMgr.open("demo");
            if (db != null) {
                var sql = "CREATE TABLE testTable (_id  INTEGER PRIMARY KEY,name TEXT)";
                uexDataBaseMgr.sql(db,sql, function(error) {
                    if (!error) {
                        UNIT_TEST.assert(true);
                    }else{
                        UNIT_TEST.assert(false);
                    }
                    uexDataBaseMgr.close(db);
                });
            }else{
                UNIT_TEST.assert(false);
            }
        },
        "select":function () {
            var db = uexDataBaseMgr.open("demo");
            if (db != null) {
                var sql = "SELECT * FROM testTable";
                uexDataBaseMgr.select(db,sql, function (error,data) {
                    if (error) {
                        UNIT_TEST.assert(false);
                    } else {
                        UNIT_TEST.log(JSON.stringify(data));
                        UNIT_TEST.assert(true);
                    }
                    uexDataBaseMgr.close(db);
                });
            }else{
                UNIT_TEST.assert(false);
            }
        },
        "transactionEx":function () {
            var db = uexDataBaseMgr.open("demo");
            if (db != null) {
                var sqls=[
                    "DROP TABLE testTable",
                    "CREATE TABLE testTable (_id INTEGER PRIMARY KEY,name TEXT)",
                    "INSERT INTO testTable (name) VALUES ('this is a case')",
                    "UPDATE testTable SET name='这是更改' WHERE _id = 1"
                ];
                uexDataBaseMgr.transactionEx(db,JSON.stringify(sqls), function(error) {
                    if (!error){
                        var sql = "SELECT * FROM testTable";
                        uexDataBaseMgr.select(db,sql, function (error,data) {
                            if (error) {
                                UNIT_TEST.assert(false);
                            } else {
                                UNIT_TEST.log(JSON.stringify(data));
                                UNIT_TEST.assert(true);
                            }
                            uexDataBaseMgr.close(db);
                        });
                    }else {
                        UNIT_TEST.assert(false);
                        uexDataBaseMgr.close(db);
                    }
                    
                });
            }else{
                UNIT_TEST.assert(false);
            }
        },
        "close":function () {
            var db = uexDataBaseMgr.open("demo");
            if (db != null) {
                uexDataBaseMgr.sql(db,"DROP TABLE testTable", function(error) {
                                    if (!error) {
                                        UNIT_TEST.assert(true);
                                    }else{
                                        UNIT_TEST.assert(false);
                                    }
                                    var result = uexDataBaseMgr.close(db);
                                    UNIT_TEST.assertTrue(result);
                                });
                
            }else{
                UNIT_TEST.assert(false);
            }
        }

    }
    UNIT_TEST.addCase("db", uexDatabaseMgrCase);
}
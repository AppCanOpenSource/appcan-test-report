if(UNIT_TEST){
    var uexDocumentReaderCase = {
        "openDocumentReader":function(){
           uexDocumentReader.openDocumentReader("res://Doc Document.doc");
            UNIT_TEST.assertDelay(true);
        }
    }
    UNIT_TEST.addCase("documentReader",uexDocumentReaderCase);
}
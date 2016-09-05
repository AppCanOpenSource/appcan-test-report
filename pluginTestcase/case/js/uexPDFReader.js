if(UNIT_TEST){
    var uexPDFReaderCase = {
        "open" : function(){
            var file = "res://PDFDocument.pdf"
            uexPDFReader.openPDFReader(file);
            UNIT_TEST.assertTrue(true);
        },
        "close" : function(){
            uexPDFReader.close();
            UNIT_TEST.assertTrue(true);
        }
    }
    UNIT_TEST.addCase("pdfReader",uexPDFReaderCase);
}
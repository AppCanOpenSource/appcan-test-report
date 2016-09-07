if(UNIT_TEST){
    var uexEmailCase = {
        "open":function(){
            var email = "ygcutter@126.com";
            var subject = "测试邮件";
            var content = "我是邮件";
            var attachmentPath = "res://PDFDocument.pdf";
            var mimeType = "application/pdf";
            uexEmail.open(email, subject, content,attachmentPath,mimeType);
            UNIT_TEST.assert(true);
        }
    }
    UNIT_TEST.addCase("email",uexEmailCase);
}
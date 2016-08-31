if(UNIT_TEST){
    var uexClipboardCase = {};
    var testContent = "正益移动";
    uexClipboardCase.copy = function () {
        uexClipboard.copy(testContent);
        UNIT_TEST.assert(true);
    }
    uexClipboardCase.getContent = function() {
        var data = uexClipboard.getContent();
        if (data == testContent) {
            UNIT_TEST.log("[data]" + data);
            UNIT_TEST.assert(true);
        } else {
            UNIT_TEST.assert(false);
        }
    }

   UNIT_TEST.addCase("clipboardCase", uexClipboardCase);
}

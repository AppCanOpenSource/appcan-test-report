/*Auto generate by UI designer */
(function($) {
    appcan.button("#nav-left", "btn-act", function() {
    });
    appcan.button("#nav-right", "btn-act", function() {
    });

})($);

function openTestCase(plugin){
    appcan.window.open("case", "case/unittest.html?"+plugin, 1);
}
function openManualTest(type, name){
    if(type == 0){
        uexWindow.open(name, 0, name + ".html",0,0,0,0);
    }else{
        uexWindow.open(name, 0, "case/manualtest/" + name + "/index.html",0,0,0,0);
    }
}
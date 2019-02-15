var _runsIntern = true;
var ADTGEKID =
{
    show : function() {
        if(_runsIntern) {
            CtxJsApi.openPopupWindow(500, 225,'../plugins/export-example/index.html');
            
            /*
            CtxJsApi.openPopupWindow(500, 225, '--URL--');                  // modal dialogue - URL is for internal plugins always relative (../plugins/[plugin-name] from ini])
            CtxJsApi.openLeftWindow (1000, 900, '--Name--', '--URL--');     // Tab left
            CtxJsApi.openRightWindow(1000, 900, '--Name--', '--URL--');     // Tab right
            CtxJsApi.openHiddenWindow('--URL--');                           // without window
            */
            
            
        } else {
            CtxJsApi.openPopupWindow(500, 225,'/export-example/index.html');
        }
    }
};

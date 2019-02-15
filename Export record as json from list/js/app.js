var requestid = 0,
    userData = {},
    sSel = '';

/**
** Login with active user and save user handle in public var
**/
function iLoginUPD() {
    requestid++;
    var oLogin = {
        "method": "getLogin",
        "requestid": requestid,
        "param": {
            "pass": top.getCookie('PHPSESSID'),
            "app": "Uniplex"
        }
    };

    if (typeof userData.UpdJsrHdl == 'undefined') {
        $.post("/i/UniPlex/source/updjsr.php", JSON.stringify(oLogin))
            .done(function (retData) {
                if (retData.requesterror == 0) {
                    userData = retData.result.data;
                    if( (typeof retData.result.data != 'undefined') &&  (typeof retData.result.data.UpdJsrHdl != 'undefined') ) {
						var aListData = getListDefs();
                    }
                }
            });
    }
}

/**
** request UniplexDataservice (UniplexAPI) with request object and callback
** starts a callback with return object and error code
**/
function requestUPD(oRecSel, callback) {
	var ret = {};
	var error = 0;
	$.post("/i/UniPlex/source/updjsr.php", JSON.stringify(oRecSel))
		.done(function (retRecord) {
		
			if (retRecord.requesterror != 0) {
				ret = retRecord;
				error = retRecord.requesterror;
			} else {
				if (retRecord.result.error == 0) {
					ret = retRecord.result.data;
				} else {
					ret = retRecord.result;
					error = retRecord.result.error;
				}
			}
			callback(ret,error);
		});
}

/**
** get all list names and store them to select box
**/
function getListDefs() {

    requestid++;
    var oRecSel = {
	  "method": "getListdefList",
	  "requestid": requestid,
	  "param": {
		"UpdJsrHdl": userData.UpdJsrHdl
	  }
	};
	
	requestUPD(oRecSel, function(aListData, error) {
		if( (error == 0) && (typeof aListData === 'object') && (aListData.length > 0) ) {
			var $dropdown = $("#listSelect");
			$.each(aListData, function() {
				$dropdown.append($("<option />").val(this.i).text(this.n));
			});
		} else {
			$("#error_text").html('Error: ' + error);
		}
	});		
}

/**
** load a list with data from IID and returns it as json file for download
**/
function loadDataInList(IId) {

    requestid++;
    var sListName = $("#listSelect option:selected").text();
    var oRecSel = {
	  "method": "Select",
	  "requestid": requestid,
	  "param": {
		"select": {
		  "!IID": sSel
		},
		"list": {
		  "f": [],
		  "s": []
		},
		"list_name": sListName,
		"maxtime": 5,
		"maxcount": 1000,
		"keep_select": 1,
		"UpdJsrHdl": userData.UpdJsrHdl
	  }
	};
	
	requestUPD(oRecSel, function(aListData, error) {
		if( (error == 0) && (typeof aListData === 'object')) {
			var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(aListData));
			var dlAnchorElem = document.getElementById('downloadAnchorElem');
			dlAnchorElem.setAttribute("href", dataStr);
			dlAnchorElem.setAttribute("download", sListName + "-export.json");
			dlAnchorElem.click();
		} else {
			$("#error_text").html('Error: ' + error);
		}
	});	
}

/**
** init the plugin
** checks for open list and checks for selected IId
** 
**/
function jsInit() {
    var iWinId = top.objRightContainer.getSelectedWinID(); 	// get windows ID for right hand side tab
    var oWin = null;

    if (iWinId >= 0) {
        oWin = top.objRightContainer.getObjHandle(iWinId); 	// get window handle for right hand side tab
    } else {
        top.ctxAlert({
            message: 'There is no opened list.',
            forceText: true,
            type: 'error'
        });
        jsCloseTool();
        return;
    }

    if ((oWin !== null) && 									// If windows handle existing and a loaded list is inside
        (typeof oWin === 'object') &&
        (typeof oWin.objZgbList === 'object') &&
        (typeof oWin.objZgbList.getSelectedIds === 'function')
    ) {
        sSel = oWin.objZgbList.getSelectedIds(1).join(''); 	// get first IID of all selected records
        iLoginUPD();										// do login with UniplexDataservice (UniplexAPI)
    }

    if (sSel.length === 0) 									// If IId is 0, then show closing dialogue
    {
        top.ctxAlert({
            message: 'No record in list was selected.',
            forceText: true,
            type: 'error'
        });
        jsCloseTool();
        return;
    }
}

function jsCloseTool() {
    top.closePopupWin();
}

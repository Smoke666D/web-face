var connetStatus = 0;
//******************************************************************************
function setSuccessConnection () {
	if ( electronApp == 1 ) {
		var obj = document.getElementById( 'modalConnect-button' );
		if ( !( obj.classList.contains( 'btn-success' ) ) ) {
			obj.classList.remove( 'btn-primary' );
			obj.classList.add( 'btn-success' );
		}
		document.getElementById( 'refreshData-button' ).disabled           = false;
		document.getElementById( 'uploadData-button' ).disabled            = false;
		document.getElementById( 'setupPassword' ).disabled                = false;
		document.getElementById( 'write-engineWorkTimeData' ).disabled     = false;
		document.getElementById( 'write-engineStartsNumberData' ).disabled = false;
		document.getElementById( 'write-fuelUsageData' ).disabled          = false;
		document.getElementById( 'write-fuelRateData' ).disabled           = false;
		document.getElementById( 'write-powerFullUsage' ).disabled         = false;
		document.getElementById( 'write-powerActiveUsage' ).disabled       = false;
		document.getElementById( 'write-powerReactiveUsage' ).disabled     = false;
		document.getElementById( 'controllerTimeSetup' ).disabled          = false;
		document.getElementById( 'eraseLog-button' ).disabled              = false;
		document.getElementById( 'saveLog-buton' ).disabled                = false;
		document.getElementById( 'refreshMeasure-button' ).disabled        = false;
		document.getElementById( 'measureSave-button' ).disabled           = false;
		document.getElementById( 'measureErase-button' ).disabled          = false;
	}
	connetStatus = 1;
	return;
}
//******************************************************************************
function resetSuccessConnection () {
	if ( electronApp == 1 ) {
		var obj = document.getElementById( 'modalConnect-button' );
		if ( obj.classList.contains( 'btn-success' ) ) {
			obj.classList.remove( 'btn-success' );
			obj.classList.add( 'btn-primary' );
		}
		document.getElementById( 'refreshData-button' ).disabled           = true;
		document.getElementById( 'uploadData-button' ).disabled            = true;
		document.getElementById( 'setupPassword' ).disabled                = true;
		document.getElementById( 'write-engineWorkTimeData' ).disabled     = true;
		document.getElementById( 'write-engineStartsNumberData' ).disabled = true;
		document.getElementById( 'write-fuelUsageData' ).disabled          = true;
		document.getElementById( 'write-fuelRateData' ).disabled           = true;
		document.getElementById( 'write-powerFullUsage' ).disabled         = true;
		document.getElementById( 'write-powerActiveUsage' ).disabled       = true;
		document.getElementById( 'write-powerReactiveUsage' ).disabled     = true;
		document.getElementById( 'controllerTimeSetup' ).disabled          = true;
		document.getElementById( 'eraseLog-button' ).disabled              = true;
		document.getElementById( 'refreshMeasure-button' ).disabled        = true;
		document.getElementById( 'measureSave-button' ).disabled           = true;
		document.getElementById( 'measureErase-button' ).disabled          = true;
		document.getElementById( 'flash-load' ).disabled                   = true;
		document.getElementById( 'flash-file' ).disabled                   = true;
	}
	connetStatus = 0;
	return;
}
//******************************************************************************
function getConnectionStatus () {
	return connetStatus;
}
//******************************************************************************
module.exports.setSuccessConnection   = setSuccessConnection;
module.exports.resetSuccessConnection = resetSuccessConnection;
module.exports.getConnectionStatus    = getConnectionStatus;

var connetStatus = 0;
//******************************************************************************
function setSuccessConnection() {
	if ( electronApp == 1 ) {
		var obj = document.getElementById( 'modalConnect-button' );
		if ( !( obj.classList.contains( 'btn-success' ) ) ) {
			obj.classList.remove( 'btn-primary' );
			obj.classList.add( 'btn-success' );
		}
		document.getElementById( 'refreshData-button' ).disabled = false;
		document.getElementById( 'uploadData-button' ).disabled = false;
    if ( connectionType == 'usb' ){
      document.getElementById( 'flash-file' ).disabled = false;
    }
	}
	connetStatus = 1;
	return;
}
//******************************************************************************
function resetSuccessConnection() {
	if ( electronApp == 1 ) {
		var obj = document.getElementById( 'modalConnect-button' );
		if ( obj.classList.contains( 'btn-success' ) ) {
			obj.classList.remove( 'btn-success' );
			obj.classList.add( 'btn-primary' );
		}
		document.getElementById( 'refreshData-button' ).disabled = true;
		document.getElementById( 'uploadData-button' ).disabled = true;
		document.getElementById( 'flash-load' ).disabled = true;
		document.getElementById( 'flash-file' ).disabled = true;
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

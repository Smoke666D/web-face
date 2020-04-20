const usb    = require('./js/usb.js');
const rest   = require('./js/rest.js');
const main   = require('./js/main.js');
//******************************************************************************
function connectUpdate() {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    ethDataUpdate(function() {
      resetSuccessConnection();
    });
  } else if ( connectionType == 'usb' ) {
    usb.controller.getConfig( 0xFFFF, function() {
      console.log("USB send");
      return;
    });
  }
  return;
}
//******************************************************************************
function connectGrab() {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    dataGrab( function() {
      resetSuccessConnection();
      return;
    });
  } else if ( connectionType == 'usb' ) {
    usb.controller.sendConfig( 0xFFFF, function () {
      console.log("USB finish sending");
      return;
    });
  }
  return;
}
//******************************************************************************

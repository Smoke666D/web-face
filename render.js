
const remote = require('electron').remote;
var HID      = require('node-hid');
var usb      = require('./js/usb.js');
var main     = require('./js/main.js');
var rest     = require('./js/rest.js');
/*----------------------------------------------------------------------------*/
document.getElementById("min-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.minimize();
});
document.getElementById("max-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  if (!window.isMaximized()) {
    window.maximize();
  } else {
    window.unmaximize();
  }
});
document.getElementById("close-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.close();
});
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
let controller = new usb.EnrrganController();

if ( main.electronApp == 1) {
  if ( main.connectionType == 'usb' ) {
    if ( controller.scan() ) {
      controller.getConfig( 0xFFFF );
      console.log("USB write");
    }
  } else if ( main.connectionType == 'eth' ) {
    controller.close();
  }
}

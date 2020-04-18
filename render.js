
const remote = require('electron').remote;
var HID      = require('node-hid');
var usb      = require('./js/usb.js');
var main     = require('./js/main.js');
var rest     = require('./js/rest.js');
var alerts   = require('./js/alerts.js');
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

function parseConfigFromMsg( msg ){
  console.log( msg );
  return;
}

function error() {
  console.log("Error!!!");
}

function verifyIP( input ) {
  errorString   = "";
  theName       = "IPaddress";
  var ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  var ipArray   = input.match(ipPattern);
  if ( input == "0.0.0.0" ) {
    errorString = errorString + theName + ': '+ input + ' это специальный IP адрес и не может быть использован.';
  } else if ( input == "255.255.255.255" ) {
    errorString = errorString + theName + ': ' + input + ' это специальный IP адрес и не может быть использован.';
  }
  if (ipArray == null) {
    errorString = errorString + theName + ': ' + input + ' не допустимый IP адрес.';
  } else {
    for ( i=0; i<4; i++ ) {
      thisSegment = ipArray[i];
      if (thisSegment > 255) {
        errorString = errorString + theName + ': ' + input + ' не допустимый IP адрес.';
        i = 4;
      }
      if ( ( i == 0 ) && ( thisSegment > 255 ) ) {
        errorString = errorString + theName + ': ' + input + ' это специальный IP адрес и не может быть использован.';
        i = 4;
      }
    }
  }
  extensionLength = 3;
  return errorString
}

document.getElementById("connect-button").addEventListener('click', function() {
  if ( main.electronApp == 1) {
    resetSuccessConnection();
    /*--------------------------------------------------------------*/
    /*---------------------------- USB -----------------------------*/
    /*--------------------------------------------------------------*/
    if ( connectionType == 'usb' ) {
      controller.close();
      res = controller.scan( function() {
        /* After getting full message */
        var buffer = [];
        console.log("USB get");
        buffer = controller.getInputBuffer();
        for ( var i=0; i<buffer.length; i++) {
          buffer[i].init( function( msg ) {
            buffer[i].parseConfig( i );
          });
        }
      });
      if ( res == 1 ) {
        setSuccessConnection();
        controller.getConfig( 0xFFFF, function() {
          console.log("USB send");
        });
      }
    /*--------------------------------------------------------------*/
    /*-------------------------- ETHERNET --------------------------*/
    /*--------------------------------------------------------------*/
    } else if ( connectionType == 'eth' ) {
      controller.close();
      ipInput = document.getElementById("input-ipaddress");
      ipAdr   = ipInput.value;
      res     = verifyIP( ipAdr.toString() );
      if ( res == "" ) {
        setSuccessConnection();
        dataUpdate( function() {
          resetSuccessConnection();
        });
      } else {
        ipInput.value = "";
        let alert = new alerts.Alert( "alert-warning", alerts.triIco, res );
      }
    }
  }
});

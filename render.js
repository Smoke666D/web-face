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
//slet controller = new usb.EnrrganController();

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


document.getElementById("disconnect-button").addEventListener('click', function() {
  if ( main.electronApp == 1) {
    resetSuccessConnection();
    usb.controller.close();
  }
});

document.getElementById("connect-button").addEventListener('click', function() {
  if ( main.electronApp == 1) {
    resetSuccessConnection();
    /*--------------------------------------------------------------*/
    /*---------------------------- USB -----------------------------*/
    /*--------------------------------------------------------------*/
    if ( connectionType == 'usb' ) {
      usb.controller.close();
      out = [];
      charts = [];
      res = usb.controller.init( function() {
        /* After getting full message */
        var buffer = [];
        buffer = usb.controller.getInput();
        for ( var i=0; i<buffer.length; i++) {
          buffer[i].init( function() {
            out = buffer[i].parse( i );
            if ( out[0] == 2 ) {
              charts.push( out[1] );
              out = [];
            }
          });
        }
        loadCharts( charts );
        charts = [];
        let alert = new alerts.Alert( "alert-success", alerts.okIco, "Данные успешно обновленны" );
        updateInterface();
      }, function() {
        let alert = new alerts.Alert( "alert-success", alerts.okIco, "Прибор успешно сконфигурирован" );
      }, function() {
        let alert = new alerts.Alert( "alert-warning", alerts.triIco, "Ошибка передачи данных по USB" );
      });
      if ( res == 1 ) {
        setSuccessConnection();
        usb.controller.receive();
      }
    /*--------------------------------------------------------------*/
    /*-------------------------- ETHERNET --------------------------*/
    /*--------------------------------------------------------------*/
    } else if ( connectionType == 'eth' ) {
      usb.controller.close();
      ipInput = document.getElementById("input-ipaddress");
      ipAdr   = ipInput.value;
      res     = verifyIP( ipAdr.toString() );
      if ( res == "" ) {
        setSuccessConnection();
        ethDataUpdate( function() {
          resetSuccessConnection();
        });
      } else {
        ipInput.value = "";
        let alert = new alerts.Alert( "alert-warning", alerts.triIco, res );
      }
    }
  }
});

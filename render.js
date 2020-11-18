const remote = require('electron').remote;
var HID      = require('node-hid');
var usb      = require('./js/usb.js');
var rest     = require('./js/rest.js');
var alerts   = require('./js/alerts.js');

const USBMessage    = require('./js/usb-message.js').USBMessage;
const USB_DATA_SIZE = require('./js/usb-message.js').USB_DATA_SIZE;
const USB_CHART_HEADER_LENGTH = require('./js/usb-message.js').USB_CHART_HEADER_LENGTH;
const USB_DATA_BYTE = require('./js/usb-message.js').USB_DATA_BYTE;
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
  resetSuccessConnection();
  usb.controller.close();
});

document.getElementById("connect-button").addEventListener('click', function() {
  resetSuccessConnection();
  /*--------------------------------------------------------------*/
  /*---------------------------- USB -----------------------------*/
  /*--------------------------------------------------------------*/
  if ( connectionType == 'usb' ) {
    var msg = null;
    usb.controller.close();
    out    = [];
    charts = [];
    res    = usb.controller.init( function() {
      /* After getting full message */
      var buffer = [];
      buffer = usb.controller.getInput();
      for ( var i=0; i<buffer.length; i++) {
        buffer[i].init( function() {
          if ( buffer[i].length > USB_DATA_SIZE ) {
            if ( buffer[i].adr != buffer[i-1].adr ) {
              msg = new USBMessage( buffer[i].buffer );
              msg.initLong();
            } else {
              for ( var j=USB_DATA_BYTE; j<buffer[i].buffer.length; j++ ) {
                msg.addLong( buffer[i].buffer[j] );
              }
              if ( msg != null ) {
                if ( msg.data.length >= msg.length ) {
                  out = msg.parse();
                  if ( out[0] == 2 ) {
                    charts.push( out[1] );
                    out = [];
                  }
                }
              }
            }
          } else {
            out = buffer[i].parse();
            if ( out[0] == 3 ) {
              rtcTime.get( out[1] );
            }
            if ( out[0] == 4 ) {
              freeDataValue[buffer[i].adr] = out[1];
            }
            if ( out[0] == 5 ) {
              logArray[buffer[i].adr] = out[1];
            }
          }
        });
      }
      if ( charts.length == 3 ) {
        loadCharts( charts );
      }
      charts = [];
      let alert = new alerts.Alert( "alert-success", alerts.okIco, "Данные успешно обновленны" );
      updateInterface();
    /* outCallback */
    }, function() {
      let alert = new alerts.Alert( "alert-success", alerts.okIco, "Данные успешно переданы", 1 );
    /* errorCalback */
    }, function() {
      let alert = new alerts.Alert( "alert-warning", alerts.triIco, "Ошибка передачи данных по USB" );
      resetSuccessConnection();
    /* unauthorizedCallback */
    }, function() {
      let alert = new alerts.Alert( "alert-warning", alerts.triIco, "Ошибка авторизации" );
    /* Forbidden callback*/
    }, function() {
      let alert = new alerts.Alert( "alert-warning", alerts.triIco, "Установка не остановлена. Доступ запрещен" );
    });
    if ( res == 1 ) {
      setSuccessConnection();
      connectUpdate();
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
      connectUpdate();
    } else {
      ipInput.value = "";
      let alert = new alerts.Alert( "alert-warning", alerts.triIco, res );
    }
  }
});

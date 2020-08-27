const usb    = require('./js/usb.js');
const rest   = require('./js/rest.js');
const alerts = require('./js/alerts.js');
//******************************************************************************
function connectUpdate () {
  let alert = new Alert( "alert-warning", triIco, "Загрузка", 1 );
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    ethDataUpdate( alert, function () {
      resetSuccessConnection();
    });
  } else if ( connectionType == 'usb' ) {
    usb.controller.receive( alert );
  }
  return;
}
//******************************************************************************
function connectGrab () {
  let alert = new Alert( "alert-warning", triIco, "Загрузка", 1 );
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    dataGrab( alert, function () {
      resetSuccessConnection();
      return;
    });
  } else if ( connectionType == 'usb' ) {
      usb.controller.send( alert );
  }
  return;
}
function writeTime () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    writeTimeEth();
  } else if ( connectionType == 'usb' ) {
    usb.controller.sendTime();
  }
  return;
}
//******************************************************************************
var typeIpLastLen = 0;
var typeIpDir     = "write";
function ipv4AdrMask () {
  document.getElementById( 'input-ipaddress' ).addEventListener( 'input', function() {
    var str = this.value;
    if ( typeIpLastLen < str.length ) {
      typeIdDir = "write";
    } else {
      typeIdDir = "back";
    }
    typeIpLastLen = str.length;
    if ( typeIdDir == "write" ) {
      var ch = str[str.length - 1];
      if ((ch != '.')&&(ch != '0')&&(ch != '1')&&(ch != '2')&&(ch != '3')&&(ch != '4')&&(ch != '5')&&(ch != '6')&&(ch != '7')&&(ch != '8')&&(ch != '9')) {
        str = str.slice( 0, ( str.length - 1 ) );
        typeIpLastLen = str.length;
      }
      if (str.length > 15) {
        str = str.slice(0,(str.length-1));
        typeIpLastLen = str.length;
      }
    }
    this.value = str;
  });
  return;
}
//******************************************************************************

const usb    = require('./js/usb.js');
const rest   = require('./js/rest.js');
const main   = require('./js/main.js');
//******************************************************************************
function connectUpdate () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    ethDataUpdate( function () {
      resetSuccessConnection();
    });
  } else if ( connectionType == 'usb' ) {
    usb.controller.receive();
  }
  return;
}
//******************************************************************************
function connectGrab () {
  if ( ( electronApp == 0 ) || ( connectionType == 'eth' ) ) {
    dataGrab( function () {
      resetSuccessConnection();
      return;
    });
  } else if ( connectionType == 'usb' ) {
      usb.controller.send();
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
      if ((str.length!=4)&&(str.length!=8)&&(str.length!=12)&&(ch != '0')&&(ch != '1')&&(ch != '2')&&(ch != '3')&&(ch != '4')&&(ch != '5')&&(ch != '6')&&(ch != '7')&&(ch != '8')&&(ch != '9')) {
        str = str.slice( 0, ( str.length - 1 ) );
        typeIpLastLen = str.length;
      }
      if (str.length > 15) {
        str = str.slice(0,(str.length-1));
        typeIpLastLen = str.length;
      }
      if (( str.length == 3 ) || ( str.length == 7 ) || ( str.length == 11 )) {
        str += '.';
      }
      if ((str.length > 3) && (str[3] != '.')) {
        str = str.substring(0,3)+'.'+str.substring(4,str.length);
      }
      if ((str.length > 7) && (str[7] != '.')) {
        str = str.substring(0,7)+'.'+str.substring(8,str.length);
      }
      if ((str.length > 11) && (str[11] != '.')) {
        str = str.substring(0,11)+'.'+str.substring(12,str.length);
      }
    }
    this.value = str;
  });
  return;
}

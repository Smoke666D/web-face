//var rest = require('./js/rest.js');
var main   = require('./js/main.js');
var render = require('./render.js');

document.onkeyup = function( evt ) {
  if ( evt.ctrlKey == true ) {
    switch ( parseInt(evt.which) ) {
      case '0'.charCodeAt(0):
        break;
      case '1'.charCodeAt(0):
        // CONNECT via USB
        setConnect('usb');
        render.connect();
        break;
      case '2'.charCodeAt(0):
        // CONNECT via ETHERNET
        setConnect('eth')
        render.connect();
        break;
      case '3'.charCodeAt(0):
        break;
      case '4'.charCodeAt(0):
        break;
      case '5'.charCodeAt(0):
        break;
      case '6'.charCodeAt(0):
        break;
      case '7'.charCodeAt(0):
        break;
      case '8'.charCodeAt(0):
        break;
      case '9'.charCodeAt(0):
        break;

      case 'a'.charCodeAt(0):
        break;
      case 'b'.charCodeAt(0):
        break;
      case 'c'.charCodeAt(0):
        break;
      case 'd'.charCodeAt(0):
        // DOWMLOAD
        connectUpdate();
        break;
      case 'e'.charCodeAt(0):
        // ERASE LOG
        eraseLog();
        break;
      case 'f'.charCodeAt(0):
        break;
      case 'g'.charCodeAt(0):
        break;
      case 'h'.charCodeAt(0):
        break;
      case 'i'.charCodeAt(0):
        break;
      case 'j'.charCodeAt(0):
        // JOURNAL
        break;
      case 'k'.charCodeAt(0):
        break;
      case 'l'.charCodeAt(0):
        // LOAD
        loadConfigsFromFile();
        break;
      case 'm'.charCodeAt(0):
        // CONNECT menu
        break;
      case 'n'.charCodeAt(0):
        break;
      case 'o'.charCodeAt(0):
        break;
      case 'p'.charCodeAt(0):
        break;
      case 'q'.charCodeAt(0):
        break;
      case 'r'.charCodeAt(0):
        // RESET
        resetSettings();
        break;
      case 's'.charCodeAt(0):
        // SAVE
        saveConfigsToFile();
        break;
      case 't'.charCodeAt(0):
        break;
      case 'u'.charCodeAt(0):
        // UPLOAD
        connectGrab();
        break;
      case 'v'.charCodeAt(0):
        break;
      case 'w'.charCodeAt(0):
        break;
      case 'x'.charCodeAt(0):
        break;
      case 'y'.charCodeAt(0):
        break;
      case 'z'.charCodeAt(0):
        break;
    }

  }
  return;
}

window.onkeydown = function ( evt ) {
  // disable zooming
  if ((evt.code == "Minus" || evt.code == "Equal") && (evt.ctrlKey || evt.metaKey)) {evt.preventDefault()}
}

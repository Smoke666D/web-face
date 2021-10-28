var render = require('./render.js');
document.onkeyup = function( evt ) {
  if ( evt.ctrlKey == true ) {
    switch ( String.fromCharCode( parseInt(evt.which) ) ) {
      case '0':
        break;
      case '1':
        // CONNECT via USB
        setConnect('usb');
        render.connect();
        break;
      case '2':
        // CONNECT via ETHERNET
        setConnect('eth')
        render.connect();
        break;
      case '3':
        break;
      case '4':
        break;
      case '5':
        break;
      case '6':
        break;
      case '7':
        break;
      case '8':
        break;
      case '9':
        break;

      case 'A':
        break;
      case 'B':
        break;
      case 'C':
        break;
      case 'D':
        // DOWMLOAD
        if ( getConnectionStatus() > 0 ) {
          connectUpdate();
        }
        break;
      case 'E':
        // ERASE LOG
        if ( getConnectionStatus() > 0 ) {
          eraseLog();
        }
        break;
      case 'F':
        // authorization menu
        $("#authorizationModal").modal()
        break;
      case 'G':
        break;
      case 'H':
        break;
      case 'I':
        break;
      case 'J':
        // JOURNAL
        break;
      case 'K':
        break;
      case 'L':
        // LOAD
        loadConfigsFromFile();
        break;
      case 'M':
        break;
      case 'N':
        break;
      case 'O':
        break;
      case 'P':
        break;
      case 'Q':
        // CONNECT menu
        $("#connectionModal").modal()
        break;
      case 'R':
        // RESET
        resetSettings();
        break;
      case 'S':
        // SAVE
        saveConfigsToFile();
        break;
      case 'T':
        break;
      case 'U':
        // UPLOAD
        if ( getConnectionStatus() > 0 ) {
          connectGrab();
        }
        break;
      case 'V':
        break;
      case 'W':
        break;
      case 'X':
        break;
      case 'Y':
        break;
      case 'Z':
        break;
    }

  }
  return;
}

window.onkeydown = function ( evt ) {
  // disable zooming
  if ((evt.code == "Minus" || evt.code == "Equal") && (evt.ctrlKey || evt.metaKey)) {evt.preventDefault()}
}

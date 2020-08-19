/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const remote     = require('electron').remote;
const { dialog } = require('electron').remote;
const alerts     = require('./alerts.js');
const fs         = require('fs');
/*----------------------------------------------------------------------------*/
var ewa = new EmbendedWebApp();
/*----------------------------------------------------------------------------*/
function EmbendedWebApp () {
  /*------------------ Private ------------------*/
  var self = this;
  var crc  = 0;
  /*------------------- Public ------------------*/
  this.valid = 0;
  this.size  = 0;
  this.data  = [];
  /*---------------------------------------------*/
  this.getLength = function () {
    return self.data.length;
  }
  this.fromFile  = function ( file ) {
    self.free();
    let buffer = file.split( ' ' );
    if ( buffer.length > 2 ) {
      self.size = buffer.length - 1;
      for ( var i=0; i<this.size; i++ ) {
        let byte = parseInt( buffer[i], 16 );
        self.data.push( byte );
        crc += byte;
      }
      crc &= 0xFF;
      if ( crc == parseInt( buffer[i], 16 ) ) {
        self.valid = 1;
      }
    }
    return;
  }
  this.free      = function () {
    self.valid = 0;
    self.size  = 0;
    self.data  = [];
    crc        = 0;
    return;
  }
}

function loaderInit () {
  swFlashFile    = document.getElementById( "flash-file" );
  swFlashLoad    = document.getElementById( "flash-load" );
  /*------------------------------------------------------*/
  swFlashFile.addEventListener( 'click', function () {
    ewa.free();
    dialog.showOpenDialog({
      filters    : [
        { name : "Embended web application",   extensions : ['ewa'] }
      ],
      properties : ['openFile', 'multiSelections']
    }).then( function ( files ) {
      if ( files !== undefined ) {
        fs.readFile( files.filePaths[0], 'utf8', function ( err, data ) {
          ewa.fromFile( data );
          if ( ewa.valid > 0 ) {
            let alert   = new alerts.Alert( "alert-success", alerts.okIco, "Файл готов к записи" );
            swFlashLoad.disabled = false;
          } else {
            let alert   = new alerts.Alert( "alert-warning", alerts.triIco, "Ошибка при проверке файла" );
          }
        });
    }});
  });
  /*------------------------------------------------------*/
  swFlashLoad.addEventListener( 'click', function () {
    if ( ewa.valid > 0 ) {
      let alert = new alerts.Alert( "alert-warning", alerts.triIco, "Загрузка", 1 );
      usb.controller.sendEWA( ewa.data, alert );
    }
  });
}


loaderInit();

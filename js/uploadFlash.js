/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const remote     = require('electron').remote;
const { dialog } = require('electron').remote;
//var HID          = require('node-hid');
const alerts     = require('./alerts.js');
const fs         = require('fs');
/*----------------------------------------------------------------------------*/
var ewa = new EmbendedWebApp();
/*----------------------------------------------------------------------------*/
function EmbendedWebApp () {
  /*------------------ Private ------------------*/
  var crc = 0;
  /*------------------- Public ------------------*/
  this.valid = 0;
  this.size  = 0;
  this.data  = [];
  /*---------------------------------------------*/
  this.fromFile = function ( file ) {
    this.free();
    let buffer = file.split( ' ' );
    if ( buffer.length > 2 ) {
      this.size = buffer.length - 1;
      for ( var i=0; i<this.size; i++ ) {
        let byte = parseInt( buffer[i], 16 );
        this.data.push( byte );
        crc += byte;
      }
      crc &= 0xFF;
      console.log( this.data[0] );
      console.log( this.data[1] );
      if ( crc == parseInt( buffer[i], 16 ) ) {
        this.valid = 1;
      }
    }
    return;
  }
  this.free     = function () {
    this.valid = 0;
    this.size  = 0;
    this.data  = [];
    return;
  }
}

function loaderInit () {
  swFlashFile    = document.getElementById( "flash-file" );
  swFlashLoad    = document.getElementById( "flash-load" );
  flashProgress  = document.getElementById( "flash-progress" );
  /*------------------------------------------------------*/
  swFlashFile.addEventListener( 'click', function () {
    flashProgress.style.width = "0%"
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
      
      usb.controller.send();
    }
  });
}


loaderInit();

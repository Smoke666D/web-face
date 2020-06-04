/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const remote     = require('electron').remote;
var   dfu        = require('./dfu.js');
const alerts     = require('./alerts.js');
const { dialog } = require('electron').remote;
const fs         = require('fs');
/*----------------------------------------------------------------------------*/
var firmware  = new Firmware();
var dfuDevice = new dfu.dfuDevice();
/*----------------------------------------------------------------------------*/
function Line     ( str, shift ) {
  /*------------------ Private ------------------*/
  var count = 9;
  /*------------------- Public ------------------*/
  this.len  = parseInt( str.slice( 1, 3 ), 16 );
  this.adr  = shift + parseInt( str.slice( 3, 7 ), 16 );
  this.type = parseInt( str.slice( 7, 9 ), 16 );
  this.data = [];
  for( var i=0; i<this.len; i++ ) {
    let byte = parseInt( str.slice( count, ( count + 2 ) ), 16 );
    this.data.push( byte );
    count += 2;
  }
  this.crc = parseInt( str.slice( count, ( count + 2 ) ), 16 );
  return;
}
function Firmware ( ) {
  /*------------------ Private ------------------*/
  var firstData = 0;
  var prevAdr   = 0;
  var prevLen   = 0;
  var adrShift  = 0;
  /*------------------- Public ------------------*/
  this.start = 0;
  this.end   = 0;
  this.size  = 0;
  this.valid = 0;
  this.data  = [];
  /*---------------------------------------------*/
  this.fromHEX = function( file ) {
    let buffer  = file;
    let index   = 0;
    let endLine = 0;
    let line    = "";
    while ( index > -1 ) {
      index   = buffer.search( ':' );
      endLine = buffer.search( '\r' );
      line    = new Line( buffer.substr( index, endLine ), adrShift );
      buffer  = buffer.slice( ( endLine + 1), buffer.length );
      switch ( line.type ) {
        case 0x04:
          for( var i=0; i<line.len; i++ ) {
            adrShift |= line.data[i] << ( 8 * ( line.len - i - 1 ) )
          }
          adrShift = adrShift << 16;
          break;
        case 0x05:
          break;
        case 0x01:
          this.size  = this.data.length;
          this.valid = 1;
          index      = -1;
          break;
        case 0x00:
          if ( firstData == 0 ) {
            firstData   = 1;
            this.start  = line.adr;
            prevAdr     = line.adr;
            prevLen     = line.len;
            for ( var i=0; i<line.len; i++ ) {
              this.data.push( line.data[i] );
            }
          } else {
            let shift = line.adr - prevAdr - prevLen;
            for ( var i=0; i<shift; i++ ) {
              this.data.push( 0xFF );
            }
            for ( var i=0; i<line.len; i++ ) {
              this.data.push( line.data[i] );
            }
            prevAdr = line.adr;
            prevLen = line.len;
          }
          this.end = line.adr + line.len;
          break;
        default:
          break;
      }
    }
    this.data = new Buffer.from( this.data );
    return;
  }
  this.fromBIN = function( file, adr ) {
    this.start = adr;
    this.valid = 1;

    let some = file;
    console.log( some );

    this.data  = new Buffer( file );
    this.size  = this.data.length;
    this.end   = this.start + this.size;
    return;
  }
  /*---------------------------------------------*/
  return;
}
/*----------------------------------------------------------------------------*/
function bootInit () {
  swBootConnect = document.getElementById( "boot-connect" );
  swBootFile    = document.getElementById( "boot-file" );
  swBootLoad    = document.getElementById( "boot-load" );
  bootProgress  = document.getElementById( "boot-progress" );
  /*------------------------------------------------------*/
  swBootConnect.addEventListener( 'click', function () {
    //dfuDevice = new dfu.dfuDevice();
    dfuDevice.init( async function () {
      console.log( dfuDevice );
      swBootFile.disabled = false;
    });
  });
  /*------------------------------------------------------*/
  swBootFile.addEventListener( 'click', function () {
    dialog.showOpenDialog({
      filters    : [
        { name : "Intel HEX",   extensions : ['hex'] }
      ],
      properties : ['openFile', 'multiSelections']
    }).then( function ( files ) {
      if (files !== undefined) {
        fs.readFile( files.filePaths[0], 'utf8', function ( err, data ) {
          firmware.fromHEX( data );
          if ( firmware.valid > 0 ) {
            let alert   = new alerts.Alert( "alert-success", alerts.okIco, "Файл готов к записи." );
            swBootLoad.disabled = false;
          }
        });
    }});
  });
  /*------------------------------------------------------*/
  swBootLoad.addEventListener( 'click', async function () {
    bootProgress.style.width = "0%"
    if ( ( firmware.valid > 0 ) && ( dfuDevice != null ) ) {
      let adr    = await dfuDevice.searchSector( firmware.start );
      let result = await dfuDevice.downloadFirmware( firmware.data, adr, function( max, n ) {
        bootProgress.style.width = ( n / max * 100 ) + "%";
        console.log( n + "/" + max );
      }, function( mes ) {
        console.log( mes );
      });
      let alert   = new alerts.Alert( "alert-success", alerts.okIco, "Прошивка успешно загружена" );
    }
  });
  /*------------------------------------------------------*/
  return;
}

bootInit();

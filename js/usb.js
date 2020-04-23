/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const remote     = require('electron').remote;
var HID          = require('node-hid');
const alerts     = require('./alerts.js');
const USBMessage = require('./usb-message.js').USBMessage;
const msgCMD     = require('./usb-message.js').msgCMD;
const msgSTAT    = require('./usb-message.js').msgSTAT;
/*----------------------------------------------------------------------------*/
var charts = [];
/*----------------------------------------------------------------------------*/
const usbStat = {
  "wait"  : 1,
  "write" : 2,
  "read"  : 3 };
const usbHandler = {
  "finish" : 1,
  "error"  : 2,
  "cont"   : 3 };
const usbInit = {
  "fail" : 0,
  "done" : 1
}
/*----------------------------------------------------------------------------*/
function EnrrganController() {
  /*------------------ Private ------------------*/
  var self       = this;
  var stat       = usbStat.wait;
  var device     = null;
  var seqData    = [];
  var seqLen     = 0;
  var seqCount   = 0;
  /*------------------- Public ------------------*/
  this.input         = [];
  this.error         = [];
  this.errorCounter  = 0;
  this.targetLength  = 0;
  /*---------------------------------------------*/
  function scan ( success, fail ) {
    var devices = HID.devices();
    device      = null;
    for ( var i=0; i<devices.length; i++ ) {
      if ( devices[i].manufacturer == "Energan" ) {
        res       = 1;
        device    = new HID.HID( devices[i].path );
        success();
        break;
      }
    }
    if ( device == null ) {
      fail();
    }
    return;
  }
  function initEvents ( inCallback, outCallback, errorCalback, callback ) {
    device.on( "data", function( data ) {
      handle = handler( data );
      if ( handle == usbHandler.finish ) {
        if ( stat == usbStat.write ) {
          stat = usbStat.wait;
          outCallback();
        } else if ( stat == usbStat.read ) {
          stat = usbStat.wait;
          inCallback();
        }
      } else if ( handle == usbHandler.error ) {
        stat = usbStat.wait;
        errorCalback();
      }
    });
    device.on("error", function( err ) {
      error.push( err );
      self.errorCounter++;
      stat = usbStat.wait;
      errorCalback();
    });
    callback();
    return;
  }
  function writeHandler( response ) {
    var result = usbHandler.cont;
    response.init( function () {
      if ( ( response.status == msgSTAT.USB_OK_STAT ) &&
           ( ( response.command == msgCMD.USB_PUT_CONFIG_CMD ) ||
             ( response.command == msgCMD.USB_PUT_CHART_CMD ) ) &&
           ( response.adr     == ( seqCount - 1 ) ) ) {
        if ( seqCount < seqLen ) {
          write( seqData[seqCount++].buffer );
          result = usbHandler.cont;
        } else {
          result = usbHandler.finish;
        }
      } else {
        if ( response.status != msgSTAT.USB_OK_STAT ) {
          console.log("Error with status: " + response.status + " expected: " + msgSTAT.USB_OK_STAT);
        }
        if ( ( response.command != msgCMD.USB_PUT_CONFIG_CMD ) &&
          ( response.command != msgCMD.USB_PUT_CHART_CMD ) ) {
          console.log("Error with command: " + response.command + " expected: " + msgCMD.USB_PUT_CONFIG_CMD + " or " + msgCMD.USB_PUT_CHART_CMD);
        }
        if ( response.adr != ( seqCount - 1 ) ) {
          console.log("Error with status: " + response.adr + " expected: " + ( seqCount - 1 ) );
        }
        result = usbHandler.error;
      }
    });
    return result;
  }
  function readHandler ( message ) {
    seqCount++;
    self.input.push( message )
    if ( seqCount >= seqLen ) {
      result = usbHandler.finish;
      seqCount = 0;
    } else {
      result = usbHandler.cont;
    }
    return result;
  }
  function handler ( data ) {
    var result = usbHandler.finish;
    let input  = new USBMessage( data );
    switch ( stat ) {
      case usbStat.wait:
        break;
      case usbStat.write:
        result = writeHandler( input );
        break;
      case usbStat.read:
        result = readHandler( input );
        break;
      default:
        break;
    }
    return result;
  }
  function write ( data ) {
    if (device != null) {
      device.write(data);
    }
    return;
  }
  function makeDataSeq ( callback ) {
    seqLen  = 0;
    seqData = [];
    /*--------------- Configurations ---------------*/
    grabInterface();
    for ( var i=0; i<dataReg.length; i++ ) {
      seqData.push( new USBMessage( [] ) )
      seqData[seqLen + i].codeConfig( i );
    }
    seqLen += dataReg.length;
    /*------------------- Charts -------------------*/
    /*
    charts = uploadCharts();
    for ( var i=0; i<dataReg.length; i++ ) {
      seqData.push( new USBMessage( [] ) )
      seqData[seqLen + i].codeChart( i );
    }
    */
    /*----------------------------------------------*/
    callback();
    return;
  }
  function cleanInput () {
    this.inputCounter = 0;
    this.input        = [];
    return;
  }
  /*---------------------------------------------*/
  this.init     = function ( inCallback, outCallback, errorCalback ) {
    var self    = this;
    var res     = usbInit.fail;
    var handle  = usbHandler.finish;
    var devices = HID.devices();

    scan( function () {
      initEvents( inCallback, outCallback, errorCalback, function() {
        res         = usbInit.done;
        let alert   = new alerts.Alert( "alert-success", alerts.triIco, "Контроллер подключен по USB" );
      });
    }, function() {
      let alert = new alerts.Alert("alert-warning",alerts.triIco,"Контроллер не подключен по USB");
    });
    return res;
  }
  this.close    = function () {
    if (device != null) {
      device.close();
    }
    return;
  }
  this.getInput = function () {
    return this.input;
  }
  this.send     = function () {
    if ( stat == usbStat.wait) {
      stat = usbStat.write;
      makeDataSeq( function() {
        write( seqData[0].buffer );
        seqCount = 1;
      });
    }
    return;
  }
  this.receive  = function () {
    if ( stat == usbStat.wait) {
      this.input = [];
      stat = usbStat.read;
      seqData  = [];
      seqCount = 0;
      seqLen   = dataReg.length;
      write( [0x01, msgCMD.USB_GET_CONFIG_CMD, msgSTAT.USB_OK_STAT, 0xFF, 0xFF] );
    }
  }
  /*---------------------------------------------*/
  this.getChart   = function( callback ) {
    stat = usbStat.read;
    cleanInput();
    write([0x01, msgCMD.USB_GET_CHART_CMD, msgSTAT.USB_OK_STAT, 0xFF, 0xFF]);
    callback();
    return;
  }
  this.sendConfig = function( adr, callback ) {
    grabInterface();
    stat = usbStat.write;
    let conf = new USBMessage( this.output  );
    if (adr == 0xFFFF) {
      this.targetLength = dataReg.length;
      currentAdr = 0;
    } else {
      this.targetLength = 1
      currentAdr = adr;
    }
    conf.codeConfig( currentAdr );
    write( conf.buffer );
    currentAdr++;
    this.outputCounter++;
    callback();
    return;
  }
  /*----------------------------------------*/
  return;
}
//------------------------------------------------------------------------------
let controller = new EnrrganController();
//------------------------------------------------------------------------------
module.exports.EnrrganController = EnrrganController;
module.exports.controller        = controller;
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/

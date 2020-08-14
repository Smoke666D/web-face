/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const remote        = require('electron').remote;
var HID             = require('node-hid');
const alerts        = require('./alerts.js');
const USBMessage    = require('./usb-message.js').USBMessage;
const msgCMD        = require('./usb-message.js').msgCMD;
const msgSTAT       = require('./usb-message.js').msgSTAT;
const USB_DATA_SIZE = require('./usb-message.js').USB_DATA_SIZE;
/*----------------------------------------------------------------------------*/
var charts = [];
/*----------------------------------------------------------------------------*/
const usbStat = {
  "wait"  : 1,
  "write" : 2,
  "read"  : 3 };
const usbHandler = {
  "finish"   : 1,
  "error"    : 2,
  "continue" : 3 };
const usbInit = {
  "fail" : 0,
  "done" : 1 }
/*----------------------------------------------------------------------------*/
function MessageUnit ( data, adr ) {
  this.data = data;
  this.adr  = adr;
  return;
}
/*----------------------------------------------------------------------------*/
function MessageArray () {
  /*------------------ Private ------------------*/
  var self     = this;
  var sequence = [];
  var counter  = 0;
  /*------------------- Public ------------------*/
  this.getCurrentAdr = function () {
    if ( sequence.len == 0 ) {
      return 0xFFFF;
    } else {
      return sequence[counter].adr;
    }
  }
  this.getLength     = function () {
    return sequence.length;
  }
  this.getCounter    = function () {
    return counter;
  }
  this.incCounter    = function () {
    counter++;
    return;
  }
  this.getData       = function ( n ) {
    return sequence[n].data;
  }
  this.getFullData   = function () {
    let out = [];
    for ( var i=0; i<sequence.length; i++ ) {
      out.push( new USBMessage( sequence[i].data ) );
    }
    return out;
  }
  this.clean         = function () {
    sequence = [];
    counter  = 0;
    return;
  }
  this.resetCounter  = function () {
    counter = 0;
    return;
  }
  this.addMessage    = function ( message ) {
    sequence.push( new MessageUnit( message.buffer, message.adr ) );
  }
  return;
}
/*----------------------------------------------------------------------------*/
function InputMessageArray () {
  /*------------------ Private ------------------*/
  var self     = this;
  var length   = 0;
  var response = new MessageArray();
  var request  = new MessageArray();
  /*------------------- Public ------------------*/
  this.getCurrentAdr = function () {
    return response.getCurrentAdr();
  }
  this.nextRequest   = function () {
    let output;
    if ( request.getCounter < request.getLength ) {
      output = request.getData( request.getCounter() );
      request.incCounter();
    }
    return output;
  }
  this.process       = function ( message ) {
    let result = usbHandler.error;
    if ( response.getLength > 0 ) {
      if ( self.response.getCurrentAdr() != message.adr ) {
        length = 0;
      }
    } else {
      length = 0;
    }

    response.addMessage( message );
    length += USB_DATA_SIZE;
    if ( length >= message.length ) {
      result = usbHandler.finish;
    } else {
      result = usbHandler.continue;
    }
    return result;
  }
  this.isEnd         = function () {
    let out = usbHandler.finish;
    if ( request.getCounter() < request.getLength() ) {
      out = usbHandler.continue;
    }
    return out;
  }
  this.clean         = function () {
    response.clean();
    request.clean();
    return;
  }
  this.addRequest    = function ( message ) {
    request.addMessage( message );
    request.resetCounter();
    return;
  }
  this.getData       = function () {
    return response.getFullData();
  }
  return;
}
function OutputMessageArray () {
  /*------------------ Private ------------------*/
  var self  = this;
  var array = new MessageArray();
  /*------------------- Public ------------------*/
  this.getCurrentAdr = function () {
    return array.getCurrentAdr();
  }
  this.nextMessage   = function () {
    let output = array.getData( array.getCounter() );
    self.array.incCounter();
    return output;
  }
  this.isEnd         = function () {
    if ( array.getCounter() >= array.getLength() ) {
      let result = usbHandler.finish;
    } else {
      let result = usbHandler.continue;
    }
    return result;
  }
  this.clean         = function () {
    array.clean();
    return;
  }
  this.addMessage    = function ( message ) {
    array.addMessage( message );
    return;
  }
  return;
}
/*----------------------------------------------------------------------------*/
function USBtransport () {
  /*------------------ Private ------------------*/
  var self   = this;
  var device = null;
  var output = new OutputMessageArray;
  var input  = new InputMessageArray;
  var status = usbStat.wait;

  this.error         = [];
  this.errorCounter  = 0;

  function write ( data ) {
    if ( device != null ) {
      device.write( data );
    }
    return;
  }
  function handler ( data ) {
    var result = usbHandler.finish;
    let input  = new USBMessage( data );
    switch ( status ) {
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
  function writeHandler ( response ) {
    var result = usbHandler.continue;
    response.init( function () {
      if ( response.status == msgSTAT.USB_OK_STAT ) {
        if ( ( response.command == msgCMD.USB_PUT_CONFIG_CMD ) ||
             ( response.command == msgCMD.USB_PUT_CHART_CMD ) ) {
            result = output.isEnd();
            if ( result == usbHandler.continue )
            {
              write( output.nextMessage() );
            }
        } else {
          console.log("Error with command: " + response.command + " expected: " + msgCMD.USB_PUT_CONFIG_CMD + " or " + msgCMD.USB_PUT_CHART_CMD);
        }
      } else {
        console.log("Error with status: " + response.status + " expected: " + msgSTAT.USB_OK_STAT);
      }
      result = usbHandler.error;
    });
    return result;
  }
  function readHandler ( message ) {
    result = usbHandler.error;
    message.init( function () {
      result = input.process( message );
      if ( ( result == usbHandler.finish ) && ( input.isEnd() == usbHandler.continue ) ) {
        write( input.nextRequest() );
        result = usbHandler.continue;
      }
    });
    return result;
  }
  /*---------------------------------------------*/
  /*------------------- Public ------------------*/
  /*---------------------------------------------*/
  this.scan        = function ( success, fail ) {
    var devices = HID.devices();
    device      = null;
    for ( var i=0; i<devices.length; i++ ) {
      if ( devices[i].manufacturer == "Energan" ) {
        device = new HID.HID( devices[i].path );
        success();
        break;
      }
    }
    if ( device == null ) {
      fail();
    }
    return;
  }
  this.initEvents  = function ( inCallback, outCallback, errorCalback, callback ) {
    device.on( "data", function( data ) {
      handle = handler( data );
      if ( handle == usbHandler.finish ) {
        if ( status == usbStat.write ) {
          status = usbStat.wait;
          outCallback();
        } else if ( status == usbStat.read ) {
          status = usbStat.wait;
          inCallback();
        }
      } else if ( handle == usbHandler.error ) {
        status = usbStat.wait;
        errorCalback();
      }
    });
    device.on("error", function( err ) {
      error.push( err );
      self.errorCounter++;
      status = usbStat.wait;
      errorCalback();
    });
    callback();
    return;
  }
  this.close       = function () {
    if (device != null) {
      device.close();
    }
    return;
  }
  this.getInput    = function () {
    return input.getData();
  }
  this.getStatus   = function () {
    return status;
  }
  this.clean       = function () {
    output.clean();
    input.clean();
    return;
  }
  this.addToOutput = function ( message ) {
    output.addMessage( message );
    return;
  }
  this.addRequest  = function ( message ) {
    input.addRequest( message );
    return;
  }
  this.start       = function ( dir ) {
    if ( dir == usbStat.write ) {
      status = usbStat.write;
      write( output.nextMessage() );
    } else {
      status = usbStat.read;
      write( input.nextRequest() );
    }
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
}
/*----------------------------------------------------------------------------*/
function EnrrganController () {
  /*------------------ Private ------------------*/
  var self      = this;
  var transport = new USBtransport();
  /*---------------------------------------------*/
  function initWriteSequency ( callback ) {
    var msg = null;
    transport.clean();
    /*--------------- Configurations ---------------*/
    grabInterface();
    for ( var i=0; i<dataReg.length; i++ ) {
      msg = new USBMessage( [] );
      msg.codeConfig( i );
      transport.addToOutput( msg );
    }
    /*------------------- Charts -------------------*/
    charts = uploadCharts();
    for ( var i=0; i<charts.length; i++ ) {
      msg = new USBMessage( [] );
      msg.codeChart( charts[i], i );
      transport.addToOutput( msg )
    }
    /*----------------------------------------------*/
    callback();
    return;
  }
  function initWriteEWA ( ewa, callback ) {
    let msg   = null;
    let size  = Math.ceil( ewa.length / USB_DATA_SIZE );
    let index = 0;
    transport.clean();
    for ( var i=0; i<size; i++ ) {
      msg = new USBMessage( [] );
      msg.codeEWA( ewa, index );
      transport.addToOutput( msg );
    }
    return;
  }
  function initReadSequency ( callback ) {
    var msg = null;
    transport.clean();
    for ( var i=0; i<dataReg.length; i++ ) {
      msg = new USBMessage( [] );
      msg.makeConfigRequest( i );
      transport.addRequest( msg );
    }

    /*
    for ( var i=0; i<charts.length; i++ ) {
      msg = new USBMessage( [] )
      msg.makeChartRequest( i );
      transport.addRequest( msg );
    }
    */
    callback();
    return;
  }
  /*---------------------------------------------*/
  this.init     = function ( inCallback, outCallback, errorCalback ) {
    var result = usbInit.fail;
    var handle = usbHandler.finish;

    transport.scan( function () {
      transport.initEvents( inCallback, outCallback, errorCalback, function() {
        result    = usbInit.done;
        let alert = new alerts.Alert( "alert-success", alerts.okIco, "Контроллер подключен по USB" );
      });
    }, function() {
      let alert = new alerts.Alert("alert-warning",alerts.triIco,"Контроллер не подключен по USB");
    });
    return result;
  }
  this.close    = function () {
    transport.close();
    return;
  }
  this.getInput = function () {
    return transport.getInput();
  }
  this.send     = function () {
    if ( transport.getStatus() == usbStat.wait) {
      initOutputDataSequency( function () {
        transport.start( usbStat.write );
      });
    }
    return;
  }
  this.sendEWA  = function ( ewa ) {
    if ( transport.getStatus() == usbStat.wait) {
      initWriteEWA( function () {
        transport.start( usbStat.write );
      });
    }
    return;
  }
  this.receive  = function () {
    if ( transport.getStatus() == usbStat.wait) {
      initReadSequency( function () {
        transport.start( usbStat.read );
      });
    }
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

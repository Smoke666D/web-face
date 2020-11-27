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
const common        = require('./common.js');
/*----------------------------------------------------------------------------*/
const chartsLength  = 3;
var   charts        = [];
/*----------------------------------------------------------------------------*/
const usbStat = {
  "wait"  : 1,
  "write" : 2,
  "read"  : 3 };
const usbHandler = {
  "finish"       : 1,
  "error"        : 2,
  "continue"     : 3,
  "unauthorized" : 4,
  "forbidden"    : 5 };
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
      return sequence[sequence.length-1].adr;
    }
  }
  this.getLength     = function () {
    return sequence.length;
  }
  this.getCounter    = function () {
    return counter;
  }
  this.getProgress   = function () {
    return Math.ceil( ( ( counter + 1 ) / sequence.length ) * 100 );
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
    if ( typeof message.buffer[0] == "object" ) {
      for ( var i=0; i<message.buffer.length; i++ ) {
        sequence.push( new MessageUnit( message.buffer[i], message.adr ) );
      }
    } else {
      sequence.push( new MessageUnit( message.buffer, message.adr ) );
    }
    return;
  }
  return;
}
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
  this.getProgress   = function () {
    return request.getProgress();
  }
  this.process       = function ( message ) {
    let result = usbHandler.error;
    if ( message.status == msgSTAT.USB_OK_STAT ) {
      if ( response.getLength() > 0 ) {
        if ( response.getCurrentAdr() != message.adr ) {
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
    } else {
      if ( message.status == msgSTAT.USB_BAD_REQ_STAT ) {
        result = usbHandler.error;
      } else if ( message.status == msgSTAT.USB_NON_CON_STAT ) {
        result = usbHandler.error;
      } else if ( message.status == msgSTAT.USB_FORBIDDEN ) {
        result = usbHandler.forbidden;
      } else if ( message.status == msgSTAT.USB_STAT_UNAUTHORIZED ) {
        result = usbHandler.unauthorized;
      }
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
    let output;
    if ( array.getCounter() < array.getLength() ) {
      output = array.getData( array.getCounter() );
      array.incCounter();
    }
    return output;
  }
  this.getProgress   = function () {
    return array.getProgress();
  }
  this.isEnd         = function () {
    let out = usbHandler.finish
    if ( array.getCounter() < array.getLength() ) {
      out = usbHandler.continue;
    }
    return out;
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
function USBtransport () {
  /*------------------ Private ------------------*/
  var self   = this;
  var device = null;
  var output = new OutputMessageArray;
  var input  = new InputMessageArray;
  var status = usbStat.wait;
  var alert  = null;

  this.error         = [];
  this.errorCounter  = 0;

  function write ( data ) {
    if ( device != null ) {
      try {
        device.write( data );
      } catch (e) {
        if ( ( alert != null ) || ( alert != undefined ) ) {
          alert.close( 0 );
        }
      }
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
        if ( ( response.command == msgCMD.USB_PUT_CONFIG_CMD  ) ||
             ( response.command == msgCMD.USB_PUT_CHART_CMD   ) ||
             ( response.command == msgCMD.USB_SAVE_CONFIG_CMD ) ||
             ( response.command == msgCMD.USB_SAVE_CHART_CMD  ) ||
             ( response.command == msgCMD.USB_PUT_TIME        ) ||
             ( response.command == msgCMD.USB_PUT_FREE_DATA   ) ||
             ( response.command == msgCMD.USB_ERASE_LOG       ) ||
             ( response.command == msgCMD.USB_PUT_PASSWORD    ) ||
             ( response.command == msgCMD.USB_ERASE_PASSWOR   ) ||
             ( response.command == msgCMD.USB_AUTHORIZATION   ) ||
             ( response.command == msgCMD.USB_PUT_EWA_CMD  ) ) {
            result = output.isEnd();
            if ( result == usbHandler.continue )
            {
              alert.setProgressBar( output.getProgress() );
              write( output.nextMessage() );
            }
        } else {
          console.log("Error with command: " + response.command + " expected: " + msgCMD.USB_PUT_CONFIG_CMD + " or " + msgCMD.USB_PUT_CHART_CMD + " or " + msgCMD.USB_PUT_EWA_CMD );
          if ( alert != undefined ) {
            if ( ( alert != null ) || ( alert != undefined ) ) {
              alert.close( 0 );
            }
            self.close();
            if ( ( alert != null ) || ( alert != undefined ) ) {
              alert.close( 0 );
            }
            resetSuccessConnection();
          }
        }
      } else {
        if ( ( response.status == msgSTAT.USB_BAD_REQ_STAT ) || ( response.status == msgSTAT.USB_NON_CON_STAT ) ) {
          result = usbHandler.error;
        } else if ( response.status == msgSTAT.USB_FORBIDDEN ) {
          result = usbHandler.forbidden;
        } else if ( response.status == msgSTAT.USB_STAT_UNAUTHORIZED ) {
          result = usbHandler.unauthorized;
        }
        if ( alert != undefined ) {
          if ( ( alert != null ) || ( alert != undefined ) ) {
            alert.close( 0 );
          }
        }
      }
    });
    return result;
  }
  function readHandler ( message ) {
    result = usbHandler.error;
    message.init( function () {
      result = input.process( message );
      if ( ( result == usbHandler.finish ) && ( input.isEnd() == usbHandler.continue ) ) {
        alert.setProgressBar( input.getProgress() );
        write( input.nextRequest() );
        result = usbHandler.continue;
      }
      if ( ( result == usbHandler.error ) || ( result == usbHandler.unauthorized ) ) {
        if ( ( alert != null ) || ( alert != undefined ) ) {
          alert.close( 0 );
        }
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
  this.initEvents  = function ( inCallback, outCallback, errorCallback, unauthorizedCallback, forbiddenCallback, callback ) {
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
      } else if ( handle == usbHandler.forbidden ) {
        status = usbStat.wait;
        forbiddenCallback();
      } else if ( handle == usbHandler.unauthorized ) {
        status = usbStat.wait;
        unauthorizedCallback();
      } else if ( handle == usbHandler.error ) {
        status = usbStat.wait;
        self.close();
        errorCallback();
      }
    });
    device.on("error", function( err ) {
      self.error.push( err );
      self.errorCounter++;
      status = usbStat.wait;
      self.close();
      errorCallback();
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
  this.start       = function ( dir, alertIn ) {
    alert = alertIn;
    if ( dir == usbStat.write ) {
      status = usbStat.write;
      if ( alertIn != null ) {
        alert.setProgressBar( output.getProgress() );
      }
      write( output.nextMessage() );
    } else {
      status = usbStat.read;
      alert.setProgressBar( input.getProgress() );
      write( input.nextRequest() );
    }
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
}
function EnrrganController () {
  /*------------------ Private ------------------*/
  var self      = this;
  var transport = new USBtransport();
  var alert     = null;
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
    msg = new USBMessage( [] );
    msg.codeSaveConfigs();
    transport.addToOutput( msg );
    /*------------------- Charts -------------------*/
    charts = uploadCharts();
    for ( var i=0; i<charts.length; i++ ) {
      msg = new USBMessage( [] );
      msg.codeChart( charts[i], i );
      transport.addToOutput( msg );
    }
    msg = new USBMessage( [] );
    msg.codeSaveCharts();
    transport.addToOutput( msg );
    /*----------------------------------------------*/
    callback();
    return;
  }
  function initTimeWriteSequency ( callback ) {
    let msg = new USBMessage([]);
    msg.codeTime( rtcTime );
    transport.addToOutput( msg );
    callback();
    return;
  }
  function initWriteEWA ( ewa, callback ) {
    let msg   = null;
    let size  = Math.ceil( ewa.length / USB_DATA_SIZE );
    let index = 0;
    transport.clean();
    for ( var i=0; i<size; i++ ) {
      msg   = new USBMessage( [] );
      index = msg.codeEWA( ewa, index );
      transport.addToOutput( msg );
    }
    callback();
    return;
  }
  function initWriteFreeDataSequency ( n, data, callback ) {
    let msg = new USBMessage( [] );
    msg.codeFreeData( n, data );
    transport.addToOutput( msg );
    callback();
    return;
  }
  function initWritePassSequency ( password, callback ) {
    let msg = new USBMessage( [] );
    msg.codePassword( password );
    transport.addToOutput( msg );
    callback();
    return;
  }
  function initWriteAuthorSequency ( callback ) {
    let msg = new USBMessage( [] );
    msg.codeAuthorization();
    transport.addToOutput( msg );
    callback();
    return;
  }
  function initWriteEraseLog ( callback ) {
    let msg = new USBMessage( [] );
    msg.codeLogErase();
    transport.addToOutput( msg );
    callback();
    return;
  }
  function initReadSequency ( callback ) {
    var msg = null;
    transport.clean();

    msg = new USBMessage( [] );
    msg.codeAuthorization();
    transport.addRequest( msg );

    for ( var i=0; i<dataReg.length; i++ ) {
      msg = new USBMessage( [] );
      msg.makeConfigRequest( i );
      transport.addRequest( msg );
    }
    for ( var i=0; i<chartsLength; i++ ) {
      msg = new USBMessage( [] )
      msg.makeChartRequest( i );
      transport.addRequest( msg );
    }
    for ( var i=0; i<freeDataValue.length; i++ )
    {
      msg = new USBMessage( [] )
      msg.makeFreeDataRequest( i );
      transport.addRequest( msg );
    }
    for ( var i=0; i<logMaxSize; i++ )
    {
      msg = new USBMessage( [] )
      msg.makeLogRequest( i );
      transport.addRequest( msg );
    }
    msg = new USBMessage( [] )
    msg.makeTimeRequest();
    transport.addRequest( msg );
    callback();
    return;
  }
  /*---------------------------------------------*/
  this.init      = function ( inCallback, outCallback, errorCalback, unauthorizedCallback, forbiddenCallback ) {
    var result = usbInit.fail;
    var handle = usbHandler.finish;
    transport.scan( function () {
      transport.initEvents( inCallback, outCallback, errorCalback, unauthorizedCallback, forbiddenCallback, function() {
        result    = usbInit.done;
        let alert = new Alert( "alert-success", alerts.okIco, "Контроллер подключен по USB" );
      });
    }, function() {
      let alert = new Alert("alert-warning",alerts.triIco,"Контроллер не подключен по USB");
    });
    return result;
  }
  this.getStatus = function () {
    return transport.getStatus();
  }
  this.close     = function () {
    transport.close();
    return;
  }
  this.getInput  = function () {
    return transport.getInput();
  }
  this.sendTime  = function () {
    if ( transport.getStatus() == usbStat.wait) {
      initTimeWriteSequency( function () {
        transport.start( usbStat.write, null );
      });
    }
    return;
  }
  this.sendFreeData = function ( n, data ) {
    if ( transport.getStatus() == usbStat.wait) {
      initWriteFreeDataSequency( n, data, function () {
        transport.start( usbStat.write, null );
      });
    }
    return;
  }
  this.sendPass = function ( password ) {
    if ( transport.getStatus() == usbStat.wait) {
      initWritePassSequency( password, function () {
        transport.start( usbStat.write, null );
      });
    }
    return;
  }
  this.sendAuthorization = function () {
    if ( transport.getStatus() == usbStat.wait ) {
      initWriteAuthorSequency( function () {
        transport.start( usbStat.write, null );
      });
    }
    return;
  }
  this.send              = function ( alertIn ) {
    alert = alertIn;
    if ( transport.getStatus() == usbStat.wait) {
      initWriteSequency( function () {
        transport.start( usbStat.write, alert );
      });
    }
    return;
  }
  this.eraseLog = function () {
    if ( transport.getStatus() == usbStat.wait ) {
      initWriteEraseLog( function() {
        transport.start( usbStat.write, alert );
      });
    }
    return;
  }
  this.sendEWA  = function ( ewa, alertIn ) {
    alert = alertIn;
    if ( transport.getStatus() == usbStat.wait ) {
      initWriteEWA( ewa, function () {
        transport.start( usbStat.write, alert );
      });
    }
    return;
  }
  this.receive  = function ( alertIn ) {
    alert = alertIn;
    if ( transport.getStatus() == usbStat.wait) {
      initReadSequency( function () {
        transport.start( usbStat.read, alert );
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

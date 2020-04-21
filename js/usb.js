/*----------------------------------------------------------------------------*/
const remote = require('electron').remote;
var HID      = require('node-hid');
const alerts = require('./alerts.js');
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const msgSIZE = 65;
const msgCMD  = { "USB_GET_CMD":1, "USB_PUT_CMD":2 };
const msgSTAT = { "USB_OK_STAT":1, "USB_BAD_REQ_STAT":2, "USB_NON_CON_STAT":3 };
/*----------------------------------------------------------------------------*/
function USBMessage( buffer ) {
  /*------------------ Private ------------------*/
  var self     = this;
  /*------------------- Public ------------------*/
  this.command = 0;
  this.status  = 0;
  this.adr     = 0;
  this.data    = [];
  this.length  = 0;
  this.buffer  = buffer;
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.init = function( callback ) {
    switch ( this.buffer[2] ) {
      case msgSTAT.USB_OK_STAT:
        this.status = msgSTAT.USB_OK_STAT;
        break;
      case msgSTAT.USB_BAD_REQ_STAT:
        this.status = msgSTAT.USB_BAD_REQ_STAT;
        break;
      case msgSTAT.USB_NON_CON_STAT:
        this.status = msgSTAT.USB_NON_CON_STAT;
        break;
      default:
        this.status = msgSTAT.USB_BAD_REQ_STAT;
        break;
    }

    switch ( this.buffer[1] ) {
      case msgCMD.USB_GET_CMD:
        this.command = msgCMD.USB_GET_CMD;
        break;
      case msgCMD.USB_PUT_CMD:
        this.command = msgCMD.USB_PUT_CMD;
        break;
      default:
        this.command = 0;
        this.status  = msgSTAT.USB_BAD_REQ_STAT;
        console.log("CMD error");
        break;
    }

    if ( this.status != msgSTAT.USB_BAD_REQ_STAT ) {
      temp = ( this.buffer[3] << 8 ) | ( this.buffer[4] );
      if ( temp < dataReg.length) {
        this.adr    = temp;
        this.length = this.buffer[5];
        this.data   = [];
        for( var i=0; i<this.length; i++ ) {
          this.data.push(this.buffer[6 + i]);
        }
      } else {
        this.status = msgSTAT.USB_BAD_REQ_STAT;
        console.log("ADR error");
      }
    }
    callback();
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.clean = function() {
    this.buffer = [];
    for( var i=0; i<6; i++ ){
      this.buffer.push( 0 );
    }
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.setup = function( cmd, stat, callback ) {
    this.buffer[0] = 0x01;  /* 1st channel for sending via USB */
    this.buffer[1] = cmd;
    this.buffer[2] = stat;
    this.data      = [];
    callback();
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.setupAdr = function( adr ) {
    this.buffer[3] = ( adr & 0xFF00 ) >> 8;
    this.buffer[4] = adr & 0x00FF;
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.setupLength = function( ) {
    this.buffer[5] = this.length;
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.finishMesageWithZero = function () {
    size = msgSIZE - this.buffer.length
    for ( var i=0; i<size; i++ ) {
      this.buffer.push( 0 );
    }
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.codeConfig = function( n ) {
    this.clean();
    this.setup( msgCMD.USB_PUT_CMD, msgSTAT.USB_OK_STAT, function () {
      self.length = 0;
      self.setupAdr( n );
      /*----------- Configuration value -----------*/
      if ( dataReg[n].len == 1 ) {
        self.buffer.push( ( dataReg[n].value & 0xFF00 ) >> 8 );
        self.buffer.push( dataReg[n].value & 0x00FF );
        self.length += 2;
      } else {
        for ( var i=0; i<dataReg[n].len; i++ ) {
          self.buffer.push( ( dataReg[n].value[i] & 0xFF00 ) >> 8 );
          self.buffer.push( dataReg[n].value[i] & 0x00FF );
          self.length += 2;
        }
      }
      /*----------- Configuration scale -----------*/
      self.buffer.push( dataReg[n].scale );
      self.length += 1;
      /*----------- Configuration units -----------*/
      strBuffer = encodeURI( dataReg[n].units );
      for ( var i=0; i<strBuffer.length; i++ ) {
        self.buffer.push( strBuffer.charAt( i ).charCodeAt() );
        self.length += 1;
      }
      /*-------------------------------------------*/
      self.setupLength();
      self.finishMesageWithZero();
      /*-------------------------------------------*/
      return;
    });
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.parseConfig = function( n ) {
    counter = 0;
    /*----------- Configuration value -----------*/
    if ( dataReg[n].len == 1 ) {
      dataReg[n].value = ( ( this.data[counter] << 8 ) & 0xFF00 ) | ( this.data[counter + 1] & 0x00FF );
      counter += 2;
    } else {
      dataReg[n].value = [];
      for ( var i=0; i<dataReg[n].len; i++ ) {
        dataReg[n].value.push( ( ( this.data[counter + i * 2] << 8 ) & 0xFF00 ) | ( this.data[counter + i * 2 + 1] & 0x00FF ) )
      }
      counter += dataReg[n].len * 2;
    }
    /*----------- Configuration scale -----------*/
    dataReg[n].scale = this.data[counter++]
    /*----------- Configuration units -----------*/
    strBuffer = "";
    for ( var i=counter; i<this.length; i++ ) {
      strBuffer += String.fromCharCode( this.data[i] );
    }
    dataReg[n].units = decodeURI( strBuffer );
    /*-------------------------------------------*/
    return;
  }
  /*---------------------------------------------*/
  return;
}
/*----------------------------------------------------------------------------*/
const usbStat = { "wait" : 1, "write" : 2, "read" : 3 };
const usbHandler = { "finish" : 1, "error" : 2, "cont" : 3 };
/*----------------------------------------------------------------------------*/
function EnrrganController() {
  /*------------------ Private ------------------*/
  var self           = this;
  var stat           = usbStat.wait;
  var currentAdr     = 0;
  /*------------------- Public ------------------*/
  this.input         = [];
  this.output        = [];
  this.inputCounter  = 0;
  this.outputCounter = 0;
  this.error         = [];
  this.errorCounter  = 0;
  this.targetLength  = 0;
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*
   * Callback - function after getting message
   */
  this.scan = function( inCallback, outCallback, errorCalback ) {
    var self    = this;
    var res     = 0;
    var handle  = usbHandler.finish;
    var devices = HID.devices();
    this.device = null;
    for ( var i=0; i<devices.length; i++ ) {
      if ( devices[i].manufacturer == "Energan" ) {
        res         = 1;
        this.device = new HID.HID( devices[i].path );
        let alert   = new alerts.Alert( "alert-success", alerts.triIco, "Контроллер подключен по USB" );
        break;
      }
    }
    if ( this.device != null ) {
      this.device.on( "data", function( data ) {
        handle = inputHandler( data );
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
      this.device.on("error", function(err) {
        stat = usbStat.wait;
        errorCalback();
        self.errorCounter++;
      });
    } else {
      let alert = new alerts.Alert("alert-warning",alerts.triIco,"Контроллер не подключен по USB");
    }
    return res;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  function inputHandler( data ) {
    var result = usbHandler.finish;
    switch ( stat ) {
      /*---------- Asynchronous request ---------*/
      case usbStat.wait:
        break;
      /*---------- Response for output ----------*/
      case usbStat.write:
        let response = new USBMessage( data );
        response.init( function () {
          if ( ( response.status == msgSTAT.USB_OK_STAT ) && ( response.command == msgCMD.USB_PUT_CMD ) && ( response.adr == ( currentAdr - 1 ) ) ) {
            if ( self.outputCounter < self.targetLength ) {
              let conf = new USBMessage( this.output  );
              conf.codeConfig( currentAdr );
              self.write( conf.buffer );
              currentAdr++;
              self.outputCounter++;
              result = usbHandler.cont;
            } else {
              self.outputCounter = 0;
              result = usbHandler.finish;
            }
          } else {
            result = usbHandler.error;
          }
        });
        break;
      /*-------------- Input data ---------------*/
      case usbStat.read:
        let input = new USBMessage( data );
        self.input.push( input );
        self.inputCounter++;
        if ( self.inputCounter >= self.targetLength ) {
          result = usbHandler.finish;
          self.inputCounter = 0;
        } else {
          result = usbHandler.cont;
        }
        break;
      default:
        break;
    }
    return result;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.close = function() {
    if (this.device != null) {
      this.device.close();
    }
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.write = function(data) {
    if (this.device != null) {
      this.device.write(data);
    }
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.getInputCounter = function() {
    return this.inputCounter;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.getOutputCounter = function() {
    return this.outputCounter;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.getInputBuffer = function( ) {
    return this.input;
  }
  this.getInputLength = function() {
    return self.input.length;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.cleanInput = function() {
    this.inputCounter = 0;
    this.input        = [];
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.cleanOutput = function() {
    this.outputCounter = 0;
    this.output        = [];
    for ( var i = 0; i<6; i++) {
      this.output.push( 0 );
    }
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.getConfig = function( adr, callback ) {
    stat = usbStat.read;
    this.cleanInput();
    if (adr == 0xFFFF) {
      this.write([0x01,0x01,0x01,0xFF,0xFF]);
      this.targetLength = dataReg.length;
    } else if (adr < dataReg.length) {
      ard0 = adr & 0x00FF;
      adr1 = ( adr & 0xFF00 ) >> 8;
      this.write([0x01,0x01,0x01,adr1,ard0]);
      this.targetLength = 1;
    }
    callback();
    return;
  }
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  /*---------------------------------------------*/
  this.sendConfig = function( adr, callback ) {
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
    this.write( conf.buffer );
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

/*----------------------------------------------------------------------------*/
const remote = require('electron').remote;
var HID      = require('node-hid');
var alerts   = require('./alerts.js');
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const msgSIZE = 65;
const msgCMD  = { "USB_GET_CMD":1, "USB_PUT_CMD":2 };
const msgSTAT = { "USB_OK_STAT":1, "USB_BAD_REQ_STAT":2, "USB_NON_CON_STAT":3 };
/*----------------------------------------------------------------------------*/
function USBMessage( buffer ) {
  var self     = this;
  this.command = 0;
  this.status  = 0;
  this.adr     = 0;
  this.data    = [];
  this.length  = 0;
  this.buffer  = buffer;
  /*---------------------------------------------*/
  this.init = function( callback ) {
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
        callback();
      } else {
        this.status = msgSTAT.USB_BAD_REQ_STAT;
        console.log("ADR error");
      }
    }
    return;
  }
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
const usbStat = { "wait" : 1, "sending" : 2, "receiving" : 3 };
/*----------------------------------------------------------------------------*/
function EnrrganController() {
  var self          = this;
  this.input        = [];
  this.inputCounter = 0;
  this.error        = [];
  this.errorCounter = 0;
  this.stat         = usbStat.wait;
  this.targetLength = 0;

  /*----------------------------------------*/
  /*
   * Callback - function after getting message
   */
  this.scan = function( callback ) {
    var self    = this;
    var res     = 0;
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
        let msg = new USBMessage( data );
        self.input.push( msg );
        self.inputCounter++;
        if (self.inputCounter == self.targetLength) {
          callback();
        }
      });
      this.device.on("error", function(err) {
        self.error.push(err);
        self.errorCounter++;
      });
    } else {
      console.log("her");
      let alert = new alerts.Alert("alert-warning",alerts.triIco,"Контроллер не подключен по USB");
    }
    return res;
  }
  /*----------------------------------------*/
  this.close = function() {
    if (this.device != null) {
      this.device.close();
    }
    return;
  }
  /*----------------------------------------*/
  this.write = function(data) {
    if (this.device != null) {
      this.device.write(data);
    }
    return;
  }
  /*----------------------------------------*/
  this.getInputCounter = function() {
    return this.inputCounter;
  }
  /*----------------------------------------*/
  this.getInputBuffer = function( ) {
    return this.input;
  }
  this.getInputLength = function() {
    return self.input.length;
  }
  /*----------------------------------------*/
  this.cleanInput = function() {
    this.inputCounter = 0;
    this.input = [];
    return;
  }
  /*----------------------------------------*/
  /*----------------------------------------*/
  this.getConfig = function( adr, callback ) {
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
  /*----------------------------------------*/
  return;
}
//------------------------------------------------------------------------------
module.exports.EnrrganController = EnrrganController;

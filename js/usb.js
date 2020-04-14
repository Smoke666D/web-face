/*----------------------------------------------------------------------------*/
const remote = require('electron').remote;
var HID      = require('node-hid');
var alerts   = require('./alerts.js');
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const usbStat = {"wait":1,"sending":2,"receiving":3};
/*----------------------------------------------------------------------------*/
function EnrrganController() {
  var self     = this;
  this.input   = [];
  this.error   = [];
  this.stat    = usbStat.wait;
  this.counter = 0;
  /*----------------------------------------*/
  this.scan = function() {
    var res     = 0;
    var devices = HID.devices();
    for ( var i=0; i<devices.length; i++ ) {
      if ( devices[i].manufacturer == "Energan" ) {
        res         = 1;
        this.device = new HID.HID( devices[i].path );
        let alert   = new alerts.Alert( "alert-success", alerts.triIco, "Контроллер подключен по USB" );
        break;
      }
    }
    if (this.device != null) {
      this.device.on("data", function(data) {
        this.input.push(data);
        console.log(data);
      });
      this.device.on("error", function(err) {
        this.error.push(err);
        console.log(err);
      });
    } else {
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
  this.getConfig = function(adr) {
    if (adr == 0xFFFF) {
      this.write([0x01,0x01,0x01,0xFF,0xFF]);
    } else if (adr < dataReg.length) {
      ard0 = adr & 0x00FF;
      adr1 = ( adr & 0xFF00 ) >> 8;
      this.write([0x01,0x01,0x01,adr1,ard0]);
    }
    return;
  }
  /*----------------------------------------*/
  return;
}
//------------------------------------------------------------------------------
module.exports.EnrrganController = EnrrganController;

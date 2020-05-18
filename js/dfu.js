/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const remote     = require('electron').remote;
var   usb        = require('usb');
const alerts     = require('./alerts.js');
/*----------------------------------------------------------------------------*/
const dfu = {
  cmd : {
    DETACH              : 0x00,  /* Requests the device to leave DFU mode and enter the application */
    DNLOAD              : 0x01,  /* Requests data transfer from Host to the device in order to load them into device internal Flash memory. Includes also erase commands */
    UPLOAD              : 0x02,  /* Requests data transfer from device to Host in order to load content of device internal Flash memory into a Host file */
    GETSTATUS           : 0x03,  /* Requests device to send status report to the Host (including status resulting from the last request execution and the state the device will enter immediately after this request) */
    CLRSTATUS           : 0x04,  /* Requests device to clear error status and move to next step */
    GETSTATE            : 0x05,  /* Requests the device to send only the state it will enter immediately after this request */
    ABORT               : 0x06,  /* Requests device to exit the current state/operation and enter idle state immediately */
  },
  stat : {
    IDLE                : 0x02,
    DNLOAD_SYNC         : 0x03,
    DNBUSY              : 0x04,
    DNLOAD_IDLE         : 0x05,
    MANIFEST_SYNC       : 0x06,
    MANIFEST            : 0x07,
    MANIFEST_WAIT_RESET : 0x08,
    UPLOAD_IDLE         : 0x09,
    ERROR               : 0x0A,
  },
  appIDLE                : 0x00,
  appDETACH              : 0x01,
  STATUS_OK              : 0x00,
};

const bmRequestType = {
  class : 0xA1,
  iface : 0x21,
  host  : 0x21,
}

const sectorType = {
  r   : 'r',
  e   : 'e',
  re  : 're',
  w   : 'w',
  rw  : 'rw',
  ew  : 'ew',
  rew : 'rew',
}
/*----------------------------------------------------------------------------*/
function sector( string ) {
  /*------------------ Private ------------------*/
  var strInd = 0;
  var endInd = 0;
  /*------------------- Public ------------------*/
  this.count = 0;
  this.size  = 0;
  this.type  = 0;
  /*---------------------------------------------*/
  strInd     = string.indexOf("*");
  endInd     = string.search("K");
  this.count = parseInt( string.substr( 0, strInd ) );
  this.size  = parseInt( string.substr( ( strInd + 1 ), endInd - 3 ) );
  switch ( string.substr( endInd+1, string.length )  ) {
    case 'a':
      this.type = sectorType.r;
      break;
    case 'b':
      this.type = sectorType.e;
      break;
    case 'c':
      this.type = sectorType.re;
      break;
    case 'd':
      this.type = sectorType.w;
      break;
    case 'e':
      this.type = sectorType.rw;
      break;
    case 'f':
      this.type = sectorType.ew;
      break;
    case 'g':
      this.type = sectorType.rew;
      break;
  }
  /*---------------------------------------------*/
  return;
}

function memory( string ) {
  /*------------------ Private ------------------*/
  var strInd    = 0;
  var midInd    = 0;
  var endInd    = 0;
  var endFl     = 0;
  var sectorStr = "";
  /*------------------- Public ------------------*/
  this.type  = "";
  this.start = 0;
  this.sector = [];
  /*---------------------------------------------*/
  strInd = string.search("@");
  endInd = string.search("/");
  this.type = string.substr( ( strInd + 1 ), ( endInd - 1 ) );
  string = string.substr( ( endInd + 1 ), string.length );
  endInd = string.search("/");
  this.start = parseInt( string.substr( 0, endInd ) );
  string = string.substr( ( endInd + 1 ), string.length );
  while ( endFl == 0 ) {
    endInd = string.search(",");
    if ( endInd > 0 ) {
      this.sector.push( new sector( string.substr( 0, endInd ) ) );
      string = string.substr( ( endInd + 1 ), string.length );
    } else {
      this.sector.push( new sector( string ) );
      endFl = 1;
    }
  }
  /*---------------------------------------------*/
  return;
}
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
function dfuDevice() {
  /*------------------ Private ------------------*/
  const ifaceN = 0;
  var   self   = this;
  var   device = null;
  var   iface  = null;
  var   opened = false;
  /*------------------- Public ------------------*/
  this.manufacturer = "No";
  this.product      = "No";
  this.serial       = "No";
  this.memory       = {};

  this.buffer = [];
  /*---------------------------------------------*/
  this.init = function( callback ) {
    device = usb.findByIds( 0x0483, 0xDF11 );
    if ( device != null ) {
      try {
        device.open();
        device.getStringDescriptor( device.deviceDescriptor.iManufacturer, function( error, string ) {
          self.manufacturer = string;
          device.getStringDescriptor( device.deviceDescriptor.iProduct, function( error, string ) {
            self.product = string;
            device.getStringDescriptor( device.deviceDescriptor.iSerialNumber, function( error, string ) {
              self.serial = string;
              iface = device.interface( ifaceN );
              iface.claim();
              device.getStringDescriptor( iface.descriptor.iInterface, function( error, flashDescriptor ) {
                this.memory = new memory( flashDescriptor );
                opened      = true;
                let alert   = new alerts.Alert( "alert-success", alerts.okIco, "Устройство подключено по USB в DFU режиме" );
                callback();
              });
            });
          });
        });
      } catch (e) {
        device = null;
        let alert = new alerts.Alert("alert-warning",alerts.triIco,"Устройство занято другим приложением");
      }
    } else {
      let alert = new alerts.Alert("alert-warning",alerts.triIco,"Устройство не подключенно");
    }
    return;
  }
  /*---------------------------------------------*/
  this.request = async function ( bRequest, wLength, wValue = 0 ) {
    return await new Promise( function (resolve, reject) {
      device.controlTransfer( bmRequestType.class, bRequest, wValue, ifaceN, wLength, async function( error, data ) {
        resolve( data );
      });
    });
  }
  /*---------------------------------------------*/
  this.upload = async function( wBlockNum, length ) {
    let firmware = await thus.request( dfu.cmd.UPLOAD, length, wBlockNum );
    return firmware;
  }
  /*---------------------------------------------*/
  this.getStatus = async function () {
    let status = await this.request( dfu.cmd.GETSTATUS, 6 );
    return status;
  }
  /*---------------------------------------------*/
  this.getState = async function () {
    let state = await this.request( dfu.cmd.GETSTATE, 1 );
    return state[0];
  }
  /*---------------------------------------------*/
  this.close = function () {
    if ( device != null ) {
      device.close();
      device = null;
      let alert   = new alerts.Alert( "alert-success", alerts.okIco, "Контроллер отключен. Требуеться перезагрузка." );
    }
    return;
  }
  /*---------------------------------------------*/
  this.init( function () {
    self.getState();
  });
  this.close();
  return;
}
/*----------------------------------------------------------------------------*/
var dfuDevice = new dfuDevice();
/*----------------------------------------------------------------------------*/

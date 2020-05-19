/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const remote     = require('electron').remote;
var   usb        = require('usb');
const alerts     = require('./alerts.js');
/*----------------------------------------------------------------------------*/
const minTransferSize = 2;
const maxTransferSize = 1024;
const dfu = {
  cmd : {
    DETACH                 : 0x00,  /* Requests the device to leave DFU mode and enter the application */
    DNLOAD                 : 0x01,  /* Requests data transfer from Host to the device in order to load them into device internal Flash memory. Includes also erase commands */
    UPLOAD                 : 0x02,  /* Requests data transfer from device to Host in order to load content of device internal Flash memory into a Host file */
    GETSTATUS              : 0x03,  /* Requests device to send status report to the Host (including status resulting from the last request execution and the state the device will enter immediately after this request) */
    CLRSTATUS              : 0x04,  /* Requests device to clear error status and move to next step */
    GETSTATE               : 0x05,  /* Requests the device to send only the state it will enter immediately after this request */
    ABORT                  : 0x06,  /* Requests device to exit the current state/operation and enter idle state immediately */
  },
  state: {
    appIDLE                : 0x00,  /* Device is running its normal application */
    appDETACH              : 0x01,  /* Device is running its normal application, has received the DFU_DETACH request, and is waiting for a USB reset */
    dfuIDLE                : 0x02,  /* Device is operating in the DFU mode and is waiting for requests */
    dfuDNLOAD_SYNC         : 0x03,  /* Device has received a block and is waiting for the Host to solicit the status via DFU_GETSTATUS */
    dfuDNBUSY              : 0x04,  /* Device is programming a control-write block into its non volatile memories */
    dfuDNLOAD_IDLE         : 0x05,  /* Device is processing a download operation. Expecting DFU_DNLOAD requests */
    dfuMANIFEST_SYNC       : 0x06,  /* Device has received the final block of firmware from the Host and is waiting for receipt of DFU_GETSTATUS to begin the Manifestation phase or device has completed the Manifestation phase and is waiting for receipt of DFU_GETSTATUS. */
    dfuMANIFEST            : 0x07,  /* Device is in the Manifestation phase. */
    dfuMANIFEST_WAIT_RESET : 0x08,  /* Device has programmed its memories and is waiting for a USB reset or a power on reset. */
    dfuUPLOAD_IDLE         : 0x09,  /* The device is processing an upload operation. Expecting DFU_UPLOAD requests */
    dfuERROR               : 0x0A,  /*  An error has occurred. Awaiting the DFU_CLRSTATUS request. */
  },
  status : {
    OK                     : 0x00,  /* No error condition is present */
    errTARGET              : 0x01,  /* File is not targeted for use by this device */
    errFILE                : 0x02,  /* File is for this device but fails some vendor-specific verification test */
    errWRITE               : 0x03,  /* Device id unable to write memory */
    errERASE               : 0x04,  /* Memory erase function failed */
    errCHECK_ERASED        : 0x05,  /* Memory erase check failed */
    errPROG                : 0x06,  /* Program memory function failed */
    errVERIFY              : 0x07,  /* Programmed memory failed verification */
    errADDRESS             : 0x08,  /* Cannot program memory due to received address that is out of range */
    errNOTDONE             : 0x09,  /* Received DFU_DNLOAD with wLength = 0, but device does not think it has all the data yet. */
    errFIRMWARE            : 0x0A,  /* Device’s firmware is corrupted. It cannot return to run-time operations */
    errVENDOR              : 0x0B,  /* iString indicates a vendor-specific error */
    errUSBR                : 0x0C,  /* Device detected unexpected USB reset signaling */
    errPOR                 : 0x0B,  /* Device detected unexpected power on reset */
    errUNKNOWN             : 0x0E,  /* Something went wrong, but the device does not know what it was */
    errSTALLEDPK           : 0x0F,  /* Device stalled an unexpected request */
  },
};

const bmRequestType = {
  read  : 0xA1,
  write : 0x21,
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
  this.type   = "";
  this.start  = 0;
  this.size   = 0;
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
      this.size += this.sector[this.sector.length - 1].count * this.sector[this.sector.length - 1].size;
      string = string.substr( ( endInd + 1 ), string.length );
    } else {
      this.sector.push( new sector( string ) );
      this.size += this.sector[this.sector.length - 1].count * this.sector[this.sector.length - 1].size;
      endFl = 1;
    }
  }
  this.size *= 1024;
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
  /*---------------------------------------------*/
  function getRequestType ( read_not_write ) {
    var out = 0;
    if ( read_not_write > 0 ) {
      out = bmRequestType.read;
    } else {
      out = bmRequestType.write;
    }
    return out;
  }
  function strState ( state ) {
    var str = "No state";
    switch ( state ) {
      case dfu.state.appIDLE:
        str = "App idle"
        break;
      case dfu.state.appDETACH:
        str = "Detach"
        break;
      case dfu.state.dfuIDLE:
        str = "DFU idle"
        break;
      case dfu.state.dfuDNLOAD_SYNC:
        str = "Download synchronization"
        break;
      case dfu.state.dfuDNBUSY:
        str = "Download busy"
        break;
      case dfu.state.dfuDNLOAD_IDLE:
        str = "Download idle"
        break;
      case dfu.state.dfuMANIFEST_SYNC:
        str = "Manifest synchronization"
        break;
      case dfu.state.dfuMANIFEST:
        str = "Manifest"
        break;
      case dfu.state.dfuMANIFEST_WAIT_RESET:
        str = "Manifest wait reset"
        break;
      case dfu.state.dfuUPLOAD_IDLE:
        str = "Upload idle"
        break;
      case dfu.state.dfuERROR:
        str = "Error"
        break;
    }
    return str;
  }
  /*---------------------------------------------*/
  this.init = async function( callback ) {
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
                self.memory = new memory( flashDescriptor );
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
  this.request = async function ( bRequest, wLength, wValue = 0, read_not_write = 1 ) {
    return await new Promise( function (resolve, reject) {
      device.controlTransfer( getRequestType( read_not_write ), bRequest, wValue, ifaceN, wLength, async function( error, data ) {
        resolve( data );
      });
    });
  }
  /*---------------------------------------------*/
  this.detach = async function ( wTimeout ) {
    await thus.request( dfu.cmd.DETACH, Buffer.alloc(0), wTimeout, 0 );
    return;
  }
  /*---------------------------------------------*/
  this.download = async function ( data, wBlockNum ) {
    await thus.request( dfu.cmd.DNLOAD, data, wBlockNum, 0 );
    return;
  }
  /*---------------------------------------------*/
  this.upload = async function( length, wBlockNum ) {
    let data = await this.request( dfu.cmd.UPLOAD, length, wBlockNum );
    return data;
  }
  /*---------------------------------------------*/
  this.getStatus = async function () {
    let status = await this.request( dfu.cmd.GETSTATUS, 6 );
    return status ;
  }
  /*---------------------------------------------*/
  this.clearStatus = async function () {
    await this.request( dfu.cmd.CLRSTATUS, Buffer.alloc(0), 0, 0 );
    return;
  }
  /*---------------------------------------------*/
  this.getState = async function () {
    let state = await this.request( dfu.cmd.GETSTATE, 1 );
    //console.log( strState(state[0]) );
    return state[0];
  }
  /*---------------------------------------------*/
  this.abort = async function () {
    await this.request( dfu.cmd.ABORT, Buffer.alloc(0), 0, 0 );
    return;
  }
  /*---------------------------------------------*/
  this.clearToIdle = async function () {
    let state = await this.getState();
    while ( state == dfu.state.dfuERROR ) {
      await this.clearStatus();
      state = await this.getState();
    }
    return state;
  }
  /*---------------------------------------------*/
  this.abortToIdle = async function () {
    await this.abort();
    await this.clearToIdle();
    return;
  }
  /*---------------------------------------------*/
  this.uploadBlod = async function ( transferSize, size, startBlock = 0 ) {
    let bytesToRead = 0;
    let bytesGot    = 0;
    let result      = {};
    let blockCount  = startBlock + 2;
    let blocks      = [];

    if ( transferSize < minTransferSize ) {
      transferSize = minTransferSize;
    }
    if ( transferSize > maxTransferSize ) {
      transferSize = maxTransferSize;
    }

    await this.clearToIdle();
    //console.log("-----------------------");
    //console.log(">>Start uploading");
    do {
      bytesToRead = Math.min( transferSize, ( size - bytesGot ) );
      result      = await this.upload( bytesToRead, blockCount++ );
      if ( result.byteLength > 0 ) {
        blocks.push( result );
        bytesGot += result.length;
      }
    } while ( ( bytesGot < size ) && ( result.byteLength == bytesToRead ) )
    if ( bytesGot == size ) {
      await this.abortToIdle();
    }
    console.log(`Total read ${bytesGot} bytes`);
    //console.log("-----------------------");

    return blocks;
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
  this.init( async function () {
    //console.log(self.manufacturer);
    //console.log(self.product);
    //console.log(self.serial);
    console.log(self.memory);

    let blocks = [];
    let sector = [];
    var count = 0;
    //blob.push( await self.uploadBlod( 1024, ( self.memory.sector[0].size * 1024 ), count ) );

    for ( var i=0; i<self.memory.sector.length; i++ ) {
      for ( var j=0; j<self.memory.sector[i].count; j++ ) {
        sector = await self.uploadBlod( 1024, ( self.memory.sector[i].size * 1024 ), count );
        for ( var k=0; k<sector.length; k++ ) {
          blocks.push( sector[k] );
        }
        count += self.memory.sector[i].size;
      }
    }

    blob = new Blob( blocks, { type: "application/octet-stream" } );
    saveAs(blob, "firmware.bin");
  });

  //this.close();
  return;
}
/*----------------------------------------------------------------------------*/
var dfuDevice = new dfuDevice();
/*----------------------------------------------------------------------------*/

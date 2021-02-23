//const dataReg = require('../js/config.js').dataReg;
const RTC       = require('../js/rest').RTC;
const LogRecord = require('../js/rest').LogRecord;
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const msgSIZE         = 65;
const chartUnitLength = 18;
const msgCMD  = {
  "USB_GET_CONFIG_CMD"       : 1,
  "USB_PUT_CONFIG_CMD"       : 2,
  "USB_GET_CHART_CMD"        : 3,
  "USB_PUT_CHART_CMD"        : 4,
  "USB_PUT_EWA_CMD"          : 5,
  "USB_SAVE_CONFIG_CMD"      : 6,
  "USB_SAVE_CHART_CMD"       : 7,
  "USB_GET_TIME"             : 8,
  "USB_PUT_TIME"             : 9,
  "USB_GET_FREE_DATA"        : 10,
  'USB_PUT_FREE_DATA'        : 11,
  'USB_GET_LOG'              : 12,
  'USB_ERASE_LOG'            : 13,
  'USB_PUT_PASSWORD'         : 14,
  'USB_AUTHORIZATION'        : 15,
  'USB_ERASE_PASSWORD'       : 16,
  'USB_GET_MEMORY_SIZE'      : 17,
  'USB_GET_MEASUREMENT'      : 18,
  'USB_ERASE_MEASUREMENT'    : 19,
  'USB_GET_MEASUREMENT_LENGTH' : 20,
};
const msgSTAT = {
  "USB_OK_STAT"           : 1,
  "USB_BAD_REQ_STAT"      : 2,
  "USB_NON_CON_STAT"      : 3,
  "USB_STAT_UNAUTHORIZED" : 4,
  "USB_FORBIDDEN"         : 5,
  "USB_INTERNAL"          : 6,
};
const USB_DIR_BYTE  = 0;
const USB_CMD_BYTE  = 1;
const USB_STAT_BYTE = 2;
const USB_ADR1_BYTE = 3;
const USB_ADR0_BYTE = 4;
const USB_LEN2_BYTE = 5;
const USB_LEN1_BYTE = 6;
const USB_LEN0_BYTE = 7;
const USB_DATA_BYTE = 8;
const USB_DATA_SIZE = msgSIZE - USB_DATA_BYTE;
const USB_CHART_HEADER_LENGTH = 54;
/*----------------------------------------------------------------------------*/
function USBMessage ( buffer ) {
  /*------------------ Private ------------------*/
  var self = this;
  /*------------------- Public ------------------*/
  this.command = 0;      /* Command of mrssage   */
  this.status  = 0;      /* Status of message    */
  this.adr     = 0;      /* Target address       */
  this.length  = 0;      /* Length of full data  */
  this.data    = [];     /* Data of message      */
  this.buffer  = buffer; /* Copy input buffer    */
  /*---------------------------------------------*/
  function uint16toByte ( input, output ) {
    output.push(   input & 0x00FF );
    output.push( ( input & 0xFF00 ) >> 8 );
    return;
  }
  function byteToUint16 ( byte0, byte1 ) {
    return ( byte0 & 0xFF ) | ( ( byte1 & 0xFF ) << 8 );
  }
  function uint24ToByte ( data, byte0, byte1, byte2 ) {
    byte0 = ( data & 0x0000FF );
    byte1 = ( data & 0x00FF00 ) >> 8;
    byte2 = ( data & 0xFF0000 ) >> 16;
    return;
  }
  function byteToUint24 ( byte0, byte1, byte2 ) {
    return ( byte0 & 0xFF ) | ( ( byte1 & 0xFF ) << 8 ) | ( ( byte2 & 0xFF ) << 16 );
  }
  function uint32toByte ( input, output ) {
    output.push(     input & 0x000000FF );
    output.push( ( ( input & 0x0000FF00 ) >> 8 ) );
    output.push( ( ( input & 0x00FF0000 ) >> 16 ) );
    output.push( ( ( input & 0xFF000000 ) >> 24 ) );
    return;
  }
  function byteToUint32 ( byte0, byte1, byte2, byte3 ) {
    return ( byte0 & 0x000000FF ) | ( ( byte1 << 8 ) & 0x0000FF00 ) | ( ( byte2 << 16 )  & 0x00FF0000 ) | ( ( byte3 << 24 )  & 0xFF000000 );
  }
  function strToEncodeByte ( str, length, output ) {
    for ( var i=0; i<str.length; i++ ) {
      output.push( str.charAt( i ).charCodeAt() );
    }
    if ( length > str.length ) {
      for ( var i=0; i<( length - str.length ); i++ ) {
        output.push( 0x00 );
      }
    }
    return;
  }
  function encodeByteToStr ( data, length ) {
    var buffer = "";
    for ( var i=0; i<length; i++ ) {
      if ( data[i] != 0 ){
        buffer += String.fromCharCode( data[i] );
      }
    }
    return buffer;
  }
  function cleanBuffer ( buffer, callback ) {
    buffer = [];
    for( var i=0; i<6; i++ ){
      buffer.push( 0 );
    }
    callback();
    return;
  }
  function setup ( buffer, callback ) {
    buffer[USB_DIR_BYTE]  = 0x01;          /* 1st channel for sending via USB */
    buffer[USB_CMD_BYTE]  = self.command;
    buffer[USB_STAT_BYTE] = self.status;
    buffer[USB_ADR0_BYTE] =   self.adr & 0x00FF;
    buffer[USB_ADR1_BYTE] = ( self.adr & 0xFF00 ) >> 8;
    buffer[USB_LEN0_BYTE] = ( self.length & 0x0000FF );
    buffer[USB_LEN1_BYTE] = ( self.length & 0x00FF00 ) >> 8;
    buffer[USB_LEN2_BYTE] = ( self.length & 0xFF0000 ) >> 16;
    self.data = [];
    callback();
    return;
  }
  function parsingCommandByte () {
    switch ( self.buffer[USB_CMD_BYTE] ) {
      case msgCMD.USB_GET_CONFIG_CMD:
        self.command = msgCMD.USB_GET_CONFIG_CMD;
        break;
      case msgCMD.USB_PUT_CONFIG_CMD:
        self.command = msgCMD.USB_PUT_CONFIG_CMD;
        break;
      case msgCMD.USB_GET_CHART_CMD:
        self.command = msgCMD.USB_GET_CHART_CMD;
        break;
      case msgCMD.USB_PUT_CHART_CMD:
        self.command = msgCMD.USB_PUT_CHART_CMD;
        break;
      case msgCMD.USB_PUT_EWA_CMD:
        self.command = msgCMD.USB_PUT_EWA_CMD;
        break;
      case msgCMD.USB_SAVE_CONFIG_CMD:
        self.command = msgCMD.USB_SAVE_CONFIG_CMD;
        break;
      case msgCMD.USB_SAVE_CHART_CMD:
        self.command = msgCMD.USB_SAVE_CHART_CMD;
        break;
      case msgCMD.USB_GET_TIME:
        self.command = msgCMD.USB_GET_TIME;
        break;
      case msgCMD.USB_PUT_TIME:
        self.command = msgCMD.USB_PUT_TIME;
        break;
      case msgCMD.USB_GET_FREE_DATA:
        self.command = msgCMD.USB_GET_FREE_DATA;
        break;
      case msgCMD.USB_PUT_FREE_DATA:
        self.command = msgCMD.USB_PUT_FREE_DATA;
        break;
      case msgCMD.USB_GET_LOG:
        self.command = msgCMD.USB_GET_LOG;
        break;
      case msgCMD.USB_ERASE_LOG:
        self.command = msgCMD.USB_ERASE_LOG;
        break;
      case msgCMD.USB_PUT_PASSWORD:
        self.command = msgCMD.USB_PUT_PASSWORD;
        break;
      case msgCMD.USB_AUTHORIZATION:
        self.command = msgCMD.USB_AUTHORIZATION;
        break;
      case msgCMD.USB_ERASE_PASSWORD:
        self.command = msgCMD.USB_ERASE_PASSWORD;
        break;
      case msgCMD.USB_GET_MEMORY_SIZE:
        self.command = msgCMD.USB_GET_MEMORY_SIZE;
        break;
      case msgCMD.USB_GET_MEASUREMENT:
        self.command = msgCMD.USB_GET_MEASUREMENT;
        break;
      case msgCMD.USB_ERASE_MEASUREMENT:
        self.command = msgCMD.USB_ERASE_MEASUREMENT;
        break;
      case msgCMD.USB_GET_MEASUREMENT_LENGTH:
        self.command = msgCMD.USB_GET_MEASUREMENT_LENGTH;
        break;
      default:
        self.command = 0;
        self.status  = msgSTAT.USB_BAD_REQ_STAT;
        console.log("CMD error");
        break;
    }
    return;
  }
  function parsingStateByte () {
    switch ( self.buffer[USB_STAT_BYTE] ) {
      case msgSTAT.USB_OK_STAT:
        self.status = msgSTAT.USB_OK_STAT;
        break;
      case msgSTAT.USB_BAD_REQ_STAT:
        self.status = msgSTAT.USB_BAD_REQ_STAT;
        break;
      case msgSTAT.USB_NON_CON_STAT:
        self.status = msgSTAT.USB_NON_CON_STAT;
        break;
      case msgSTAT.USB_STAT_UNAUTHORIZED:
        self.status = msgSTAT.USB_STAT_UNAUTHORIZED;
        break;
      case msgSTAT.USB_FORBIDDEN:
        self.status = msgSTAT.USB_FORBIDDEN;
        break;
      case msgSTAT.USB_INTERNAL:
        self.status = msgSTAT.USB_INTERNAL;
        break;
      default:
        self.status = msgSTAT.USB_BAD_REQ_STAT;
        break;
    }
    return;
  }
  function parsingAddressByte () {
    self.adr = byteToUint16( self.buffer[USB_ADR0_BYTE], self.buffer[USB_ADR1_BYTE] );
    return;
  }
  function parsingLengthByte () {
    self.length = byteToUint24( self.buffer[USB_LEN0_BYTE], self.buffer[USB_LEN1_BYTE], self.buffer[USB_LEN2_BYTE] );
    return;
  }
  function parsingDataBytes () {
    if ( self.status != msgSTAT.USB_BAD_REQ_STAT ) {
      self.data   = [];
      for ( var i=USB_DATA_BYTE; i<msgSIZE; i++ ) {
        self.data.push( self.buffer[i] );
      }
    }
  }
  function setupLength ( buffer ) {
    uint24ToByte( self.length, buffer[USB_LEN0_BYTE], buffer[USB_LEN1_BYTE], buffer[USB_LEN2_BYTE] );
    return;
  }
  function finishMesageWithZero ( buffer ) {
    for ( var i=buffer.length; i<msgSIZE; i++ ) {
      buffer.push( 0 );
    }
  }
  function makeRequest ( cmd, adr ) {
    self.status  = msgSTAT.USB_OK_STAT;
    self.command = cmd;
    self.adr     = adr;
    self.length  = 0;
    self.data    = [];
    self.buffer  = [ 0, 0, 0, 0, 0, 0, 0, 0];
    setup( self.buffer, function () {
      finishMesageWithZero( self.buffer );
    });
  }
  function makeResponse ( cmd, adr, data, length ) {
    self.status  = msgSTAT.USB_OK_STAT;
    self.command = cmd;
    self.adr     = adr;
    self.length  = length;
    self.data    = [];
    self.buffer  = [ 0, 0, 0, 0, 0, 0, 0, 0];
    setup( self.buffer, function () {
      for ( var i=0; i<data.length; i++ ) {
        self.buffer.push( data[i] );
      }
      finishMesageWithZero( self.buffer );
    });
  }
  function parseConfig ( reg ) {
    var counter = 0;
    /*----------- Configuration value -----------*/
    if ( reg.len == 1 ) {
      reg.value = byteToUint16( self.data[counter], self.data[counter + 1] );
      counter  += 2;
    } else {
      reg.value = [];
      for ( var i=0; i<reg.len; i++ ) {
        if ( reg.type == 'C' ) {
          let dig = byteToUint16( self.data[counter + i * 2], self.data[counter + i * 2 + 1] )
          if ( dig < 0x0020 ) {
            dig = 0x0020;
          }
          let input = String.fromCharCode( parseInt( ( dig ).toString( 10 ) ) );
          reg.value.push( input );
        } else {
          reg.value.push( byteToUint16( self.data[counter + i * 2], self.data[counter + i * 2 + 1] ) );
        }
      }
      counter += reg.len * 2;
    }
    /*-------------------------------------------*/
    return;
  }
  function parseChart ( n ) {
    var counter = 0;
    var buffer  = [];
    var chart = {
      "xmin"  : 0,
      "xmax"  : 0,
      "ymin"  : 0,
      "ymax"  : 0,
      "xunit" : "",
      "yunit" : "",
      "size"  : 0,
      "dots"  : []
    };
    var dot = {
      "x" : 0,
      "y" : 0
    };
    if ( self.data.length > 0 ) {
      counter = 0;
      chart.xmin = byteToUint32( self.data[counter], self.data[counter+1], self.data[counter+2], self.data[counter+3] );
      counter += 4;
      chart.xmax = byteToUint32( self.data[counter], self.data[counter+1], self.data[counter+2], self.data[counter+3] );
      counter += 4;
      chart.ymin = byteToUint32( self.data[counter], self.data[counter+1], self.data[counter+2], self.data[counter+3] );
      counter += 4;
      chart.ymax = byteToUint32( self.data[counter], self.data[counter+1], self.data[counter+2], self.data[counter+3] );
      counter += 4;
      buffer  = [];
      for ( var i=0; i<chartUnitLength; i++ ) {
        buffer.push( self.data[counter+i] );
      }
      chart.xunit = encodeByteToStr( buffer, chartUnitLength );
      counter += chartUnitLength;
      buffer  = [];
      for ( var i=0; i<chartUnitLength; i++ ) {
        buffer.push( self.data[counter+i] );
      }
      chart.yunit = encodeByteToStr( buffer, chartUnitLength );
      counter    += chartUnitLength;
      chart.size = byteToUint16( self.data[counter], self.data[counter+1] );
      counter    += 2;
      for ( var i=0; i<chart.size; i++ ) {
        dot.x = byteToUint32( self.data[counter], self.data[counter+1], self.data[counter+2], self.data[counter+3] );
        counter += 4;
        dot.y = byteToUint32( self.data[counter], self.data[counter+1], self.data[counter+2], self.data[counter+3] );
        counter += 4;
        chart.dots.push( dot );
        dot = {};
      }
    }
    return chart;
  }
  function parseTime () {
    time = new RTC();
    time.hour  = self.data[0];
    time.min   = self.data[1];
    time.sec   = self.data[2];
    time.year  = self.data[3];
    time.month = self.data[4];
    time.day   = self.data[5];
    time.wday  = self.data[6];
    return time;
  }
  function parseFreeData () {
    return byteToUint16( self.data[0], self.data[1] );
  }
  function parseLog () {
    let time   = byteToUint32( self.data[0], self.data[1], self.data[2], self.data[3] );
    time       = ( new Uint32Array( [time] ) )[0];
    let type   = self.data[4];
    let action = self.data[5];
    let record = new LogRecord( type, action, time );
    return record;
  }
  function parseMemorySize () {
    return byteToUint32( self.data[0], self.data[1], self.data[2], self.data[3] );
  }
  function parseMeasurement ( length ) {
    let measure = [];
    let size    = Math.trunc( length / 2 );
    for ( var i=0; i<size; i++ ) {
      measure.push( byteToUint16( self.data[i*2], self.data[i*2 + 1] ) );
    }
    return measure;
  }
  function parseMeasurementLength () {
    return byteToUint16( self.data[0], self.data[1] );
  }
  /*--------------------------------------------------------------------------*/
  this.init                   = function ( callback ) {
    parsingCommandByte();  /* Parsing command byte */
    parsingStateByte();    /* Parsing state byte */
    parsingAddressByte();  /* Parsing address bytes */
    parsingLengthByte();   /* Parsing length bytes */
    parsingDataBytes();    /* Parsing data bytes */
    /*--------------------------------------------------------*/
    callback();
    return;
  }
  this.initLong               = function () {
    self.init( function() {
      if ( self.command == msgCMD.USB_GET_CHART_CMD ) {
        self.data.length = USB_CHART_HEADER_LENGTH;
      }
    });
    return;
  }
  this.addLong                = function ( byte ) {
    if ( self.length > self.data.length ) {
      self.data.push( byte );
    }
    return;
  }
  this.makeConfigRequest      = function ( n ) {
    makeRequest( msgCMD.USB_GET_CONFIG_CMD, n );
    return;
  }
  this.makeChartRequest       = function ( adr ) {
    makeRequest( msgCMD.USB_GET_CHART_CMD, adr );
    return;
  }
  this.makeTimeRequest        = function () {
    makeRequest( msgCMD.USB_GET_TIME, 0 );
    return;
  }
  this.makeFreeDataRequest    = function ( adr ) {
    makeRequest( msgCMD.USB_GET_FREE_DATA, adr );
    return;
  }
  this.makeLogRequest         = function ( adr ) {
    makeRequest( msgCMD.USB_GET_LOG, adr );
    return;
  }
  this.makeMemorySizeRequest  = function () {
    makeRequest( msgCMD.USB_GET_MEMORY_SIZE, 0 );
    return;
  }
  this.makeMeasurementRequest = function ( adr ) {
    makeRequest( msgCMD.USB_GET_MEASUREMENT, adr );
    return;
  }
  this.makeMeasurementLengthRequest = function () {
    makeRequest( msgCMD.USB_GET_MEASUREMENT_LENGTH, 0 );
    return;
  }
  this.codeAuthorization      = function ( pas ) {
    let data = [ (pas & 0x00FF), ( ( pas & 0xFF00 ) >> 8 ) ];
    makeResponse( msgCMD.USB_AUTHORIZATION, 0, data, data.length );
    return;
  }
  this.codeLogErase           = function () {
    makeRequest( msgCMD.USB_ERASE_LOG, 0 );
    return;
  }
  this.codePassword           = function ( password ) {
    let data = [ ( password.enb & 0xFF ), ( password.data & 0x00FF), ( ( password.data & 0xFF00 ) >> 8 ) ];
    makeResponse( msgCMD.USB_PUT_PASSWORD, 0, data, data.length );
    return;
  }
  this.codeTime               = function ( time ) {
    let data = [ ( time.hour  & 0xFF ),
                 ( time.min   & 0xFF ),
                 ( time.sec   & 0xFF ),
                 ( time.year  & 0xFF ),
                 ( time.month & 0xFF ),
                 ( time.day   & 0xFF ),
                 ( time.wday  & 0xFF ),
               ];
    makeResponse( msgCMD.USB_PUT_TIME, 0, data, data.length );
    return;
  }
  this.codeFreeData           = function ( adr, data ) {
    let output = [ ( data & 0x00FF ), ( ( data & 0xFF00 ) >> 8 ) ];
    makeResponse( msgCMD.USB_PUT_FREE_DATA, adr, output, output.length );
    return;
  }
  this.codeConfig             = function ( reg, adr ) {
    let data = [];
    /*----------- Configuration value -----------*/
    if ( reg.len == 1 ) {
      data.push(   reg.value & 0x00FF );
      data.push( ( reg.value & 0xFF00 ) >> 8 );
    } else {
      for ( var i=0; i<reg.len; i++ ) {
        if ( reg.type == "C" ) {
          let char = reg.value[i].charCodeAt( 0 ).toString( 10 );
          data.push(   char & 0x00FF );
          data.push( ( char & 0xFF00 ) >> 8 );
        } else {
          data.push(   reg.value[i] & 0x00FF );
          data.push( ( reg.value[i] & 0xFF00 ) >> 8 );
        }
      }
    }
    /*-------------------------------------------*/
    makeResponse( msgCMD.USB_PUT_CONFIG_CMD, adr, data, data.length );
    return;
  }
  this.codeSaveConfigs        = function () {
    makeRequest( msgCMD.USB_SAVE_CONFIG_CMD, 0 );
    return;
  }
  this.codeSaveCharts         = function () {
    makeRequest( msgCMD.USB_SAVE_CHART_CMD, 0 );
    return;
  }
  this.codeChart              = function ( chart, adr ) {
    self.status  = msgSTAT.USB_OK_STAT;
    self.command = msgCMD.USB_PUT_CHART_CMD;
    self.adr     = adr;
    self.length  = 0;
    const dataLength = msgSIZE - 5;
    if ( chart.hasOwnProperty("data") == false ) {
      self.length = 18 + chartUnitLength*2 + 8*chart.size;
      self.buffer.push( [] );
      setup( self.buffer[0], function () {
        uint32toByte( chart.xmin, self.buffer[0] );                       /* 6 */
        uint32toByte( chart.xmax, self.buffer[0] );                       /* 10 */
        uint32toByte( chart.ymin, self.buffer[0] );                       /* 14 */
        uint32toByte( chart.ymax, self.buffer[0] );                       /* 18 */

        strToEncodeByte( chart.xunit, chartUnitLength, self.buffer[0] );  /* 36 */
        strToEncodeByte( chart.yunit, chartUnitLength, self.buffer[0] );  /* 54 */
        uint16toByte( chart.size, self.buffer[0] );
        setupLength( self.buffer[0] );
        finishMesageWithZero( self.buffer[0] );
        var dotLen  = Math.ceil(chart.size*8 / dataLength);
        var dotNum  = Math.trunc( dataLength / 8 );
        var lastNum = chart.size - dotNum*( dotLen - 1 );

        for ( var i=0; i<dotLen; i++ ) {
          self.buffer.push( [] );
          setup( self.buffer[i + 1], function () {
            var border = dotNum;
            if ( i == ( dotLen - 1) ) {
              border = lastNum;
            }
            for ( var j=0; j<border; j++ ) {
              uint32toByte( chart.dots[j].x, self.buffer[i + 1] );
              uint32toByte( chart.dots[j].y, self.buffer[i + 1] );
            }
          });
          setupLength( self.buffer[i + 1] );
          finishMesageWithZero( self.buffer[i + 1] );
        }
      });
    } else {
      cleanBuffer( self.buffer, function () {
        setup( self.buffer, function () {
        });
      });
      setupLength( self.buffer );
      finishMesageWithZero( self.buffer );
    }
  }
  this.codeEWA                = function ( ewa, index ) {
    let data    = [];
    var counter = index;
    for ( var i=USB_DATA_BYTE; i<msgSIZE; i++ ) {
      if ( ewa.length > counter ) {
        data.push( ewa[counter] );
      } else {
        data.push( 0x00 );
      }
      counter++;
    }
    makeResponse( msgCMD.USB_PUT_EWA_CMD, 0, data, ewa.length);
/*
    var counter  = index;
    self.status  = msgSTAT.USB_OK_STAT;
    self.command = msgCMD.USB_PUT_EWA_CMD;
    self.adr     = 0;
    setup( self.buffer, function () {
      for ( var i=USB_DATA_BYTE; i<msgSIZE; i++ ) {
        if ( ewa.length > counter ) {
          self.buffer.push( ewa[counter] );
        } else {
          self.buffer.push( 0x00 );
        }
        counter++;
      }
    });
    self.length = ewa.length;
    setupLength( self.buffer );
    */
    return counter;
  }
  this.codeMeasurementErase   = function () {
    makeRequest( msgCMD.USB_ERASE_MEASUREMENT, 0 );
    return;
  }
  this.parse                  = function ( configs ) {
    var output = 0;
    var type   = 0;
    switch ( self.command ) {
      case msgCMD.USB_GET_CONFIG_CMD:
        parseConfig( configs[self.adr] );
        type = 1;
        break;
      case msgCMD.USB_GET_CHART_CMD:
        output = parseChart( self.adr );
        type   = 2;
        break;
      case msgCMD.USB_GET_TIME:
        output = parseTime();
        type   = 3;
        break;
      case msgCMD.USB_GET_FREE_DATA:
        output = parseFreeData();
        type   = 4;
        break;
      case msgCMD.USB_GET_LOG:
        output = parseLog();
        type   = 5;
        break;
      case msgCMD.USB_GET_MEMORY_SIZE:
        output = parseMemorySize();
        type   = 6;
        break;
      case msgCMD.USB_GET_MEASUREMENT:
        output = parseMeasurement( self.length );
        type   = 7;
        break;
      case msgCMD.USB_GET_MEASUREMENT_LENGTH:
        output = parseMeasurementLength();
        type   = 8;
    }
    return [type, output];
  }
  /*---------------------------------------------*/
  return;
}
/*----------------------------------------------------------------------------*/
module.exports.USBMessage              = USBMessage;
module.exports.msgCMD                  = msgCMD;
module.exports.msgSTAT                 = msgSTAT;
module.exports.msgSIZE                 = msgSIZE;
module.exports.USB_DATA_SIZE           = USB_DATA_SIZE;
module.exports.USB_DATA_BYTE           = USB_DATA_BYTE;
module.exports.USB_CHART_HEADER_LENGTH = USB_CHART_HEADER_LENGTH;
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/

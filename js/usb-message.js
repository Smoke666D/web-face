/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const msgSIZE         = 65;
const chartUnitLength = 18;
const msgCMD  = {
  "USB_GET_CONFIG_CMD" : 1,
  "USB_PUT_CONFIG_CMD" : 2,
  "USB_GET_CHART_CMD"  : 3,
  "USB_PUT_CHART_CMD"  : 4,
  "USB_PUT_EWA_CMD"    : 5 };
const msgSTAT = {
  "USB_OK_STAT"      : 1,
  "USB_BAD_REQ_STAT" : 2,
  "USB_NON_CON_STAT" : 3 };
const USB_DIR_BYTE  = 0;
const USB_CMD_BYTE  = 1;
const USB_STAT_BYTE = 2;
const USB_ADR1_BYTE = 3;
const USB_ADR0_BYTE = 4;
const USB_LEN2_BYTE = 5;
const USB_LEN1_BYTE = 6;
const USB_LEN0_BYTE = 7;
const USB_DATA_BYTE = 8;
/*----------------------------------------------------------------------------*/
function USBMessage ( buffer ) {
  /*------------------ Private ------------------*/
  var self = this;
  /*------------------- Public ------------------*/
  this.command = 0;
  this.status  = 0;
  this.adr     = 0;
  this.length  = 0;
  this.data    = [];

  this.buffer  = buffer;
  /*---------------------------------------------*/
  function uint16toByte ( input, output ) {
    output.push( ( input & 0x00FF ) );
    output.push( ( ( input & 0xFF00 ) >> 8 ) );
    return;
  }
  function byteToUint16 ( byte0, byte1 ) {
    return ( byte1 & 0x00FF ) | ( ( byte0 & 0xFF00 ) >> 8 );
  }
  function uint32toByte ( input, output ) {
    output.push( (input & 0x000000FF) );
    output.push( ( (input & 0x0000FF00) >> 8 ) );
    output.push( ( (input & 0x00FF0000) >> 16 ) );
    output.push( ( (input & 0xFF000000) >> 24 ) );
    return;
  }
  function byteToUint32 ( byte0, byte1, byte2, byte3 ) {
    return ( byte3 & 0x000000FF ) | ( ( byte2 << 8 ) & 0x0000FF00 ) | ( ( byte1 << 16 )  & 0x00FF0000 ) | ( ( byte0 << 24 )  & 0xFF000000 );
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
    buffer[USB_ADR1_BYTE] = ( self.adr & 0xFF00 ) >> 8;
    buffer[USB_ADR0_BYTE] = self.adr & 0x00FF;
    buffer[USB_LEN2_BYTE] = 0;
    buffer[USB_LEN1_BYTE] = 0;
    buffer[USB_LEN0_BYTE] = 0;
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
      default:
        self.status = msgSTAT.USB_BAD_REQ_STAT;
        break;
    }
    return;
  }
  function parsingAddressByte () {
    self.adr = ( self.buffer[USB_ADR1_BYTE] << 8 ) | ( self.buffer[USB_ADR0_BYTE] );
    return;
  }
  function parsingLengthByte () {
    self.length = ( self.buffer[USB_LEN2_BYTE] << 16 ) |
                  ( self.buffer[USB_LEN1_BYTE] <<  8 ) |
                  ( self.buffer[USB_LEN0_BYTE] );
    return;
  }
  function parsingDataBytes () {
    if ( self.status != msgSTAT.USB_BAD_REQ_STAT ) {
      self.data   = [];
      for( var i=0; i<self.length; i++ ) {
        self.data.push( self.buffer[USB_DATA_BYTE + i] );
      }
    }
  }
  function setupLength ( buffer ) {
    buffer[USB_LEN2_BYTE] = ( self.length & 0xFF0000 ) >> 16;
    buffer[USB_LEN1_BYTE] = ( self.length & 0x00FF00 ) >> 8;
    buffer[USB_LEN0_BYTE] = ( self.length & 0x0000FF );
    return;
  }
  function finishMesageWithZero ( buffer ) {
    for ( var i=buffer.length; i<msgSIZE; i++ ) {
      buffer.push( 0 );
    }
  }
  function parseConfig ( n ) {
    var counter = 0;
    var value   = 0;
    /*----------- Configuration value -----------*/
    if ( dataReg[n].len == 1 ) {
      dataReg[n].value = ( ( self.data[counter] << 8 ) & 0xFF00 ) | ( self.data[counter + 1] & 0x00FF );
      counter += 2;
    } else {
      dataReg[n].value = [];
      for ( var i=0; i<dataReg[n].len; i++ ) {
        if ( dataReg[n].type == 'S' ) {
          value = ( ( self.data[counter + i * 2]     << 24 ) & 0xFF000000 ) |
                  ( ( self.data[counter + i * 2 + 1] << 16 ) & 0xFF0000 )   |
                  ( ( self.data[counter + i * 2 + 2] << 8 )  & 0xFF00 )     |
                  (   self.data[counter + i * 2 + 3]         & 0xFF );
          dataReg[n].value.push( decodeURI( value ) );
        } else {
          dataReg[n].value.push( ( ( self.data[counter + i * 2] << 8 ) & 0xFF00 ) |
                                 (   self.data[counter + i * 2 + 1]    & 0xFF ) );
        }
      }
      counter += dataReg[n].len * 2;
    }
    /*----------- Configuration scale -----------*/
    dataReg[n].scale = self.data[counter++]
    /*----------- Configuration units -----------*/
    strBuffer = "";
    for ( var i=counter; i<self.length; i++ ) {
      strBuffer += String.fromCharCode( self.data[i] );
    }
    dataReg[n].units = decodeURI( strBuffer );
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
      chart.xmin = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
      counter += 4;
      chart.xmax = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
      counter += 4;
      chart.ymin = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
      counter += 4;
      chart.ymax = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
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
      counter += chartUnitLength;

      chart.size = byteToUint16( self.data[counter+1], self.data[counter] );
      counter += 2;

      for ( var i=0; i<chart.size; i++ ) {
        dot.x = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
        counter += 4;
        dot.y = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
        counter += 4;
        chart.dots.push( dot );
        dot = {};
      }
    }

    return chart;
  }
  /*--------------------------------------------------------------------------*/
  this.init       = function ( callback ) {
    parsingCommandByte();  /* Parsing command byte */
    parsingStateByte();    /* Parsing state byte */
    parsingAddressByte();  /* Parsing address bytes */
    parsingLengthByte();   /* Parsing length bytes */
    parsingDataBytes();    /* Parsing data bytes */
    /*--------------------------------------------------------*/
    callback();
    return;
  }
  this.getRawAdr  = function () {
    return ( this.buffer[USB_ADR1_BYTE] << 8 ) | ( this.buffer[USB_ADR0_BYTE] );
  }
  this.getRawLen  = function () {
    return ( this.buffer[USB_LEN2_BYTE] << 16 ) |
           ( this.buffer[USB_LEN1_BYTE] <<  8 ) |
           ( this.buffer[USB_LEN0_BYTE] );
  }
  this.getRawSize = function() {
    return this.buffer[58];
  }
  this.codeConfig = function ( n ) {
    self.status  = msgSTAT.USB_OK_STAT;
    self.command = msgCMD.USB_PUT_CONFIG_CMD;
    self.adr     = n;
    setup( self.buffer, function () {
      self.length = 0;
      /*----------- Configuration value -----------*/
      for ( var i=0; i<dataReg[n].len; i++ ) {
        self.buffer.push( ( dataReg[n].value[i] & 0xFF00 ) >> 8 );
        self.buffer.push( dataReg[n].value[i] & 0x00FF );
        self.length += 2;
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
      setupLength( self.buffer );
      finishMesageWithZero( self.buffer );
      /*-------------------------------------------*/
      return;
    });
    return;
  }
  this.codeChart  = function ( chart, adr ) {
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
  this.codeEWA    = function ( ewa, index ) {
    var counter  = index;
    self.status  = msgSTAT.USB_OK_STAT;
    self.command = msgCMD.USB_PUT_CONFIG_CMD;
    self.adr     = 0;
    setup( self.buffer, function () {
      for ( var i=USB_DATA_BYTE; i<msgSIZE; i++ ) {
        if ( ewa.len <= counter ) {
          self.buffer.push( ewa[counter] );
        } else {
          self.buffer.push( 0x00 );
        }
        counter++;
      }
      self.length = counter - index;
    });
    setupLength( self.buffer );
    index = self.length;
    return;
  }
  this.parse      = function ( n ) {
    var output = 0;
    var type   = 0;
    switch ( self.command ) {
      case msgCMD.USB_GET_CONFIG_CMD:
        parseConfig( n );
        type = 1;
        break;
      case msgCMD.USB_GET_CHART_CMD:
        output = parseChart( n );
        type = 2;
        break;
    }
    return [type, output];
  }
  /*---------------------------------------------*/
  return;
}
/*----------------------------------------------------------------------------*/
module.exports.USBMessage = USBMessage;
module.exports.msgCMD     = msgCMD;
module.exports.msgSTAT    = msgSTAT;
module.exports.msgSIZE    = msgSIZE;
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/

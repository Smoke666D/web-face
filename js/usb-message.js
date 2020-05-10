/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const msgSIZE         = 65;
const chartUnitLength = 18;
const msgCMD  = {
  "USB_GET_CONFIG_CMD" : 1,
  "USB_PUT_CONFIG_CMD" : 2,
  "USB_GET_CHART_CMD"  : 3,
  "USB_PUT_CHART_CMD"  : 4 };
const msgSTAT = {
  "USB_OK_STAT"      : 1,
  "USB_BAD_REQ_STAT" : 2,
  "USB_NON_CON_STAT" : 3 };
/*----------------------------------------------------------------------------*/
function USBMessage ( buffer ) {
  /*------------------ Private ------------------*/
  var self = this;
  /*------------------- Public ------------------*/
  this.command = 0;
  this.status  = 0;
  this.adr     = 0;
  this.length  = 0;
  this.buffer  = buffer;
  this.data    = [];
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
    buffer[0] = 0x01;  /* 1st channel for sending via USB */
    buffer[1] = self.command;
    buffer[2] = self.status;
    buffer[3] = ( self.adr & 0xFF00 ) >> 8;
    buffer[4] = self.adr & 0x00FF;
    buffer[5] = 0;
    self.data      = [];
    callback();
    return;
  }
  function setupLength ( buffer ) {
    buffer[5] = self.length;
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
          value = ( ( self.data[counter + i * 2] << 24 ) & 0xFF000000 ) | ( ( self.data[counter + i * 2 + 1] << 16 ) & 0xFF0000 ) | ( ( self.data[counter + i * 2 + 2] << 8 ) & 0xFF00 ) | ( self.data[counter + i * 2 + 3] & 0xFF )
          dataReg[n].value.push( decodeURI( value ) );
        } else {
          dataReg[n].value.push( ( ( self.data[counter + i * 2] << 8 ) & 0xFF00 ) | ( self.data[counter + i * 2 + 1] & 0xFF ) );
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
  /*---------------------------------------------*/
  this.init       = function ( callback ) {
    var shift = 0;
    /*----------------- Parsing command byte -----------------*/
    switch ( this.buffer[1] ) {
      case msgCMD.USB_GET_CONFIG_CMD:
        this.command = msgCMD.USB_GET_CONFIG_CMD;
        break;
      case msgCMD.USB_PUT_CONFIG_CMD:
        this.command = msgCMD.USB_PUT_CONFIG_CMD;
        break;
      case msgCMD.USB_GET_CHART_CMD:
        this.command = msgCMD.USB_GET_CHART_CMD;
        break;
      case msgCMD.USB_PUT_CHART_CMD:
        this.command = msgCMD.USB_PUT_CHART_CMD;
        break;
      default:
        this.command = 0;
        this.status  = msgSTAT.USB_BAD_REQ_STAT;
        console.log("CMD error");
        break;
    }
    /*------------------ Parsing state byte ------------------*/
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
    /*------------- Parsing address and length ---------------*/
    if ( this.status != msgSTAT.USB_BAD_REQ_STAT ) {
      this.adr    = ( this.buffer[3] << 8 ) | ( this.buffer[4] );
      this.length = this.buffer[5];
      this.data   = [];
      for( var i=0; i<this.length; i++ ) {
        this.data.push(this.buffer[6 + i]);
      }
    }
    /*--------------------------------------------------------*/
    callback();
    return;
  }
  this.getRawAdr  = function () {
    return ( this.buffer[3] << 8 ) | ( this.buffer[4] );
  }
  this.getRawLen  = function () {
    return this.buffer[5];
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

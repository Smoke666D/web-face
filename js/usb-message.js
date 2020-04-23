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
  this.data    = [];
  this.length  = 0;
  this.buffer  = buffer;
  /*---------------------------------------------*/
  function uint16toByte ( input, output ) {
    output.push( ( ( input & 0xFF00 ) >> 8 ) );
    output.push( ( input & 0x00FF ) );
    return;
  }
  function byteToUint16 ( byte0, byte1 ) {
    return ( byte0 & 0x00FF ) | ( ( byte1 & 0xFF00 ) >> 8 );
  }
  function uint32toByte ( input, output ) {
    output.push( ( (input & 0xFF000000) >> 24 ) );
    output.push( ( (input & 0x00FF0000) >> 16 ) );
    output.push( ( (input & 0x0000FF00) >> 8 ) );
    output.push( (input & 0x000000FF) );
    return;
  }
  function byteToUint32 ( byte0, byte1, byte2, byte3 ) {
    return ( byte0 & 0x000000FF ) | ( ( byte1 & 0x0000FF00 ) >> 8 ) | ( ( byte1 & 0x00FF0000 ) >> 16 ) | ( ( byte1 & 0xFF000000 ) >> 24 );
  }
  function strToEncodeByte ( str, length, output ) {
    buffer = encodeURI( str );
    for ( var i=0; i<buffer.length; i++ ) {
      output.push( strBuffer.charAt( i ).charCodeAt() );
    }
    if ( length > buffer.length ) {
      for ( var i=0; i<( length - buffer.length ); i++ ) {
        output.push( 0x00 );
      }
    }
    return;
  }
  function encodeByteToStr ( data, length ) {
    buffer = "";
    for ( var i=counter; i<length; i++ ) {
      buffer += String.fromCharCode( data[i] );
    }
    return decodeURI( buffer );
  }
  function cleanBuffer ( callback ) {
    self.buffer = [];
    for( var i=0; i<6; i++ ){
      self.buffer.push( 0 );
    }
    callback();
    return;
  }
  function setup ( callback ) {
    self.buffer[0] = 0x01;  /* 1st channel for sending via USB */
    self.buffer[1] = self.command;
    self.buffer[2] = self.status;
    self.buffer[3] = ( self.adr & 0xFF00 ) >> 8;
    self.buffer[4] = self.adr & 0x00FF;
    self.data      = [];
    callback();
    return;
  }
  function setupLength () {
    self.buffer[5] = self.length;
    return;
  }
  function finishMesageWithZero () {
    size = msgSIZE - self.buffer.length
    for ( var i=0; i<size; i++ ) {
      self.buffer.push( 0 );
    }
  }
  function parseConfig ( n ) {
    counter = 0;
    /*----------- Configuration value -----------*/
    if ( dataReg[n].len == 1 ) {
      dataReg[n].value = ( ( self.data[counter] << 8 ) & 0xFF00 ) | ( self.data[counter + 1] & 0x00FF );
      counter += 2;
    } else {
      dataReg[n].value = [];
      for ( var i=0; i<dataReg[n].len; i++ ) {
        dataReg[n].value.push( ( ( self.data[counter + i * 2] << 8 ) & 0xFF00 ) | ( self.data[counter + i * 2 + 1] & 0x00FF ) )
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
    counter = 0;
    buffer  = [];
    chart = {
      "xmin"  : 0,
      "xmax"  : 0,
      "ymin"  : 0,
      "ymax"  : 0,
      "xunit" : "",
      "yunit" : "",
      "size"  : 0,
      "dots"  : []
    };
    dot = {
      "x" : 0,
      "y" : 0
    };
    chart.xmin = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
    counter += 4;
    chart.xmax = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
    counter += 4;
    chart.ymin = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
    counter += 4;
    chart.ymax = byteToUint32( self.data[counter+3], self.data[counter+2], self.data[counter+1], self.data[counter] );
    counter += 4;

    for ( var i=0; i<chartUnitLength; i++ ) {
      buffer.push( self.data[counter+i] );
    }
    chart.xunit = encodeByteToStr( buffer, chartUnitLength );
    counter += chartUnitLength;

    for ( var i=0; i<chartUnitLength; i++ ) {
      buffer.push( self.data[counter+i] );
    }
    chart.yunit = encodeByteToStr( buffer, chartUnitLength );
    counter += chartUnitLength;

    chart.size = byteToUint16( self.data[counter+1], self.data[counter] );
    counter += 2;
    for ( var i=0; i<chart.size; i++ ) {
      dot.x = byteToUint16( self.data[counter+1], self.data[counter] );
      counter += 2;
      dot.y = byteToUint16( self.data[counter+1], self.data[counter] );
      counter += 2;
      chart.dots.push( dot );
    }
    if ( counter != self.length ) {
      chart = null;
    }
    return chart;
  }
  /*---------------------------------------------*/
  this.init       = function ( callback ) {
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
    callback();
    return;
  }
  this.codeConfig = function ( n ) {
    self.status  = msgSTAT.USB_OK_STAT;
    self.command = msgCMD.USB_PUT_CONFIG_CMD;
    self.adr     = n;
    cleanBuffer( function() {
      setup( function () {
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
        setupLength();
        finishMesageWithZero();
        /*-------------------------------------------*/
        return;
      });
    });
    return;
  }
  this.codeChart  = function ( chart, adr ) {
    self.status  = msgSTAT.USB_OK_STAT;
    self.command = msgCMD.USB_PUT_CHART_CMD;
    self.adr     = n;
    buffer = [];
    cleanBuffer( function () {
      this.setup( function () {
        self.length = 0;
        self.setupAdr( adr );
        if ( chart[adr].data == 0 ) {
          self.length = 0;
        } else {
          uint32toByte( chart[adr].xmin, self.buffer );
          uint32toByte( chart[adr].xmax, self.buffer );
          uint32toByte( chart[adr].ymin, self.buffer );
          uint32toByte( chart[adr].ymax, self.buffer );
          buffer = strToEncodeByte( chart[adr].xunit, chartUnitLength, self.buffer );
          buffer = strToEncodeByte( chart[adr].yunit, chartUnitLength, self.buffer );
          buffer = uint16toByte( chart[adr].size, self.buffer );
          for ( var i=0; i<chart[adr].size; i++ ) {
            uint32toByte( chart[adr].dots[i].x, self.buffer );
            uint32toByte( chart[adr].dots[i].y, self.buffer );
          }
        }
        this.length = 16 + chartUnitLength*2 + 2 + 8*chart[adr].size;
        setupLength();
        finishMesageWithZero();
      });
    });
  }
  this.parse      = function ( n ) {
    switch ( self.command ) {
      case msgCMD.USB_GET_CONFIG_CMD:
        parseConfig( n );
        break;
      case msgCMD.USB_GET_CHART_CMD:
        parseChart( n );
        break;
    }
  }
  /*---------------------------------------------*/
  return;
}
/*----------------------------------------------------------------------------*/
module.exports.USBMessage = USBMessage;
module.exports.msgCMD     = msgCMD;
module.exports.msgSTAT    = msgSTAT;
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/

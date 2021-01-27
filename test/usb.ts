/*----------------------------------------------------------------------------*/
const assert            = require( 'assert' );
const electronPath      = require( 'electron' );
const path              = require( 'path' );
const USBMessage        = require( '../js/usb-message.js' ).USBMessage;
const RTC               = require( '../js/rest' ).RTC;
const dataReg           = require( '../js/config.js' ).dataReg;
const newSensorData     = require( '../js/sensortable.js' ).newSensorData;
const EnrrganController = require( '../js/usb.js' ).EnrrganController;
const usb               = require( '../js/usb.js' );
/*----------------------------------------------------------------------------*/
/*          0     1      2     3     4     5     6     7    8     9*/
/*         DIR   CMD   STAT  ADR1  ADR0  LEN2  LEN1  LEN0  D0    D1*/
buffer = [ 0x00, 0x01, 0x01, 0x02, 0x05, 0x05, 0x06, 0x01, 0x00, 0x00  ];
let address = ( ( buffer[3]<<8 ) | ( buffer[4] ) );
let length  = ( ( buffer[5]<<16 ) | ( buffer[6]<<8 ) | ( buffer[7] ) );
function Password ( status, data ) {
	this.status = status;
	this.data   = data;
	return;
}
/*----------------------------------------------------------------------------*/
describe( 'USB message test', function () {
  let self = this;
  this.timeout( 10000 );
  before ( function () {
  });
  after ( function () {
  });
  it ( 'initilization', function () {
    let message = new USBMessage( buffer );
    message.init( function() {});
    assert.equal( message.command, buffer[1], 'Wrong command' );
    assert.equal( message.status,  buffer[2], 'Wrong status'  );
    assert.equal( message.adr,     address,   'Wrong address' );
    assert.equal( message.length,  length,    'Wrong length'  );
    for ( var i=0; i<(buffer.length - 8); i++ ) {
      assert.equal( message.data[i],  buffer[8 + i], 'Wrong data at ' + i );
    }
    return;
  });
  it ( 'make config request', function () {
    let message = new USBMessage( [] );
    message.makeConfigRequest( 10 );
    assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x01, 'Wrong command' );
    assert.equal( message.adr,           10,   'Wrong address' );
    assert.equal( message.length,        0,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x01, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x0A, 'Wrong first address byte' );
    for ( var i=5; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'make cart request', function () {
    let message = new USBMessage( [] );
    message.makeChartRequest( 10 );
    assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x03, 'Wrong command' );
    assert.equal( message.adr,           10,   'Wrong address' );
    assert.equal( message.length,        0,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x03, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x0A, 'Wrong first address byte' );
    for ( var i=5; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'make time request', function () {
    let message = new USBMessage( [] );
    message.makeTimeRequest();
    assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x08, 'Wrong command' );
    assert.equal( message.adr,           0,    'Wrong address' );
    assert.equal( message.length,        0,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x08, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte' );
    for ( var i=5; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'make free data request', function () {
    let message = new USBMessage( [] );
    message.makeFreeDataRequest( 10 );
    assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x0A, 'Wrong command' );
    assert.equal( message.adr,           10,   'Wrong address' );
    assert.equal( message.length,        0,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x0A, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x0A, 'Wrong first address byte' );
    for ( var i=5; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'make log request', function () {
    let message = new USBMessage( [] );
    message.makeLogRequest( 10 );
    assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x0C, 'Wrong command' );
    assert.equal( message.adr,           10,   'Wrong address' );
    assert.equal( message.length,        0,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x0C, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x0A, 'Wrong first address byte' );
    for ( var i=5; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
	it ( 'make memory size request', function () {
		let message = new USBMessage( [] );
		message.makeMemorySizeRequest();
		assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x11, 'Wrong command' );
    assert.equal( message.adr,           0,    'Wrong address' );
    assert.equal( message.length,        0,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x11, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte' );
    for ( var i=5; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
		return;
	});
	it ( 'make measurement length request', function () {
		let message = new USBMessage( [] );
		message.makeMeasurementLengthRequest();
		assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x14, 'Wrong command' );
    assert.equal( message.adr,           0,    'Wrong address' );
    assert.equal( message.length,        0,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x14, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte' );
    for ( var i=5; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
		return;
	});
	it ( 'make measurement request', function () {
		let message = new USBMessage( [] );
		message.makeMeasurementRequest( 4 );
		assert.equal( message.status,        1,    'Wrong status'  );
		assert.equal( message.command,       0x12, 'Wrong command' );
		assert.equal( message.adr,           4,    'Wrong address' );
		assert.equal( message.length,        0,    'Wrong length'  );
		assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
		assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
		assert.equal( message.buffer[1],     0x12, 'Wrong command byte' );
		assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
		assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
		assert.equal( message.buffer[4],     0x04, 'Wrong first address byte' );
		for ( var i=5; i<message.buffer.length; i++ ) {
			assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
		}
		return;
	})
  it ( 'code authorization data', function () {
    let message = new USBMessage( buffer );
    message.codeAuthorization( '1234' );
    assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x0F, 'Wrong command' );
    assert.equal( message.adr,           0,    'Wrong address' );
    assert.equal( message.length,        2,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x0F, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte' );
    assert.equal( message.buffer[5],     0x00, 'Wrong third length byte' );
    assert.equal( message.buffer[6],     0x00, 'Wrong second length byte' );
    assert.equal( message.buffer[7],     0x02, 'Wrong first length byte' );
    assert.equal( message.buffer[8],     0xD2, 'Wrong second data byte' );
    assert.equal( message.buffer[9],     0x04, 'Wrong first data byte' );
    for ( var i=10; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'code log erase command', function () {
    let message = new USBMessage( buffer );
    message.codeLogErase();
    assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x0D, 'Wrong command' );
    assert.equal( message.adr,           0,    'Wrong address' );
    assert.equal( message.length,        0,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x0D, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte' );
    for ( var i=5; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
	it ( 'code measurement erase command', function () {
		let message = new USBMessage( [] );
		message.codeMeasurementErase();
    assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x13, 'Wrong command' );
    assert.equal( message.adr,           0,    'Wrong address' );
    assert.equal( message.length,        0,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x13, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte' );
    for ( var i=5; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
		return;
	});
  it ( 'code password', function () {
    let message  = new USBMessage( buffer );
    let password = new Password( 1, parseInt( '1234' ) );
    message.codePassword( password );
    assert.equal( message.status,        1,    'Wrong status'  );
    assert.equal( message.command,       0x0E, 'Wrong command' );
    assert.equal( message.adr,           0,    'Wrong address' );
    assert.equal( message.length,        3,    'Wrong length'  );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size' );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[1],     0x0E, 'Wrong command byte' );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte' );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte' );
    assert.equal( message.buffer[5],     0x00, 'Wrong third length byte' );
    assert.equal( message.buffer[6],     0x00, 'Wrong second length byte' );
    assert.equal( message.buffer[7],     0x03, 'Wrong first length byte' );
    assert.equal( message.buffer[8],     0x00, 'Wrong first data byte' );
    assert.equal( message.buffer[9],     0xD2, 'Wrong second data byte' );
    assert.equal( message.buffer[10],    0x04, 'Wrong third data byte' );
    for ( var i=11; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'code time data', function () {
    let time    = new RTC();
    time.getSystemTime();
    let message = new USBMessage( buffer );
    message.codeTime( time );
    assert.equal( message.status,        1,          'Wrong status'              );
    assert.equal( message.command,       0x09,       'Wrong command'             );
    assert.equal( message.adr,           0,          'Wrong address'             );
    assert.equal( message.length,        7,          'Wrong length'              );
    assert.equal( message.buffer.length, 65,         'Wrong buffer size'         );
    assert.equal( message.buffer[0],     0x01,       'Wrong status byte'         );
    assert.equal( message.buffer[1],     0x09,       'Wrong command byte'        );
    assert.equal( message.buffer[2],     0x01,       'Wrong status byte'         );
    assert.equal( message.buffer[3],     0x00,       'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00,       'Wrong first address byte'  );
    assert.equal( message.buffer[5],     0x00,       'Wrong third length byte'   );
    assert.equal( message.buffer[6],     0x00,       'Wrong second length byte'  );
    assert.equal( message.buffer[7],     0x07,       'Wrong first length byte'   );
    assert.equal( message.buffer[8],     time.hour,  'Wrong 1st data byte'       );
    assert.equal( message.buffer[9],     time.min,   'Wrong 2nd data byte'       );
    assert.equal( message.buffer[10],    time.sec,   'Wrong 3rd data byte'       );
    assert.equal( message.buffer[11],    time.year,  'Wrong 4th data byte'       );
    assert.equal( message.buffer[12],    time.month, 'Wrong 5th data byte'       );
    assert.equal( message.buffer[13],    time.day,   'Wrong 6th data byte'       );
    assert.equal( message.buffer[14],    time.wday,  'Wrong 7th data byte'       );
    for ( var i=15; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'code free data', function () {
    let message = new USBMessage( buffer );
    message.codeFreeData( 1, 0x1234 );
    assert.equal( message.status,        1,    'Wrong status'              );
    assert.equal( message.command,       0x0B, 'Wrong command'             );
    assert.equal( message.adr,           1,    'Wrong address'             );
    assert.equal( message.length,        2,    'Wrong length'              );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size'         );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[1],     0x0B, 'Wrong command byte'        );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x01, 'Wrong first address byte'  );
    assert.equal( message.buffer[5],     0x00, 'Wrong third length byte'   );
    assert.equal( message.buffer[6],     0x00, 'Wrong second length byte'  );
    assert.equal( message.buffer[7],     0x02, 'Wrong first length byte'   );
    assert.equal( message.buffer[8],     0x34, 'Wrong 1st data byte'       );
    assert.equal( message.buffer[9],     0x12, 'Wrong 2nd data byte'       );
    for ( var i=10; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'code config data', function () {
    let text    = encodeURI( dataReg[3].units );
    let message = new USBMessage( buffer );
    message.codeConfig( dataReg[3], 3 );
    assert.equal( message.status,        1,    'Wrong status'              );
    assert.equal( message.command,       0x02, 'Wrong command'             );
    assert.equal( message.adr,           3,    'Wrong address'             );
    assert.equal( message.length,        6,    'Wrong length'              );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size'         );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[1],     0x02, 'Wrong command byte'        );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x03, 'Wrong first address byte'  );
    assert.equal( message.buffer[5],     0x00, 'Wrong third length byte'   );
    assert.equal( message.buffer[6],     0x00, 'Wrong second length byte'  );
    assert.equal( message.buffer[7],     0x06, 'Wrong first length byte'   );
    assert.equal( message.buffer[8],     ( ( dataReg[3].value & 0x00FF ) ),      'Wrong 1nd data byte' );
    assert.equal( message.buffer[9],     ( ( dataReg[3].value & 0xFF00 ) >> 8 ), 'Wrong 2nd data byte' );
    assert.equal( message.buffer[10],    ( dataReg[3].scale ),                   'Wrong 3nd data byte' );
    assert.equal( message.buffer[11],    ( text.charAt( 0 ).charCodeAt() ),      'Wrong 4nd data byte' );
    assert.equal( message.buffer[12],    ( text.charAt( 1 ).charCodeAt() ),      'Wrong 5nd data byte' );
    assert.equal( message.buffer[13],    ( text.charAt( 2 ).charCodeAt() ),      'Wrong 6nd data byte' );
    for ( var i=14; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
	/*
  it ( 'code chart data', function () {
    let message = new USBMessage( buffer );
    let chart   = newSensorData( 'testChart', 10, 10, 't', 'унит');
    message.codeChart( chart, 1 );
    assert.equal( message.status,        1,    'Wrong status'              );
    assert.equal( message.command,       0x04, 'Wrong command'             );
    assert.equal( message.adr,           1,    'Wrong address'             );
    assert.equal( message.length,        70,   'Wrong length'              );
    assert.equal( message.buffer[0],     0x01, 'Wrong dir byte'            );
    assert.equal( message.buffer[1],     0x04, 'Wrong command byte'        );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x01, 'Wrong first address byte'  );
    assert.equal( message.buffer[5],     0x00, 'Wrong third length byte'   );
    assert.equal( message.buffer[6],     0x00, 'Wrong second length byte'  );
    assert.equal( message.buffer[7],     0x06, 'Wrong first length byte'   );
    return;
  });
	*/
  it ( 'code save configs command', function () {
    let message = new USBMessage( buffer );
    message.codeSaveConfigs();
    assert.equal( message.status,        1,    'Wrong status'              );
    assert.equal( message.command,       0x06, 'Wrong command'             );
    assert.equal( message.adr,           0,    'Wrong address'             );
    assert.equal( message.length,        0,    'Wrong length'              );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size'         );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[1],     0x06, 'Wrong command byte'        );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte'  );
    assert.equal( message.buffer[5],     0x00, 'Wrong third length byte'   );
    assert.equal( message.buffer[6],     0x00, 'Wrong second length byte'  );
    assert.equal( message.buffer[7],     0x00, 'Wrong first length byte'   );
    for ( var i=8; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'code save charts command', function () {
    let message = new USBMessage( buffer );
    message.codeSaveCharts();
    assert.equal( message.status,        1,    'Wrong status'              );
    assert.equal( message.command,       0x07, 'Wrong command'             );
    assert.equal( message.adr,           0,    'Wrong address'             );
    assert.equal( message.length,        0,    'Wrong length'              );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size'         );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[1],     0x07, 'Wrong command byte'        );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte'  );
    assert.equal( message.buffer[5],     0x00, 'Wrong third length byte'   );
    assert.equal( message.buffer[6],     0x00, 'Wrong second length byte'  );
    assert.equal( message.buffer[7],     0x00, 'Wrong first length byte'   );
    for ( var i=8; i<message.buffer.length; i++ ) {
      assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
    }
    return;
  });
  it ( 'code EWA file', function () {
    let blob    = [];
    for ( var i=0; i<40; i++ ) {
      blob.push( i + 1 );
    }

    let message = new USBMessage( buffer );
    message.codeEWA( blob, 0 );
    assert.equal( message.status,        1,    'Wrong status'              );
    assert.equal( message.command,       0x05, 'Wrong command'             );
    assert.equal( message.adr,           0,    'Wrong address'             );
    assert.equal( message.length,        40,   'Wrong length'              );
    assert.equal( message.buffer.length, 65,   'Wrong buffer size'         );
    assert.equal( message.buffer[0],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[1],     0x05, 'Wrong command byte'        );
    assert.equal( message.buffer[2],     0x01, 'Wrong status byte'         );
    assert.equal( message.buffer[3],     0x00, 'Wrong second address byte' );
    assert.equal( message.buffer[4],     0x00, 'Wrong first address byte'  );
    assert.equal( message.buffer[5],     0x00, 'Wrong third length byte'   );
    assert.equal( message.buffer[6],     0x00, 'Wrong second length byte'  );
    assert.equal( message.buffer[7],     0x28, 'Wrong first length byte'   );
    for ( var i=0; i<blob.length; i++ ) {
      assert.equal( message.buffer[8 + i], blob[i] , 'Wrong buffer data at ' + i );
    }
    if ( ( blob.length + 8 ) < message.buffer.length ) {
      for ( var i=blob.length + 8; i<message.buffer.length; i++ ) {
        assert.equal( message.buffer[i], 0, 'Wrong buffer data at ' + i );
      }
    }
    return;
  });
  it ( 'parse config operation', function () {
    let type   = 0;
    let output = null;
    let data   = 0x1234;
    let scale  = 2;
    let units  = 'tes';
    let text   = encodeURI( units );
    buffer = [
      0x01,
      0x01,
      0x01,
      0x00,
      0x03,
      0x00,
      0x00,
      0x06,
			( data & 0x00FF ),
      ( ( data & 0xFF00 ) >> 8 ),
      ( scale ),
      text.charAt( 0 ).charCodeAt(),
      text.charAt( 1 ).charCodeAt(),
      text.charAt( 2 ).charCodeAt(),
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00,
    ];
    let message = new USBMessage( buffer );
    message.init( function () {
      [type, output] = message.parse( dataReg );
    });
    assert.equal( type,             1,     'Wrong type of data'  );
    assert.equal( dataReg[3].value, data,  'Wrong data reading'  );
    assert.equal( dataReg[3].scale, scale, 'Wrong scale reading' );
    assert.equal( dataReg[3].units, units, 'Wrong units reading' );
    return;
  });
  it ( 'parse chart operation', function () {
    let message = new USBMessage( buffer );
    message.init( function () {});
    return;
  });
  it ( 'parse time operation', function () {
    let type    = 0;
    let output  = null;
    let time    = new RTC();
    time.getSystemTime();
    buffer      = [
      0x01,
      0x08,
      0x01,
      0x00,
      0x00,
      0x00,
      0x00,
      0x01,
      time.hour,
      time.min,
      time.sec,
      time.year,
      time.month,
      time.day,
      time.wday,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ];
    let message = new USBMessage( buffer );
    message.init( function () {
      [type, output] = message.parse();
    });
    assert.equal( type,         3,          'Wrong type of data'     );
    assert.equal( output.hour,  time.hour,  'Wrong hour reading'     );
    assert.equal( output.min,   time.min,   'Wrong min reading'      );
    assert.equal( output.sec,   time.sec,   'Wrong sec reading'      );
    assert.equal( output.year,  time.year,  'Wrong year reading'     );
    assert.equal( output.month, time.month, 'Wrong month reading'    );
    assert.equal( output.day,   time.day,   'Wrong day reading'      );
    assert.equal( output.wday,  time.wday,  'Wrong week day reading' );
    return;
  });
  it ( 'parse free data operation', function () {
    let data    = 0x1234;
    let type    = 0;
    let output  = null;
    buffer = [
      0x01,
      0x0A,
      0x01,
      0x00,
      0x01,
      0x00,
      0x00,
      0x02,
			( data & 0x00FF ),
      ( ( data & 0xFF00 ) >> 8 ),
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00,
    ];
    let message = new USBMessage( buffer );
    message.init( function () {
      [type, output] = message.parse();
    });
    assert.equal( type,    4,    'Wrong type of data' );
    assert.equal( output,  data, 'Wrong data reading' );
    return;
  });
  it ( 'parse log operation', function () {
    let type    = 0;
    let output  = null;
    let data0   = 0x12345678;
    let data1   = 0x06;
    let data2   = 0x09;
    buffer = [
      0x01,
      0x0C,
      0x01,
      0x00,
      0x01,
      0x00,
      0x00,
      0x06,
			( data0 & 0x000000FF ),
			( ( data0 & 0x0000FF00 ) >> 8  ),
			( ( data0 & 0x00FF0000 ) >> 16 ),
      ( ( data0 & 0xFF000000 ) >> 24 ),
      ( data1 & 0xFF ),
      ( data2 & 0xFF ),
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00,
    ];
    let message = new USBMessage( buffer );
    message.init( function () {
      [type, output] = message.parse();
    });
    assert.equal( type,          5,     'Wrong type of data'          );
    assert.equal( output.time,   data0, 'Wrong record time of data'   );
    assert.equal( output.type,   data1, 'Wrong record type of data'   );
    assert.equal( output.action, data2, 'Wrong record action of data' );
    return;
  });
	it ( 'parse memory size', function () {
		let type   = 0;
    let output = null;
		let data   = 0x12345678;
		buffer = [
      0x01,
      0x11,
      0x01,
      0x00,
      0x00,
      0x00,
      0x00,
      0x04,
			( data & 0x000000FF ),
			( ( data & 0x0000FF00 ) >> 8  ),
			( ( data & 0x00FF0000 ) >> 16 ),
      ( ( data & 0xFF000000 ) >> 24 ),
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
    ];
		let message = new USBMessage( buffer );
    message.init( function () {
      [type, output] = message.parse();
    });
		assert.equal( type,   6,    'Wrong type of data' );
    assert.equal( output, data, 'Wrong data'         );
    return;
	});
	it ( 'parse measurement length', function () {
		let type   = 0;
    let output = null;
		let data   = 0x1234;
		buffer = [
      0x01,
      0x14,
      0x01,
      0x00,
      0x00,
      0x00,
      0x00,
      0x02,
			( data & 0x00FF ),
			( ( data & 0xFF00 ) >> 8  ),
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ];
		let message = new USBMessage( buffer );
    message.init( function () {
      [type, output] = message.parse();
    });
		assert.equal( type,   8,    'Wrong type of data' );
    assert.equal( output, data, 'Wrong data'         );
    return;
	});
	it ( 'parse measurement', function () {
		let type   = 0;
    let output = null;
		let data   = [ 0x1234, 0x5678];
		buffer = [
      0x01,
      0x12,
      0x01,
      0x00,
      0x00,
      0x00,
      0x00,
      0x04,
			( data[0] & 0x00FF ),
			( ( data[0] & 0xFF00 ) >> 8  ),
			( data[1] & 0x00FF ),
			( ( data[1] & 0xFF00 ) >> 8  ),
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
    ];
		let message = new USBMessage( buffer );
    message.init( function () {
      [type, output] = message.parse();
    });
		assert.equal( type,      7,           'Wrong type of data' );
    assert.equal( output[0], ( data[0] ), 'Wrong data 0'       );
		assert.equal( output[1], ( data[1] ), 'Wrong data 1'       );
    return;
	})
	return;
});
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
describe( 'USB transfer test', function () {
	let self = this;
	this.out    = [];
	this.charts = [];
	this.status = 0;
	this.flag   = 0;
  this.timeout( 10000 );
	/*--------------------------------------------------------------------------*/
  before ( function () {
		return;
	});
  after ( function () {
		usb.controller.close();
		return;
  });
	/*--------------------------------------------------------------------------*/
	it ( 'usb device scanning', function () {
		let transport = new usb.Transport;
		let result    = 0;
		transport.scan( function () {
			result = 1;
			return;
		}, function () {
			result = 0;
			return;
		});
		assert.equal( result, 1, 'There is no Energan device over USB' );
		transport.close();
		return;
	});
});
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/

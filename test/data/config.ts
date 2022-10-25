/*----------------------------------------------------------------------------*/
const assert        = require('assert');
const electronPath  = require('electron');
const path          = require('path');
const dataReg       = require('../../js/config.js').dataReg;
const rest          = require('../../js/rest.js')
/*----------------------------------------------------------------------------*/
describe( 'Config sourse structure test', function () {
  let self = this;
  this.timeout( 10000 );

  before ( function () {
  });

  after ( function () {
  });

  it ( 'non zero data length', function () {
    assert.notEqual( dataReg.length, 0, 'Data length is zero' );
    return;
  });
  it ( 'config address check', function () {
    for ( var i=0; i<dataReg.length; i++ ) {
      assert.equal( dataReg[i].adr, i, i + ': wrong address' );
    }
    return;
  });
  it ( 'config length check', function () {
    for ( var i=0; i<dataReg.length; i++ ) {
      if ( typeof( dataReg[i].value ) == "number" ) {
        assert.equal( dataReg[i].len, 1, i + ': wrong length' );
      } else {
        assert.equal( dataReg[i].len, dataReg[i].value.length, i + ': wrong length' );
      }
    }
    return;
  });
  it ( 'config name check', function () {
    for ( var i=0; i<dataReg.length; i++ ) {
      assert.notEqual( dataReg[i].name.length, 0, i + ': zero length name' );
      assert.equal( typeof( dataReg[i].name ), "string", i + " : not string name" );
    }
    return;
  });
  it ( 'config type check', function () {
    for ( var i=0; i<dataReg.length; i++ ) {
      assert.equal( typeof( dataReg[i].type ), "string", i + " : not string type" );
    }
    return;
  });
  it ( 'config units check', function () {
    for ( var i=0; i<dataReg.length; i++ ) {
      assert.equal( typeof( dataReg[i].units ), "string", i + " : not string units" );
    }
    return;
  });
  it ( 'config value check', function () {
    for ( var i=0; i<dataReg.length; i++ ) {
      if ( dataReg[i].type == "U" ) {
        for ( var j=0; j<dataReg[i].value.length; j++) {
          assert.equal( typeof( dataReg[i].value[j] ), "number", i + " : wrong type value" );
          assert.equal( typeof( dataReg[i].default[j] ), "number", i + " : wrong type default" );
        }
      }
      if ( dataReg[i].type == "S" ) {
        for ( var j=0; j<dataReg[i].value.length; j++) {
          assert.equal( typeof( dataReg[i].value[j] ), "string", i + " : wrong type value" );
          assert.equal( typeof( dataReg[i].default[j] ), "string", i + " : wrong type default" );
        }
      }
    }
    return;
  });
  it ( 'config scale check', function() {
    for ( var i=0; i<dataReg.length; i++ ) {
      assert.equal( typeof( dataReg[i].scale ), "number", i + " : not number scale" );
    }
    return;
  });
  it ( 'config limits check', function () {
    for ( var i=0; i<dataReg.length; i++ ) {
      assert.equal( typeof( dataReg[i].min ), "number", i + " : not number min" );
      assert.equal( typeof( dataReg[i].max ), "number", i + " : not number max" );
      assert( dataReg[i].min <= dataReg[i].max, i + " : min not below max" );
    }
    return;
  });
  it ( 'config bitmap size check', function () {
    for ( var i=0; i<dataReg.length; i++ ) {
      assert.equal( dataReg[i].bitMapSize, dataReg[i].bit.length, i + " : wrong bitmap size" );
    }
    return;
  });
});
/*----------------------------------------------------------------------------*/
describe( 'UI configs objects test', function () {
  let self = this;
  this.timeout( 10000 );

  before ( function () {
  });

  after ( function () {
  });

  it ( 'string objects test', function () {
    rest.declareStrings( dataReg );
    return;
  });
});
/*----------------------------------------------------------------------------*/

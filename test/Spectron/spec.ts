/*----------------------------------------------------------------------------*/
const Application  = require('spectron').Application;
const assert       = require('assert');
const electronPath = require('electron');
const path         = require('path');
/*----------------------------------------------------------------------------*/
var app = null;
/*----------------------------------------------------------------------------*/
describe( 'Window settings test', function () {
  this.timeout( 10000 );

  before ( function () {
    app = new Application({
      path : electronPath,
      args : ['--no-sandbox', '.'],
    });
    return app.start().then( function () {
      app.client.waitUntilWindowLoaded();
      app.browserWindow.show();
      return app;
    });
  })

  after ( function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
    return;
  });
  /*--------------------------------- Window ---------------------------------*/
  it ( 'shows an initial window', function () {
    return app.client.getWindowCount().then( function ( count ) {
      assert.equal( count, 1 );
    })
  });
  it ( 'window does not have the developer tools open', function () {
    return app.client.waitUntilWindowLoaded().browserWindow.isDevToolsOpened().then( function ( state ) {
      assert.equal( state, false );
    });
  });
  it ( 'window is not minimized', function () {
    return app.browserWindow.isMinimized().then( function ( state ) {
      assert.equal( state, false );
    });
  });
  it ( 'window is visible', function () {
    return app.browserWindow.isVisible().then( function ( state ) {
      assert.equal( state, true );
    });
  });
  it ( 'window sizes are greater than zero', function () {
    return app.browserWindow.getSize().then( function ( data ) {
      assert.equal( ( data[0] > 0 ), true );
      assert.equal( ( data[1] > 0 ), true );
    });
  });
  it ( 'window is full screenable', function () {
    return app.browserWindow.isFullScreenable().then( function ( state ) {
      assert.equal( state, true );
    });
  });
  it ( 'window is minimizable', function () {
    return app.browserWindow.isMinimizable().then( function ( state ) {
      assert.equal( state, true );
    });
  });
  it ( 'window is maximizable', function () {
    return app.browserWindow.isMaximizable().then( function ( state ) {
      assert.equal( state, true );
    });
  });
  it ( 'window is closable', function () {
    return app.browserWindow.isClosable().then( function ( state ) {
      assert.equal( state, true );
    });
  });
  it ( 'window is not always on top', function () {
    return app.browserWindow.isAlwaysOnTop().then( function ( state ) {
      assert.equal( state, false );
    });
  });
  it ( 'window is not in kiosk mode', function () {
    return app.browserWindow.isKiosk().then( function ( state ) {
      assert.equal( state, false );
    });
  });
  it ( 'window is normal size on start', function () {
    return app.browserWindow.isNormal().then( function ( state ) {
      assert.equal( state, true );
    });
  });
  it ( 'window is resizable', function () {
    return app.browserWindow.isResizable().then( function ( state ) {
      assert.equal( state, true );
    });
  });
  it ( 'window is movable', function () {
    return app.browserWindow.isMovable().then( function ( state ) {
      assert.equal( state, true );
    });
  });
  it ( 'window menu bar is invisible', function () {
    return app.browserWindow.isMenuBarVisible().then( function ( state ) {
      assert.equal( state, false );
    });
  });
  it ( 'window is full opacity', function () {
    return app.browserWindow.getOpacity().then( function ( opacity ) {
      assert.equal( opacity, 1 );
    });
  });
  it ( 'window minimum size is correct', function () {
    return app.browserWindow.getMinimumSize().then( function ( size ) {
      assert.equal( size[0], 1200, 'minimum width less than 1200' );
      assert.equal( size[1], 700,  'minimum height less than 700' );
    });
  });
  it ( 'window title is correct', function () {
    return app.browserWindow.getTitle().then( function ( title ) {
      assert.equal( title, "Энерган — Надежная энергетика", "Current title is" + title );
    });
  });
});
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/

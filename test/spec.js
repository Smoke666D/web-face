/*----------------------------------------------------------------------------*/
const Application  = require('spectron').Application
const assert       = require('assert')
const electronPath = require('electron')
const path         = require('path')
const appPath      = path.resolve(__dirname, '../');
/*----------------------------------------------------------------------------*/
//var electronPath = path.resolve(__dirname, '../node_modules/.bin/electron');
/*----------------------------------------------------------------------------*/
describe('Application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [appPath],
      chromeDriverArgs: [],
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)

    })
  })
})

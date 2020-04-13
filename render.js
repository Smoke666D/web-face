
const remote = require('electron').remote;
var HID = require('node-hid');
var alerts = require('./js/alerts.js');
/*----------------------------------------------------------------------------*/
document.getElementById("min-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.minimize();
});

document.getElementById("max-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  if (!window.isMaximized()) {
    window.maximize();
  } else {
    window.unmaximize();
  }
});

document.getElementById("close-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.close();
});
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/
const usbStat = {"wait":1,"sending":2,"receiving":3};
/*----------------------------------------------------------------------------*/
function EnrrganController() {
  var self     = this;
  this.input   = [];
  this.error   = [];
  this.stat    = usbStat.wait;
  this.counter = 0;
  var d = new Date();
  /*----------------------------------------*/
  this.scan = function() {
    var devices = HID.devices();
    console.log(devices);
    for (var i=0; i<devices.length; i++) {
      if (devices[i].manufacturer == "Energan") {
        this.device = new HID.HID(devices[i].path);
        let alert = new alerts.Alert("alert-success",alerts.triIco,"Контроллер подключен по USB");
        break;
      }
    }
    if (this.device != null) {
      this.device.on("data", function(data) {
        /*
        self.counter++;
        if (self.counter == 2040) {
          console.log(self.startTime);
          console.log(d.getMinutes()*60 + d.getSeconds());
          console.log(d.getMinutes()*60 + d.getSeconds() - self.startTime);
        }
        */
        //this.input.push(data);
        console.log(data);
      });
      this.device.on("error", function(err) {
        //this.error.push(err);
        console.log(err);
      });
    } else {
      let alert = new alerts.Alert("alert-warning",alerts.triIco,"Контроллер не подключен по USB");
    }
    return;
  }
  /*----------------------------------------*/
  this.close = function() {
    if (this.device != null) {
      this.device.close();
    }
    return;
  }
  /*----------------------------------------*/
  this.write = function(data) {
    if (this.device != null) {
      this.device.write(data);
    }
    return;
  }
  /*----------------------------------------*/
  this.getConfig = function(adr) {
    if (adr == 0xFFFF) {
      this.write([0x01,0x01,0x01,0xFF,0xFF,0x00,0x00]);
    } else if (adr < dataReg.length) {

    }
    return;
  }
  /*----------------------------------------*/
  this.startTime = d.getMinutes()*60 + d.getSeconds();
  this.scan();
}

let controller = new EnrrganController();
controller.write([0x01,0x01,0x01,0xFF,0xFF,0x00,0x00,0x00]);
console.log("USB write");

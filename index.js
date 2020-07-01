const { app, BrowserWindow } = require('electron');

function createWindow () {
  let win = new BrowserWindow({
    backgroundColor: '#373a40',
    minWidth:  1200,
    minHeight: 800,
    width:     1200,
    height:    800,
    frame:     false,
    hasShadow: true,
    icon:      __dirname + "/img/favicon-32x32.png",
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.webContents.openDevTools();

  win.loadFile('index.html');

  win.on('closed', () => {
    mainWindow = null
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});  // OS X

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

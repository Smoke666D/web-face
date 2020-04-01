const { app, BrowserWindow } = require('electron');

function createWindow () {
  // Создаем окно браузера.
  let win = new BrowserWindow({
    backgroundColor: '#373a40',
    minWidth: 1200,
    minHeight: 800,
    width: 1200,
    height: 800,
    frame: false,
    transparent: true,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.webContents.openDevTools();
  win.setMenuBarVisibility(false);
  win.loadFile('index.html');
  win.on('closed', () => {
    mainWindow = null
  })
}

app.on('quit', () => {
  app.quit()
})

app.whenReady().then(createWindow);

const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');

// TODO add splashscreen
// TODO add app icon

async function onReady () {
  win = new BrowserWindow({
    width: 620,
    height: 280,
    "min-width": 620,
    "min-height": 280
  })
  await win.loadURL(url.format({
    pathname: path.join(
      __dirname,
      '/www/index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', onReady);

app.on("window-all-closed", () => {
  app.quit();
});

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: 'Plausible Visitors',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)


const {app, BrowserWindow, ipcMain} = require('electron')
const url = require("url");
const path = require("path");

import {VisualScriptingIpcDecorator} from './common/public-api';
import { FileSystemIpcChannel } from './ipcChannels/file-system-ipc-channel';

let mainWindow: any;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation : false,
    },
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../visual-scripting-angular/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null
  })


}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

const ipcChannels: VisualScriptingIpcDecorator[] = [
  new FileSystemIpcChannel(ipcMain),
];
for (let ipcChannel of ipcChannels) {
  ipcChannel.listen();
}
console.log(`Ipc channels are ready. [${ipcChannels.length} channels]`);
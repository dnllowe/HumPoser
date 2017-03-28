'use strict';
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
require('electron-reload')(__dirname, {
  ignored: /node_modules|[\/\\]\.|resources/
});

//////////////////
// WINDOW
/////////////////

// Create a GLOBAL window variable
// so the garbage collector
// doesn't throw it away
let win = null;

const createWindow = () => {

  // Create window and set properties
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // Link it to index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slahses: true
  }));

  win.on('close', () => {

    // Remember, window is a global variable. 
    // Set it to null when closed so garbage collection
    // can clean up the memory
    win = null;
  });
}

///////////////
// APP
///////////////

// Create the window when the app is ready
app.on('ready', createWindow);

// Quit the app when all windows are closed
// Except on macOS, where it will remain in the Dock
app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, if no windows are open and users clicks icon from Dock
// start a new instance of the application
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});


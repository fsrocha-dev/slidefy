import { app, BrowserWindow, globalShortcut } from 'electron'

export function createShortcuts(window: BrowserWindow) {
  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+N', () => {
      window.webContents.send('new-document')
    })
    globalShortcut.register('Escape', () => {
      window.webContents.send('close-document')
    })
  })

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  })
}

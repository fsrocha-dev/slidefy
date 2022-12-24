import { ipcMain } from 'electron'

ipcMain.handle('fetch-documents', async () => {
  return [
    { id: '1', title: 'Slide backend' },
    { id: '2', title: 'Slide React x y z' },
  ]
})

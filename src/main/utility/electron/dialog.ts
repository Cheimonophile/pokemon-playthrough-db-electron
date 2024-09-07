import { BrowserWindow, dialog } from "electron";




/**
 * Dialog for creating a database file
 */
export async function createDatabaseDialog(window: BrowserWindow): Promise<string | null> {
  const saveReturn = await dialog.showSaveDialog(window, {
    title: 'Create Database',
    message: 'Create a new pokemon playthrough database.',
    buttonLabel: 'Create',
    filters: [{ name: 'PkmnDb', extensions: ['pkmndb'] }],
    properties: [
      'createDirectory',
      'dontAddToRecent'
    ]
  })
  if (saveReturn.canceled) {
    return null;
  }
  return saveReturn.filePath
}




/**
 * Dialog for opening a database file
 */
export async function openDatabaseDialog(window: BrowserWindow): Promise<string | null> {
  const openReturn = await dialog.showOpenDialog(window, {
    title: 'Open Database',
    message: 'Open an existing pokemon playthrough database.',
    buttonLabel: 'Open',
    filters: [{ name: 'PkmnDb', extensions: ['pkmndb'] }],
    properties: [
      'openFile',
      'createDirectory',
      'dontAddToRecent'
    ]
  })
  if (openReturn.canceled) {
    return null;
  }
  return openReturn.filePaths[0] ?? null;
}
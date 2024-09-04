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
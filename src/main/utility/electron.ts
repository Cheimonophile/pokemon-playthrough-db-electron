import { BrowserWindow, WebContents } from "electron";




/**
 * Gets the browser window from the web contents.
 * 
 * @param webContents 
 * @returns 
 */
export function getBrowserWindowFromWebContents(webContents: WebContents): BrowserWindow {
  const window = BrowserWindow.fromWebContents(webContents);
  if (!window) {
    throw new Error('Could not get window from web contents.');
  }
  return window;
}
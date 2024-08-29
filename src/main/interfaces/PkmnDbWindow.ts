import { BrowserWindow } from 'electron';


declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


/**
 * Interface for a window that displays information from the PkmnDb.
 */
export abstract class PkmnDbWindow {

  /**
   * The window that displays information from the PkmnDb.
   */
  protected window: BrowserWindow;

  /**
   * Constructor for the browser window.
   */
  constructor() {
    this.window = new BrowserWindow({
      height: 600,
      width: 800,
      show: false,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });
    this.window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    this.window.once('ready-to-show', () => {
      this.window.show()
    })
  }

}
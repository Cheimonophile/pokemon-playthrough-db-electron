import { BrowserWindow } from 'electron';


declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


/**
 * Interface for a window that displays information from the PkmnDb.
 */
export abstract class PkmnDbWindow extends BrowserWindow {

  /**
   * Constructor for the browser window.
   */
  constructor() {
    super({
      height: 600,
      width: 800,
      show: false,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });
    this.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    this.once('ready-to-show', () => {
      this.show()
    })
  }

}
import { BrowserWindow } from "electron";
import { Page } from "@common/interfaces/PkmnDb";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


/**
 * Interface for a window that displays information from the PkmnDb.
 */
export abstract class PkmnDbWindow extends BrowserWindow {

  /**
   * The page being displayed in the window
   */
  private _page: Page;


  /**
   * Constructor for the browser window.
   */
  constructor(
    
    /**
     * The page to display in the window.
     */
    page: Page
  ) {
    super({
      height: 600,
      width: 800,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });
    this._page = page;
    const url = new URL(MAIN_WINDOW_WEBPACK_ENTRY);
    url.searchParams.append('page', page);
    const urlString = url.toString();
    this.loadURL(urlString);
  }

  /**
   * @returns the page being displayed in the window
   */
  get page(): Page {
    return this._page;
  }

}
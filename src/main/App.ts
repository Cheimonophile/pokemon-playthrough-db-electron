import { PkmnDbWindow } from "@main/interfaces/PkmnDbWindow";
import { HomeWindow } from "./windows/HomeWindow";


/**
 * Class that represents the state of the application.
 */
export class PkmnDb {


  /**
   * The currently displayed window of the application.
   */
  private _window: PkmnDbWindow | null = null;


  /**
   * Opens the window of the appliction, if it isn't already open
   */
  openWindow(): PkmnDbWindow {
    this._window ??= new HomeWindow();
    this._window.on('closed', this.onWindowClosed);
    return this._window;
  }


  /**
   * Callback called when the window is closed
   */
  private onWindowClosed(): void {
    this._window = null;
  }




}
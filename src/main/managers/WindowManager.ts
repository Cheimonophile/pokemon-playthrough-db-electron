import { PkmnDbWindow } from "@main/interfaces/PkmnDbWindow";
import { HomeWindow } from "../windows/HomeWindow";





/**
 * The currently displayed window of the application.
 */
let window: PkmnDbWindow | null = null;



/**
 * Returns the window of the application
 */
const getWindow = (): PkmnDbWindow | null => window;

/**
 * Returns the window of the application, creating it if it doesn't exist
 */
const getOrCreateWindow = (): PkmnDbWindow => {
  if (window) {
    return window;
  }
  window = new HomeWindow();
  window.on('closed', () => {
    window = null;
  });
  return window;
}

/**
 * Object that manages the windows of the application.
 */
export const WindowManager = Object.freeze({
  getWindow,
  getOrCreateWindow
});
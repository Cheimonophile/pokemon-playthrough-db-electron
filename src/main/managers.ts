import { settings } from "./daos/SettingsDao";
import { DatabaseManager } from "./managers/DatabaseManager";
import { WindowManager } from "./managers/WindowManager";



/**
 * The database manager for the application
 */
export const databaseManager = new DatabaseManager();
databaseManager.onOpenDatabase(() => {
  WindowManager.notify();
})
settings.dbFilepath.get().then((path) => {
  if (path) {
    databaseManager.openDatabase(path);
  }
});
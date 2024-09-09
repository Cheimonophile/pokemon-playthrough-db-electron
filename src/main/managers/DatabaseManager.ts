import { DatabaseConnection } from "@main/classes/DatabaseConnection";
import { settings } from "@main/daos/SettingsDao";



/**
 * Manages the database connection
 */
export class DatabaseManager {


  /**
   * The currently connected database
   */
  private _database: DatabaseConnection | null = null;

  /**
   * Callbacks to call when the database is opened
   */
  private _onOpenDatabaseCallbacks = new Set<() => void>();


  /**
   * The currently connected database
   */
  public get database(): DatabaseConnection | null {
    return this._database;
  }
  private set database(database: DatabaseConnection | null) {
    this._database = database;
  }

  /**
   * Opens a database connection
   * 
   * If the database doesn't exist, creates it.
   */
  async openDatabase(path: string) {
    this._database = await DatabaseConnection.open(path);
    await settings.dbFilepath.set(path);
    this._onOpenDatabaseCallbacks.forEach((callback) => callback());
  }


  /**
   * Callback to call when the database is opened
   * 
   * @param callback 
   */
  onOpenDatabase(callback: () => void) {
    this._onOpenDatabaseCallbacks.add(callback);
  }
}
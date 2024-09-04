

import { Database } from '@main/classes/Database';


/**
 * Manages the database connection
 */
class DatabaseManager {

  /**
   * The currently connected database
   */
  private _database: Database | null = null;


  /**
   * The currently connected database
   */
  public get database(): Database | null {
    return this._database;
  }
  private set database(database: Database | null) {
    this._database = database;
  }

  /**
   * Opens a database connection
   * 
   * If the database doesn't exist, creates it.
   */
  async openDatabase(path: string) {
    this._database = await Database.open(path);
  }

}

/**
 * The database manager of the application
 */
export const databaseManager = new DatabaseManager();
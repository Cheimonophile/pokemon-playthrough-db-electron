import { DatabaseConnection } from "@main/classes/DatabaseConnection";




/**
 * Manages the database connection
 */
class DatabaseManager {

  /**
   * The currently connected database
   */
  private _database: DatabaseConnection | null = null;


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
  }

}

/**
 * The database manager of the application
 */
export const databaseManager = new DatabaseManager();
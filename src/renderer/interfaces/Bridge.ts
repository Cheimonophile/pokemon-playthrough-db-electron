


/**
 * Fields exposed to renderer processes preload.js.
 */
export interface Bridge {


  /**
   * The path to the database file.
   * 
   * @param databasePath 
   */
  setDatabase(databasePath: string): Promise<void>
}
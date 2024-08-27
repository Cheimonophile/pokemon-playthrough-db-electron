

/**
 * Fields exposed to rendered processes preload.js.
 */
export interface WindowBackend {

  /**
   * The path to the database file.
   * 
   * @param databasePath 
   */
  setDatabase(databasePath: string): Promise<void>
}

declare global {
  interface Window {
    backend: WindowBackend
  }
}
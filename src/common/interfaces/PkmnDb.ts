/**
 * List of the pages in the next.js application
 */
export const PAGES = [
  'home',
] as const satisfies string[];


/**
 * The type of the pages in the next.js application
 */
export type Page = typeof PAGES[number];


/**
 * Fields exposed to rendered processes preload.js.
 */
export interface PkmnDb {


  /**
   * The path to the database file.
   * 
   * @param databasePath 
   */
  setDatabase(databasePath: string): Promise<void>
}
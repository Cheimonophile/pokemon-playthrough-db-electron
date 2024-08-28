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
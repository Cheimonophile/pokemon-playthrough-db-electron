


/**
 * The page enum
 */
export type Page = typeof Page.values[number];

export namespace Page {

  /**
   * The values of the page enum
   */
  export const values = [
    'settings',
  ] as const as string[];

}
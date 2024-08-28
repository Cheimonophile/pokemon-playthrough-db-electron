import { Page, PAGES } from "@common/interfaces/PkmnDb";


/**
 * Class with methods to interact with the database
 */
export abstract class PkmnDb {

  /**
   * @returns the page from the url search parameters
   */
  private static getPage(): Page {
    const url = new URL(window.location.href);
    const pageParam = url.searchParams.get('page');
    const page = PAGES.find((page) => page === pageParam) ?? PAGES[0];
    return page;
  }

  /**
   * The page from the url search parameters
   */
  public static page = PkmnDb.getPage();
}
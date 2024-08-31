

import { PrismaClient } from '@prisma/client'

/**
 * Interface that stores the data for the database
 */
interface Database {

  /**
   * The Prisma client object of the database
   */
  readonly prisma: PrismaClient;

  /**
   * The path of the database
   */
  readonly path: string;
}


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
  private get database(): Database | null {
    return this._database;
  }
  private set database(database: Database | null) {
    this._database = database;
  }

  /**
   * The Prisma client object of the database
   */
  public get prisma(): PrismaClient | null {
    return this.database?.prisma || null;
  }


  /**
   * The path of the database
   * 
   * Returns null if the database is not connected
   */
  public get path(): string | null {
    return this.database?.path ?? null;
  }

  /**
   * Opens a database connection
   */
  async openDatabase(path: string) {
    try {
      const prisma = new PrismaClient({
        datasourceUrl: `file:${path}`
      });
      await prisma.$connect();
      this.database = {
        prisma,
        path
      };
    }
    catch(caught) {
      console.error(caught);
    }
  }
}

/**
 * The database manager of the application
 */
export const databaseManager = new DatabaseManager();
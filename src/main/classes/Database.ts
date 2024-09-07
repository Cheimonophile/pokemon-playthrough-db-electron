
import { PrismaClient, PrismaPromise } from "@prisma/client";
import fs from "fs/promises";


/**
 * The directory of the migrations.
 */
const MIGRATIONS_DIR = `${__dirname}/prisma/migrations`;


/**
 * Gets a migration directory from its migration id
 * 
 * @param migrationId 
 * @returns 
 */
const getMigrationDir = (migrationId: string) => `${MIGRATIONS_DIR}/${migrationId}`;


/**
 * Returns the migration filepath for a given migration dirname.
 * 
 * @param migrationDirname 
 * @returns 
 */
const getMigrationFilepath = (migrationDirname: string) => `${getMigrationDir(migrationDirname)}/migration.sql`;

/**
 * Returns the migration's dirname from its filepath.
 * 
 * @param migrationName 
 * @returns 
 */
const isMigration = async (migrationName: string): Promise<boolean> => {
  const migrationDir = getMigrationDir(migrationName);
  const dirStat = await fs.stat(migrationDir)
  if (!dirStat.isDirectory()) {
    return false;
  }
  const migrationFilepath = getMigrationFilepath(migrationName);
  const fileState = await fs.stat(migrationFilepath)
  const isFile = fileState.isFile();
  return isFile;
};


/**
 * Makes the map of the migrations
 */
export const getMigrations = async (): Promise<Array<string>> => {
  const migrationNames = (
    await fs.readdir(MIGRATIONS_DIR)
  ).sort();
  const migrations = new Array<string>();
  for (const migrationName of migrationNames) {
    if (!await isMigration(migrationName)) {
      continue;
    }
    const migrationFilepath = getMigrationFilepath(migrationName)
    const migrationSql = await fs.readFile(migrationFilepath, "utf-8");
    migrations.push(migrationSql);
  }
  return migrations;
};


/**
 * Migrate the prisma client
 * 
 * @param prisma 
 */
export async function migrate(prisma: PrismaClient) {
  const executePromises: PrismaPromise<number>[] = [];
  const [{ user_version: userVersion }] = await prisma.$queryRaw<[{ user_version: number }]>`PRAGMA user_version;`;
  const migrations = await getMigrations();
  for (let i = userVersion; i < migrations.length; i++) {
    const migration = migrations[i];
    if (!migration) {
      throw new Error(`Migration ${i} does not exist.`);
    }
    const migrationPromises = migration
      .split(";")
      .slice(0, -1) // remove whitespace after last semicolon
      .map(statement => prisma.$executeRawUnsafe(statement));
    executePromises.push(...migrationPromises);
  }
  executePromises.push(
    prisma.$executeRawUnsafe(`PRAGMA user_version = ${migrations.length};`)
  );
  await prisma.$transaction(executePromises);
}



/**
 * Class that keeps track of a prisma connection
 */
export class DatabaseConnection {


  private constructor(

    /**
     * The path to the database
     */
    public readonly path: string,

    /**
     * The prisma client object of the database
     */
    private readonly prisma: PrismaClient
  ) { }


  /**
   * Creates a new database connection.
   * 
   * If the database doesn't exist, creates it.
   * 
   * @param filePath The path of the database
   */
  static async open(filePath: string): Promise<DatabaseConnection> {
    const prisma = new PrismaClient({
      datasourceUrl: `file:${filePath}`
    });
    await migrate(prisma);
    const database = new DatabaseConnection(filePath, prisma);
    return database
  }

}
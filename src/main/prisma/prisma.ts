import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";


/**
 * The directory of the migrations.
 */
const MIGRATIONS_DIR = `${__dirname}/migrations`;


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
export const makeMigrationsMap = async (): Promise<Map<string, string>> => {
  const migrationNames = (
    await fs.readdir(MIGRATIONS_DIR)
  ).sort();
  const migrationsMap = new Map<string, string>();
  for (const migrationName of migrationNames) {
    if (!await isMigration(migrationName)) {
      continue;
    }
    const migrationFilepath = getMigrationFilepath(migrationName)
    const migrationSql = await fs.readFile(migrationFilepath, "utf-8");
    migrationsMap.set(migrationName, migrationSql);
  }
  return migrationsMap;
};

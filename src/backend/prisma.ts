import { PrismaClient } from "@prisma/client";
import fs from "fs";


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
const isMigration = (migrationName: string) => {
  const migrationDir = getMigrationDir(migrationName);
  if (!fs.statSync(migrationDir).isDirectory()) {
    return false;
  }
  const migrationFilepath = getMigrationFilepath(migrationName);
  const isMigration = fs.statSync(migrationFilepath).isFile()
  return isMigration;
};


/**
 * Makes the map of the migrations
 */
export const makeMigrationsMap = (): Map<string, string> => {
  const migrationNames = fs.readdirSync(MIGRATIONS_DIR).filter(isMigration)
  const migrationsMap = new Map<string, string>();
  migrationNames.forEach((migrationName) => {
    const migrationFilepath = getMigrationFilepath(migrationName)
    const migrationSql = fs.readFileSync(migrationFilepath, "utf-8");
    migrationsMap.set(migrationName, migrationSql);
  });
  return migrationsMap;
}
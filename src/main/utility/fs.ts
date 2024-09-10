

import fs from 'fs';
import path from 'path';
import { formatISO9075 } from 'date-fns';

/**
 * Delete a file if it exists
 * 
 * @param filepath 
 */
export async function deleteFileIfExists(filepath: string) {
  try {
    await fs.promises.unlink(filepath);
  }
  catch {
    // do nothing if deleting the file fails
  }
}


/**
 * Create a backup of a file
 * 
 * @param filepath 
 */
export async function createFileBackup(filepath: string) {
  const dir = path.dirname(filepath);
  const filename = path.basename(filepath);

  // save the backup
  const timestamp = formatISO9075(new Date(), { format: 'basic', });
  const backupFilepath = path.join(dir, `.backup (${timestamp}) ${filename}`);
  await fs.promises.cp(filepath, backupFilepath);

  // delete old backups
  const dirFiles = await fs.promises.readdir(dir);
  const backupFilepaths = dirFiles
    .filter((file) => file.startsWith('.backup') && file.endsWith(filename))
    .sort()
    .reverse();
  for (const backupFilename of backupFilepaths.slice(3)) {
    const backupFilepath = path.join(dir, backupFilename);
    await fs.promises.unlink(backupFilepath);
  }
}
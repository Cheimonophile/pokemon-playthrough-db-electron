

import fs from 'fs';

/**
 * Delete a file if it exists
 * 
 * @param filePath 
 */
export async function deleteFileIfExists(filePath: string) {
  try {
    await fs.promises.unlink(filePath);
  }
  catch {
    // do nothing if deleting the file fails
  }
}
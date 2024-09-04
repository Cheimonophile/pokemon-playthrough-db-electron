import { channels } from "@common/channels";
import { databaseManager } from "@main/managers/DatabaseManager";
import { getBrowserWindowFromWebContents } from "@main/utility/electron";
import { createDatabaseDialog } from "@main/utility/electron/dialog";
import { deleteFileIfExists } from "@main/utility/fs";



/**
 * Handler for getting the current database path
 */
channels.getDatabase.handle(async () => {
  return databaseManager.database?.path ?? null;
})


/**
 * Handler for creating a new database
 */
channels.createDatabase.handle(async (event) => {
  const window = getBrowserWindowFromWebContents(event.sender);
  const filePath = await createDatabaseDialog(window);
  if (!filePath) {
    return;
  }
  await deleteFileIfExists(filePath);
  await databaseManager.openDatabase(filePath);
})
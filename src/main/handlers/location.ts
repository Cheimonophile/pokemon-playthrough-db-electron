import { channels } from "@common/channels";
import { LocationDao } from "@main/domain/daos/LocationDao";
import { databaseManager } from "@main/managers";



/**
 * Get locations from the database
 */
channels.getLocations.mainHandle(async () => {
  const locationDao = new LocationDao(databaseManager.getDatabase());
  const locations = await locationDao.reads();
  return locations;
});
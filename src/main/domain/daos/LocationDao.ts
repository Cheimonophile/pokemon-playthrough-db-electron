import { Dao } from "@main/interfaces/Dao";
import { Location } from "@common/interfaces/models/Location";


export class LocationDao extends Dao {






  /**
   * Read playthroughs from the database
   */
  async reads(): Promise<readonly Location[]> {
    const playthroughs: Location[] = await this.connection.prisma.location.findMany({
      include: {
        region: true
      }
    });
    return playthroughs;
  }
}
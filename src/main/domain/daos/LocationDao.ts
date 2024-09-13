import { Dao } from "@main/interfaces/Dao";
import { Location } from "@common/interfaces/models/Location";


export class LocationDao extends Dao {






  /**
   * Read playthroughs from the database
   */
  async reads({
    regionId
  }: {
    regionId?: string
  }): Promise<readonly Location[]> {
    const playthroughs: Location[] = await this.connection.prisma.location.findMany({
      where: {
        AND: [
          {
            regionId: {
              equals: regionId
            }
          }
        ]
      },
      include: {
        region: true
      }
    });
    return playthroughs;
  }
}
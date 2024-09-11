import { DatabaseConnection } from "../DatabaseConnection";
import { Location } from "@common/interfaces/models/Location";


export class LocationDao {


  constructor(

    /**
     * Internal connection to the database to access playthroughs
     */
    private readonly connection: DatabaseConnection
  ) { }



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
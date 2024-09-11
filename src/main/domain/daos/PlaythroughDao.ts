import { Playthrough } from "@common/interfaces/models/Playthrough";
import { DatabaseConnection } from "../DatabaseConnection";



/**
 * Dao for accessing playthroughs
 */
export class PlaythroughDao {


  constructor(

    /**
     * Internal connection to the database to access playthroughs
     */
    private readonly connection: DatabaseConnection
  ) { }



  /**
   * Read playthroughs from the database
   */
  async reads(): Promise<readonly Playthrough[]> {
    const playthroughs: Playthrough[] = await this.connection.prisma.playthrough.findMany();
    return playthroughs;
  }
}
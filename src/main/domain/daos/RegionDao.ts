import { Region } from "@common/interfaces/models/Region";
import { Dao } from "@main/interfaces/Dao";




export class RegionDao extends Dao {


  /**
   * Read regions from the database
   */
  async reads({
    nameSearch
  }: {
    nameSearch?: string;
  }): Promise<readonly Region[]> {
    const regions: Region[] = await this.connection.prisma.region.findMany({
      where: {
        AND: nameSearch?.split(/\s/)?.filter(value => value)?.map(searchTerm => {
          return {
            name: {
              contains: searchTerm
            }
          }
        })
      }
    });
    return regions;
  }


}
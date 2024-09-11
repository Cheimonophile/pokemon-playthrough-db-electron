import { PageFC } from "@renderer/interfaces/components/PageFC";
import { LocationsTable } from "../tables/LocationsTable";



/**
 * Page for interacting with locations
 */
export const LocationsPage: PageFC = () => {


  return (
    <div className="h-full w-full flex flex-col gap-2">



      {/** locations table */}
      <div className="flex-1 overflow-hidden">
        <LocationsTable />
      </div>
    </div>
  )

}
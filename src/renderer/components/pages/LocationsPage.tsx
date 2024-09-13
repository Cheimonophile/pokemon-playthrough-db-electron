import { PageFC } from "@renderer/interfaces/components/PageFC";
import { LocationsTable } from "../tables/LocationsTable";
import { useState } from "react";
import { RegionCombobox } from "../form/field/combobox/RegionCombobox";



/**
 * Page for interacting with locations
 */
export const LocationsPage: PageFC = () => {

  // id of the region
  const [regionId, setRegionId] = useState<string | null>(null);


  return (
    <div className="h-full w-full flex flex-col gap-2">

      {/** Above Table */}
      <div>


        {/** Input Box */}
        <div className="w-96 flex flex-col gap-2">

          {/** Region Combobox */}
          <RegionCombobox
            regionId={regionId}
            onChange={setRegionId}
          />
        </div>
      </div>

      {/** locations table */}
      <div className="flex-1 overflow-hidden">
        <LocationsTable
          regionId={regionId ?? undefined}
        />
      </div>
    </div>
  )

}
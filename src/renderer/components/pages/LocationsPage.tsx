import { PageFC } from "@renderer/interfaces/components/PageFC";
import { LocationsTable } from "../tables/LocationsTable";
import { ComboboxOption, SingleCombobox } from "../generic/form/Combobox";
import { useCallback, useState } from "react";



/**
 * Page for interacting with locations
 */
export const LocationsPage: PageFC = () => {

  const [region, setRegion] = useState<string | null>(null);


  const fetchRegionOptions = useCallback(async (query: string) => {
    const regions = await window.channels.getRegions.rendererInvoke({
      nameSearch: query
    });
    const options = regions.map<ComboboxOption>(region => {
      return {
        label: region.name,
        key: region.id
      } satisfies ComboboxOption;
    });
    return options;
  }, [])


  return (
    <div className="h-full w-full flex flex-col gap-2">

      {/** Above Table */}
      <div>


        {/** Input Box */}
        <div className="w-96 flex flex-col gap-2">
          <SingleCombobox
            label="Region"
            value={region}
            onChange={setRegion}
            getOptions={fetchRegionOptions}
          />
        </div>

      </div>

      {/** locations table */}
      <div className="flex-1 overflow-hidden">
        <LocationsTable />
      </div>
    </div>
  )

}
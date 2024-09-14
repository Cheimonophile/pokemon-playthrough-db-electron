import { PageFC } from "@renderer/interfaces/components/PageFC";
import { LocationsTable } from "../tables/LocationsTable";
import { useCallback, useState } from "react";
import { RegionCombobox } from "../form/field/comboboxes/RegionCombobox";
import { TextInput } from "../form/field/inputs/TextInput";
import { GButton } from "../form/GButton";
import { useAppContext } from "@renderer/app";



/**
 * Page for interacting with locations
 */
export const LocationsPage: PageFC = () => {

  // context
  const {
    setIsLoading
  } = useAppContext();

  // field state
  const [regionId, setRegionId] = useState<string | null>(null);
  const [newLocationName, setNewLocationName] = useState<string | null>(null);

  /**
   * Create a new location
   */
  const handleOnClickCreateLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!regionId || !newLocationName) return;
      await window.channels.createLocation.rendererInvoke({
        regionId,
        name: newLocationName
      });
      setNewLocationName(null);
    }
    finally {
      setIsLoading(false);
    }
  }, [
    regionId,
    newLocationName,
    setIsLoading
  ]);

  /**
   * Whether the create location button is disabled
   */
  const createLocationButtonDisabled = !regionId || !newLocationName;


  return (
    <div className="h-full w-full flex flex-col gap-2">

      {/** Above Table */}
      <div>


        {/** Input Box */}
        <div className="w-96 flex flex-col gap-0.5">

          {/** Location and Region */}
          <div className="flex flex-row gap-1">

            {/** Region Combobox */}
            <div className="w-24">
              <RegionCombobox
                regionId={regionId}
                onChange={setRegionId}
              />
            </div>

            {/** Location Name */}
            <div className="flex-1">
              <TextInput
                label="Location Name"
                value={newLocationName}
                onChange={setNewLocationName}
              />
            </div>
          </div>


          {/** Create Location Button */}
          <GButton
            text="Create Location"
            onClick={handleOnClickCreateLocation}
            disabled={createLocationButtonDisabled}
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
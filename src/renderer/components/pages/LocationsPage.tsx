import { PageFC } from "@renderer/interfaces/components/PageFC";
import { Table, TableColumn } from "../generic/Table";
import { useLocations } from "@renderer/hooks/data/location";
import { useMemo } from "react";



/**
 * Page for interacting with locations
 */
export const LocationsPage: PageFC = () => {

  /**
   * Get a list of the locations
   */
  const locations = useLocations();

  /**
   * List of the location ids
   */
  const locationIds = useMemo(() => {
    return locations?.map(location => location.id) ?? []
  }, [locations])

  /**
   * Map of the locations
   */
  const locationsMap = useMemo(() => {
    return new Map(locations?.map(location => [location.id, location]) ?? []);
  }, [locations])

  /**
   * Columns for the locations table
   */
  const columns = useMemo<TableColumn<string>[]>(() => [
    {
      label: "Region",
      width: "5rem",
      renderer: id => {
        const location = locationsMap.get(id);
        return location?.region.name ?? "???";
      }
    },
    {
      label: "Name",
      width: "20rem",
      renderer: id => {
        const location = locationsMap.get(id);
        return location?.name ?? "???";
      }
    },
  ], [locationsMap])


  return (
    <div className="h-full w-full flex flex-col gap-2">



      {/** locations table */}
      <div className="flex-1 overflow-hidden">
        <Table
          ids={locationIds}
          columns={columns}
        />
      </div>
    </div>
  )

}
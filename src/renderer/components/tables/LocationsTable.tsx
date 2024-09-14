import { FC, useMemo } from "react"
import { Table, TableColumn } from "../Table"
import { useLocations } from "@renderer/hooks/data/location";
import { DeleteLocationButton } from "../form/buttons/location/DeleteLocationButton";


/**
 * Props for the locations table
 */
export interface LocationsTableProps {

  /**
   * Id of the region to filter by
   */
  regionId?: string;
}



/**
 * Make the locations table generic
 */
export const LocationsTable: FC<LocationsTableProps> = ({
  regionId
}) => {


  /**
   * Get a list of the locations
   */
  const locations = useLocations({
    regionId
  });

  /**
   * List of the location ids
   */
  const locationIds = useMemo(() => {
    return locations?.map(location => location.id).reverse() ?? []
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
      label: "",
      width: "3rem",
      renderer: id => (
        <DeleteLocationButton
          text="X"
          locationId={id}
        />
      )
    },
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
    <Table
      ids={locationIds}
      columns={columns}
    />
  )
}
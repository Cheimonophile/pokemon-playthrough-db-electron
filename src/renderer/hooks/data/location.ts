import { useCallback } from "react";
import { GetDataCallback, useData } from "../useData";
import { Location } from '@common/interfaces/models/Location'



/**
 * Use the locations
 */
export function useLocations() {

  /**
   * Get the locations
   */
  const getLocations = useCallback<GetDataCallback<readonly Location[]>>(async () => {
    const locations = await window.channels.getLocations.rendererInvoke();
    return locations;
  }, []);

  /**
   * Get the locations data
   */
  const locations = useData(getLocations);

  return locations
}
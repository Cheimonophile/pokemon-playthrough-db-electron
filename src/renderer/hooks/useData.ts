import { useCallback, useEffect, useState } from "react";
import { useObserveBackend } from "./useObserverBackend";

/**
 * Callback function for the getDataHook
 */
export interface GetDataFn<T> {
  (): Promise<T>;
}


/**
 * Hook that fetches data from the main process
 * 
 * Data gets refetched every time the observer is notified
 * 
 * @param callback 
 * @returns 
 */
export function useData<T>(callback: GetDataFn<T>) {
  const [data, setData] = useState<T | undefined>(undefined);

  /**
   * Fetches the data from the main process
   */
  const getData = useCallback(async () => {
    const data = await callback();
    setData(data);
  }, [callback]);

  /**
   * Every time get data changes, set the data back to undefined
   */
  useEffect(() => {
    getData();
    return () => {
      setData(undefined);
    }
  }, [getData])


  /**
   * Get the data every time the backend notifies that the data has changed
   */
  useObserveBackend(getData);



  return data;
}






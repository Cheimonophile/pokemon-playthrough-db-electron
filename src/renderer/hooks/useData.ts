import { observer } from "@renderer/observer";
import { useEffect, useState } from "react";

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
  const [data, setData] = useState<T>();
  useEffect(() => {
    const observerFn = async () => {
      const data = await callback();
      setData(data);
    }
    observerFn();
    observer.addObserver(observerFn);
    return () => {
      observer.removeObserver(observerFn);
    }
  }, [callback]);
  return data;
}
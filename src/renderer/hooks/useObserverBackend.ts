import { useEffect } from "react";



/**
 * Set of observers that are called when the backend notifies that the data has changed
 */
const observers: Set<() => void> = new Set();


/**
 * Watch to see when the backend changes, and notify observers
 */
window.observerChannel.rendererOn(() => {
  observers.forEach(observer => observer());
});


/**
 * Callback that is called when the backend notifies that the data has changed
 */
export interface UseObserveBackendCallback {
  (): void;
}

/**
 * Pass a callback to be called when the backend notifies that the data has changed
 * 
 * @param callback 
 */
export function useObserveBackend(callback: UseObserveBackendCallback) {

  /**
   * Every time the increment changes or the callback is changed, call it
   */
  useEffect(() => {
    observers.add(callback);
    return () => {
      observers.delete(callback);
    }
  }, [callback]);
}
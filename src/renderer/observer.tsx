

/**
 * Callback function for the observer
 */
export interface ObserverFn {
  (): void;
}


/**
 * Class that watches for changes in the state of the application and notifies components when they need to be updated
 */
class Observer {


  /**
   * List of observers
   */
  private observers: Set<ObserverFn> = new Set();


  /**
   * Value that gets incremented each time the observer is notified
   */
  private increment: number = 0;


  /**
   * Add an observer
   */
  public addObserver(observer: ObserverFn) {
    this.observers.add(observer);
  }

  /**
   * Remove an observer
   */
  public removeObserver(observer: ObserverFn) {
    this.observers.delete(observer);
  }
}


/**
 * Observer instance for the application
 */
export const observer = new Observer();
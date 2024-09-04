

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

  /**]
   * Notify all observers
   */
  public async notify() {
    await Promise.all(
      Array.from(this.observers).map((observer) => observer())
    );
  }
}


/**
 * Observer instance for the application
 */
export const observer = new Observer();
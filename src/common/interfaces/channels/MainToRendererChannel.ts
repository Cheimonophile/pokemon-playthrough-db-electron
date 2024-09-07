import { ipcRenderer, WebContents } from "electron";





/**
 * Sends a value to the renderer processes
 */
export interface MainToRendererChannelSend<P> {
  (params: P, ...webContents: WebContents[]): void;
}

/**
 * Renderer callback for a channel from the main process
 */
export interface MainToRendererChannelOnCallback<P> {
  (params: P): void
}

/**
 * Subscribes to a channel from the main process
 */
export interface MainToRendererChannelOn<P> {
  (callback: MainToRendererChannelOnCallback<P>): void
}


/**
 * Channel that takes parameters from the main process and sends them to the renderer process
 */
export interface MainToRendererChannel<P> {

  /**
   * Sends the parameters a renderer process
   * 
   * @param params 
   * @returns 
   */
  readonly mainSend: MainToRendererChannelSend<P>;


  /**
   * Subscribe to a channel from the main process
   * 
   * @param callback 
   * @returns 
   */
  readonly rendererOn: MainToRendererChannelOn<P>;

}



/**
 * Makes a Main to Renderer channel for IPC communication
 * 
 * @param channelName 
 * @returns 
 */
export function makeMainToRendererChannel<P>(channelName: string): MainToRendererChannel<P> {
  const channel: MainToRendererChannel<P> = {
    mainSend: (params: P, ...webContents: WebContents[]) => {
      for (const webContent of webContents) {
        webContent.send(channelName, params);
      }
    },
    rendererOn: (callback: MainToRendererChannelOnCallback<P>) => {
      ipcRenderer.on(channelName, (event, params) => {
        callback(params);
      });
    }
  };
  return channel;
}
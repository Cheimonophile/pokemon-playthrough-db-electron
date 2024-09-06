import { dialog, ipcMain, IpcMainInvokeEvent, ipcRenderer } from "electron";





/**
 * Channel invoke interface
 */
export interface RendererToMainChannelInvoke<P, R> {
  (params: P): Promise<R>;
}

/**
 * Channel handle callback interface
 */
export interface RendererToMainChannelHandleCallback<P, R> {
  (event: IpcMainInvokeEvent, params: P): Promise<R>;
}


/**
 * Channel handle interface
 */
export interface RendererToMainChannelHandle<P, R> {
  (callback: RendererToMainChannelHandleCallback<P, R>): void;
}




/**
 * Channel interface
 */
export interface RendererToMainChannel<P = unknown, R = unknown> {

  /**
   * Invokes the channel
   * 
   * DO NOT CALL IN MAIN PROCESS; CAN ONLY BE USED IN RENDERER
   */
  readonly rendererInvoke: RendererToMainChannelInvoke<P, R>;

  /**
   * Handler for the channel
   * 
   * DO NOT CALL IN RENDERER PROCESS; CAN ONLY BE USED IN MAIN
   */
  readonly mainHandle: RendererToMainChannelHandle<P, R>;
}

/**
 * Makes a channel for IPC communication
 * 
 * @param channelName 
 * @returns 
 */
export function makeRendererToMainChannel<P, R>(channelName: string): RendererToMainChannel<P, R> {
  const channel: RendererToMainChannel<P, R> = {
    rendererInvoke: async (params: P) => {
      return ipcRenderer.invoke(channelName, params);
    },
    mainHandle: (callback) => {
      ipcMain.handle(channelName, async (event, params) => {
        try {
          const result = await callback(event, params);
          return result;
        }
        catch (caught) {
          console.error(caught);
          const error = caught instanceof Error
            ? caught
            : new Error(`${caught}`);
          await dialog.showErrorBox(error.name, error.message);
        }
      })
    }
  }
  return channel
}
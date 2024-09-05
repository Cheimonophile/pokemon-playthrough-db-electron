import { dialog, ipcMain, IpcMainInvokeEvent, ipcRenderer } from "electron";





/**
 * Channel invoke interface
 */
export interface RendererToMainChannelInvoke<Params, Return> {
  (params: Params): Promise<Return>;
}

/**
 * Channel handle callback interface
 */
export interface RendererToMainChannelHandleCallback<Params, Return> {
  (event: IpcMainInvokeEvent, params: Params): Promise<Return>;
}


/**
 * Channel handle interface
 */
export interface RendererToMainChannelHandle<Params, Return> {
  (callback: RendererToMainChannelHandleCallback<Params, Return>): void;
}




/**
 * Channel interface
 */
export interface RendererToMainChannel<Params = unknown, Return = unknown> {

  /**
   * Invokes the channel
   * 
   * DO NOT CALL IN MAIN PROCESS; CAN ONLY BE USED IN RENDERER
   */
  readonly rendererInvoke: RendererToMainChannelInvoke<Params, Return>;

  /**
   * Handler for the channel
   * 
   * DO NOT CALL IN RENDERER PROCESS; CAN ONLY BE USED IN MAIN
   */
  readonly mainHandle: RendererToMainChannelHandle<Params, Return>;
}

/**
 * Makes a channel for IPC communication
 * 
 * @param channelName 
 * @returns 
 */
export function makeRendererToMainChannel<Params, Return>(channelName: string): RendererToMainChannel<Params, Return> {
  const channel: RendererToMainChannel<Params, Return> = {
    rendererInvoke: async (params: Params) => {
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
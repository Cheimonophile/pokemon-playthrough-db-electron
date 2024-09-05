import { dialog, ipcMain, IpcMainInvokeEvent, ipcRenderer } from "electron";





/**
 * Channel invoke interface
 */
export interface ChannelInvoke<Params, Return> {
  (params: Params): Promise<Return>;
}

/**
 * Channel handle callback interface
 */
export interface ChannelHandleCallback<Params, Return> {
  (event: IpcMainInvokeEvent, params: Params): Promise<Return>;
}


/**
 * Channel handle interface
 */
export interface ChannelHandle<Params, Return> {
  (callback: ChannelHandleCallback<Params, Return>): void;
}




/**
 * Channel interface
 */
export interface Channel<Params = unknown, Return = unknown> {

  /**
   * Invokes the channel
   * 
   * DO NOT CALL IN MAIN PROCESS; CAN ONLY BE USED IN RENDERER
   */
  readonly rendererInvoke: ChannelInvoke<Params, Return>;

  /**
   * Handler for the channel
   * 
   * DO NOT CALL IN RENDERER PROCESS; CAN ONLY BE USED IN MAIN
   */
  readonly mainHandle: ChannelHandle<Params, Return>;
}

/**
 * Makes a channel for IPC communication
 * 
 * @param channelName 
 * @returns 
 */
export function makeChannel<Params, Return>(channelName: string): Channel<Params, Return> {
  const channel: Channel<Params, Return> = {
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
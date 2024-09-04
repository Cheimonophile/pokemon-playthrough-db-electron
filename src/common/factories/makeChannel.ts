import { Channel } from "@common/interfaces/Channel";
import { dialog, ipcMain, ipcRenderer } from "electron";


/**
 * Makes a channel for IPC communication
 * 
 * @param channelName 
 * @returns 
 */
export function makeChannel<Params, Return>(channelName: string): Channel<Params, Return> {
  const channel: Channel<Params, Return> = {
    invoke: async (params: Params) => {
      return ipcRenderer.invoke(channelName, params);
    },
    handle: (callback) => {
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
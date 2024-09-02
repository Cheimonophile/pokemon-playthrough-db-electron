import { Channel } from "@common/interfaces/Channel";
import { ipcMain, ipcRenderer } from "electron";


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
        return callback(event, params);
      })
    }
  }
  return channel
}
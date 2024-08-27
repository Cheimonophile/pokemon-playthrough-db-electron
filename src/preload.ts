// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron/renderer";
import { WindowBackend } from "./interfaces";
import { ipcRenderer } from "electron";



contextBridge.exposeInMainWorld('backend', {
  setDatabase: (databaseFilepath: string) => ipcRenderer.invoke('setDatabase', databaseFilepath)
} satisfies WindowBackend);
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { PkmnDb } from "./common/interfaces/PkmnDb";






contextBridge.exposeInMainWorld('backend', {
  setDatabase: (databaseFilepath: string) => ipcRenderer.invoke('setDatabase', databaseFilepath)
} satisfies PkmnDb);
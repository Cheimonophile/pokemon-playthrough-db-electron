// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, ipcMain } from "electron";
import { Bridge } from "./common/interfaces/Bridge";



/**
 * The Bridge object that will be exposed to the renderer process
 */
const bridge: Bridge = {}


contextBridge.exposeInMainWorld('bridge', bridge);
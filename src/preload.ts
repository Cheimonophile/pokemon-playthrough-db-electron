// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { channels } from "@common/channels";
import { contextBridge } from "electron";



/**
 * The Bridge object that will be exposed to the renderer process
 */
const bridge = Object.freeze({
  channels
})

export type Bridge = typeof bridge;


contextBridge.exposeInMainWorld('bridge', bridge);
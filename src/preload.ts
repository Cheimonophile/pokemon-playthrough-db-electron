// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { channels } from "@common/channels";
import { contextBridge } from "electron";




contextBridge.exposeInMainWorld('channels', channels);

export type Channels = typeof channels;
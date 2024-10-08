// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { channels, observerChannel } from "@common/channels";
import { contextBridge } from "electron";



contextBridge.exposeInMainWorld('channels', channels);
export type Channels = typeof channels;


contextBridge.exposeInMainWorld('observerChannel', observerChannel);
export type ObserverChannel = typeof observerChannel;
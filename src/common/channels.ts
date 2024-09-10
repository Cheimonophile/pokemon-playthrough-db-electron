import { makeMainToRendererChannel } from "./interfaces/channels/MainToRendererChannel";
import { RendererToMainChannel, makeRendererToMainChannel } from "./interfaces/channels/RendererToMainChannel";

/**
 * Channels available to the application
 * 
 * DO NOT IMPORT IN RENDERER PROCESS; CAN ONLY BE USED IN MAIN AND PRELOAD
 * 
 * use window.channels instead
 */
export const channels = Object.freeze({
  getDatabasePath: makeRendererToMainChannel<void, string | null>("getDatabasePath"),
  createDatabase: makeRendererToMainChannel<void, void>("createDatabase"),
  createDatabaseFromOld: makeRendererToMainChannel<void, void>("createDatabaseFromOld"),
  openDatabase: makeRendererToMainChannel<void, void>("openDatabase"),
} satisfies {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: RendererToMainChannel<any, any>;
})



/**
 * Observer channel. 
 * 
 * Used to allow the the main process to notify observer processes of changes
 * 
 * Should pass back a number that gets incremented every time the state changes
 */
export const observerChannel = makeMainToRendererChannel<void>("observerChannel");
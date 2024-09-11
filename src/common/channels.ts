import { makeMainToRendererChannel } from "./interfaces/channels/MainToRendererChannel";
import { RendererToMainChannel, makeRendererToMainChannel } from "./interfaces/channels/RendererToMainChannel";
import { Location } from "./interfaces/models/Location";
import { Playthrough } from "./interfaces/models/Playthrough";

/**
 * Channels available to the application
 * 
 * DO NOT IMPORT IN RENDERER PROCESS; CAN ONLY BE USED IN MAIN AND PRELOAD
 * 
 * use window.channels instead
 */
export const channels = Object.freeze({

  // database channels
  getDatabasePath: makeRendererToMainChannel<void, string | null>("getDatabasePath"),
  createDatabase: makeRendererToMainChannel<void, void>("createDatabase"),
  createDatabaseFromOld: makeRendererToMainChannel<void, void>("createDatabaseFromOld"),
  openDatabase: makeRendererToMainChannel<void, void>("openDatabase"),

  // location channels
  getLocations: makeRendererToMainChannel<void, readonly Location[]>("getLocations"),

  // playthrough channels
  getPlaythroughs: makeRendererToMainChannel<void, readonly Playthrough[]>("getPlaythroughs"),
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
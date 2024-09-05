import { RendererToMainChannel, makeRendererToMainChannel } from "./interfaces/channels/RendererToMainChannel";

/**
 * Channels available to the application
 * 
 * DO NOT IMPORT IN RENDERER PROCESS; CAN ONLY BE USED IN MAIN AND PRELOAD
 * 
 * use window.channels instead
 */
export const channels = Object.freeze({
  createDatabase: makeRendererToMainChannel<void, void>("createDatabase"),
  getDatabase: makeRendererToMainChannel<void, string | null>("getDatabase"),
} satisfies {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: RendererToMainChannel<any, any>;
})
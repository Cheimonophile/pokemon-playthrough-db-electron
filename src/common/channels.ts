import { makeChannel } from "./factories/makeChannel";
import { Channel } from "./interfaces/Channel";

/**
 * Channels available to the application
 * 
 * DO NOT IMPORT IN RENDERER PROCESS; CAN ONLY BE USED IN MAIN AND PRELOAD
 * 
 * use window.channels instead
 */
export const channels = Object.freeze({
  getDatabase: makeChannel<void, string | null>("getDatabase"),
} satisfies {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Channel<any, any>;
})
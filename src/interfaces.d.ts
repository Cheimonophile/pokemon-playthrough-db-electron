
import { Channels, ObserverChannel } from './preload'


declare global {
  interface Window {
    readonly channels: Channels,
    readonly observerChannel: ObserverChannel,
  }
}
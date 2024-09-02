
import { Channels } from './preload'


declare global {
  interface Window {
    readonly channels: Channels,
  }
}
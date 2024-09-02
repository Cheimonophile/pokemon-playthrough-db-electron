
import { Bridge } from './preload'


declare global {
  interface Window {
    readonly bridge: Bridge,
  }
}

import { Bridge } from './renderer/interfaces/Bridge';



declare global {
  interface Window {
    readonly bridge: Bridge,
  }
}
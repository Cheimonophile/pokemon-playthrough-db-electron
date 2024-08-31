
import { Bridge } from './common/interfaces/Bridge';



declare global {
  interface Window {
    readonly bridge: Bridge,
  }
}


import { PkmnDb } from '@common/interfaces/PkmnDb.js'



declare global {
  interface Window {
    readonly pkmndb: PkmnDb,
  }
}
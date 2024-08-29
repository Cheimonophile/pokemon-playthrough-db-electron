import { PkmnDbWindow } from "@main/interfaces/PkmnDbWindow";



export class HomeWindow extends PkmnDbWindow {
  constructor() {
    super();
    this.webContents.openDevTools();
  }
}
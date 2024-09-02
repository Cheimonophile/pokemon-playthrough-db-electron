import { IpcMainInvokeEvent } from "electron";





/**
 * Channel invoke interface
 */
export interface ChannelInvoke<Params, Return> {
  (params: Params): Promise<Return>;
}

/**
 * Channel handle callback interface
 */
export interface ChannelHandleCallback<Params, Return> {
  (event: IpcMainInvokeEvent, params: Params): Promise<Return>;
}


/**
 * Channel handle interface
 */
export interface ChannelHandle<Params, Return> {
  (callback: ChannelHandleCallback<Params, Return>): void;
}




/**
 * Channel interface
 */
export interface Channel<Params = unknown, Return = unknown> {

  /**
   * Invokes the channel
   */
  readonly invoke: ChannelInvoke<Params, Return>;

  /**
   * Handler for the channel
   */
  readonly handle: ChannelHandle<Params, Return>;
}
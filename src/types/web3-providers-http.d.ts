declare module 'web3-providers-http' {
  export interface JsonRPCRequest {
    jsonrpc: string;
    method: string;
    params: any[];
    id: number;
  }
  export interface JsonRPCResponse {
    jsonrpc: string;
    id: number;
    result?: any;
    error?: string;
  }

  export type JsonRPCCallback = (e: Error, val: JsonRPCResponse) => void;

  export default class HttpProvider {
    public responseCallbacks: undefined;
    public notificationCallbacks: undefined;
    public connection: undefined;
    public addDefaultEvents: undefined;
    public headers: any[];

    constructor(host: string, timeout: number, headers: any);

    public on(type: string, callback: () => any): undefined;
    public removeListener(type: string, callback: () => any): undefined;
    public removeAllListeners(type: string): undefined;
    public reset(): undefined;

    public send(payload: JsonRPCRequest, callback: JsonRPCCallback): void;
  }
}

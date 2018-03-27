declare module 'web3-providers-http' {
    export interface JsonRPCRequest {
        jsonrpc: string
        method: string
        params: any[]
        id: number
    }
    export interface JsonRPCResponse {
        jsonrpc: string
        id: number
        result?: any
        error?: string
    }

    export type JsonRPCCallback = (e: Error, val: JsonRPCResponse) => void;

    export default class HttpProvider {
        responseCallbacks: undefined
        notificationCallbacks: undefined
        connection: undefined
        addDefaultEvents: undefined
        on(type: string, callback: () => any): undefined
        removeListener(type: string, callback: () => any): undefined
        removeAllListeners(type: string): undefined
        reset(): undefined

        constructor(host: string, timeout: number, headers: any);

        send(payload: JsonRPCRequest, callback: JsonRPCCallback): void
    }
}

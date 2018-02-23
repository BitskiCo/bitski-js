declare module 'web3-providers-http' {
    interface JsonRPCRequest {
        jsonrpc: string
        method: string
        params: any[]
        id: number
    }
    interface JsonRPCResponse {
        jsonrpc: string
        id: number
        result?: any
        error?: string
    }

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
    
        send(payload: JsonRPCRequest): JsonRPCResponse
        sendAsync(payload: JsonRPCRequest, callback: (e: Error, val: JsonRPCResponse) => void): void
    }
}

// Creates an RPC request
export function createRequest(method: string, params?: any[]): any {
  return {
      id: 0,
      jsonrpc: '2.0',
      method,
      params,
  };
}

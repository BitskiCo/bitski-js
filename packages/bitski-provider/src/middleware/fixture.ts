import { EthMethod, EthMethodResults } from 'eth-provider-types';
import { JsonRpcMiddleware } from 'json-rpc-engine';

export type Fixtures = Partial<{
  [key in EthMethod]: EthMethodResults[key];
}>;

export const DEFAULT_FIXTURES: Fixtures = {
  [EthMethod.web3_clientVersion]: 'Bitski/latest',
  [EthMethod.net_listening]: true,
  [EthMethod.eth_hashrate]: '0x00',
  [EthMethod.eth_mining]: false,
};

export const createFixtureMiddleware = (
  fixtures: Fixtures = DEFAULT_FIXTURES,
): JsonRpcMiddleware<unknown[], unknown> => {
  return (req, res, next, end) => {
    const fixture = fixtures[req.method];

    if (fixture !== undefined) {
      res.result = fixture;
      return end();
    } else {
      next();
    }
  };
};

import { EthMethod } from 'eth-provider-types';

import { EthChainDefinitionWithRpcUrl } from './types';
import { toHex } from './utils/parse-utils';

// URLs
export const BITSKI_API_BASE_URL = 'https://api.bitski.com/v1';
export const BITSKI_RPC_BASE_URL = 'https://api.bitski.com/v1/web3';
export const BITSKI_SIGNER_BASE_URL = 'https://sign.bitski.com';
export const IFRAME_MESSAGE_ORIGIN_ENDS_WITH = '.bitski.com';

export const SIGN_METHODS: string[] = [
  EthMethod.eth_sendTransaction,
  EthMethod.eth_signTransaction,
  EthMethod.eth_sign,
  EthMethod.eth_signTypedData,
  EthMethod.eth_signTypedData_v3, // For metamask compatibility
  EthMethod.eth_signTypedData_v4,

  // Kept for legacy compat
  'personal_sign',
];

// JSON-RPC methods that require Authorization header
export const AUTHENTICATED_METHODS: string[] = [
  EthMethod.eth_requestAccounts,
  EthMethod.eth_accounts,
  ...SIGN_METHODS,
];

// Error messages that are usually transient and should be retried
export const RETRIABLE_ERRORS = [
  // ignore server overload errors
  'Gateway timeout',
  'ETIMEDOUT',
  'ENOTFOUND', // DNS error
  // ignore server sent html error pages
  // or truncated json responses
  'SyntaxError',
  'ECONNRESET',
  'EHOSTUNREACH',
  'Timeout out while waiting for response', // Actix timeout
];

// Errors that indicate the access token is not valid
export const UNAUTHORIZED_ERRORS = [
  'Missing auth', // No token sent
  'Invalid client id', // Wrong client id, or invalid access token
  'Not Authorized',
];

// These are chains we support on our backend, e.g. for nonce management and such
export const SUPPORTED_CHAIN_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 38, 40, 41, 42, 43, 44, 45, 50, 51, 52, 53, 54, 55, 56, 57, 58,
  59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 74, 76, 77, 78, 79, 80, 81, 82, 83, 85, 86, 87,
  88, 89, 90, 91, 92, 93, 95, 96, 97, 99, 100, 101, 102, 105, 106, 107, 108, 110, 111, 122, 123,
  124, 125, 126, 127, 128, 137, 141, 142, 162, 163, 168, 170, 172, 186, 188, 189, 199, 200, 211,
  218, 222, 225, 226, 246, 250, 256, 258, 262, 269, 288, 300, 321, 322, 333, 335, 336, 338, 361,
  363, 364, 365, 369, 385, 420, 499, 512, 513, 555, 558, 588, 595, 600, 666, 686, 700, 707, 708,
  721, 777, 787, 788, 803, 820, 821, 880, 888, 900, 901, 902, 903, 940, 941, 942, 977, 998, 999,
  1001, 1007, 1008, 1010, 1012, 1022, 1023, 1024, 1028, 1030, 1088, 1139, 1140, 1197, 1201, 1202,
  1213, 1214, 1280, 1284, 1285, 1286, 1287, 1288, 1337, 1618, 1620, 1657, 1688, 1856, 1898, 1984,
  1987, 2001, 2020, 2021, 2022, 2025, 2100, 2101, 2152, 2153, 2213, 2221, 2559, 3000, 3001, 3331,
  3333, 3334, 3400, 3500, 3690, 3966, 3967, 4002, 4102, 4689, 4690, 4918, 5197, 5315, 5700, 5777,
  5851, 5869, 6626, 7341, 7878, 8000, 8001, 8029, 8080, 8217, 8285, 8723, 8724, 8888, 8995, 9000,
  9001, 9100, 9527, 9999, 10000, 10001, 10101, 10823, 11111, 11437, 12051, 12052, 13381, 16000,
  16001, 19845, 21337, 21816, 24484, 24734, 31102, 31337, 32659, 39797, 42069, 42161, 42220, 42261,
  42262, 43110, 43113, 43114, 44787, 45000, 47805, 49797, 53935, 55555, 55556, 60000, 60001, 60002,
  60103, 62320, 63000, 63001, 69420, 70000, 70001, 70002, 70103, 71393, 73799, 78110, 80001, 99998,
  99999, 100000, 100001, 100002, 100003, 100004, 100005, 100006, 100007, 100008, 108801, 110000,
  110001, 110002, 110003, 110004, 110005, 110006, 110007, 110008, 200101, 200625, 201018, 201030,
  210425, 234666, 246529, 246785, 281121, 333888, 333999, 421611, 444900, 666666, 888888, 955305,
  1313114, 1313500, 1337702, 2203181, 7762959, 11155111, 13371337, 18289463, 20181205, 28945486,
  35855456, 61717561, 99415706, 192837465, 245022926, 245022934, 245022940, 311752642, 356256156,
  486217935, 1122334455, 1313161554, 1313161555, 1313161556, 1666600000, 1666600001, 1666600002,
  1666600003, 1666700000, 1666700001, 1666700002, 1666700003, 2021121117, 3125659152, 4216137055,
  11297108099, 11297108109, 197710212030, 197710212031, 6022140761023, 868455272153094,
].map(toHex);

const makeChainDef = (
  chainId: number,
  chainName: string,
  blockExplorerUrl: string,
): EthChainDefinitionWithRpcUrl => ({
  chainId: toHex(chainId),
  rpcUrls: [`https://api.bitski.com/v1/web3/chains/${chainId}`],
  chainName,
  blockExplorerUrls: [blockExplorerUrl],
});

export const Mainnet = makeChainDef(1, 'Mainnet', 'https://etherscan.io/');
export const Goerli = makeChainDef(5, 'Görli', 'https://goerli.etherscan.io/');
export const Polygon = makeChainDef(137, 'Polygon', 'https://polygonscan.com/');
export const Mumbai = makeChainDef(80001, 'Mumbai', 'https://mumbai.polygonscan.com/');
export const ArbitrumOne = makeChainDef(42161, 'ArbitrumOne', 'https://arbiscan.io/');
export const Optimism = makeChainDef(10, 'Optimism', 'https://optimistic.etherscan.io/');
export const BinanceSmartChain = makeChainDef(56, 'BinanceSmartChain', 'https://bscscan.com/');
export const BinanceSmartChainTestnet = makeChainDef(
  97,
  'BinanceSmartChainTestnet',
  'https://testnet.bscscan.com/',
);

export const DEFAULT_CHAINS: EthChainDefinitionWithRpcUrl[] = [
  Mainnet,
  Goerli,
  Polygon,
  Mumbai,
  ArbitrumOne,
  Optimism,
  BinanceSmartChain,
  BinanceSmartChainTestnet,
];

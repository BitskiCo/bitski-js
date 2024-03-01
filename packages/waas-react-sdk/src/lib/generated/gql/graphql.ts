/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: Date; output: Date; }
  JSONObject: { input: any; output: any; }
  join__FieldSet: { input: any; output: any; }
  link__Import: { input: any; output: any; }
};

export enum AccountTag {
  Portfolio = 'PORTFOLIO',
  Watchlist = 'WATCHLIST'
}

export type Activity = {
  chainId: Scalars['Int']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type ActivityConnection = {
  __typename?: 'ActivityConnection';
  edges: Array<ActivityEdge>;
  nodes: Array<ActivityV2>;
  pageInfo: PageInfo;
};

export type ActivityEdge = {
  __typename?: 'ActivityEdge';
  cursor: Scalars['String']['output'];
  node: ActivityV2;
};

export type ActivityStatistics = {
  __typename?: 'ActivityStatistics';
  address: Scalars['String']['output'];
  totalMints: Scalars['Int']['output'];
  totalPurchases: Scalars['Int']['output'];
  totalSales: Scalars['Int']['output'];
};

export type ActivityV2 = {
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type ActivityV2Features = {
  includeAirdrops?: InputMaybe<Scalars['Boolean']['input']>;
  includeBatchTransfers?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ActivityV3 = {
  __typename?: 'ActivityV3';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  details?: Maybe<ActivityV2>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  transactionHash: Scalars['String']['output'];
};

export type Address = {
  raw: Scalars['String']['output'];
};

export type AddressWithId = {
  address: Scalars['String']['input'];
  /** Used for spam checking */
  blockchainAccountId: Scalars['String']['input'];
};

export type Amount = {
  __typename?: 'Amount';
  decimals?: Maybe<Scalars['Int']['output']>;
  formatted?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};


export type AmountFormattedArgs = {
  input?: InputMaybe<FormattedAmountInput>;
};

export type AmountInput = {
  decimals?: InputMaybe<Scalars['Int']['input']>;
  value: Scalars['String']['input'];
};

export type Balance = {
  __typename?: 'Balance';
  /** @deprecated Use `addressV2.raw` */
  address: Scalars['String']['output'];
  /** @deprecated use `addressV3` */
  addressV2: Address;
  addressV3: BlockchainAddress;
  amount: Scalars['String']['output'];
  /** @deprecated Use `amountUnit.value` */
  amountBigInt: Scalars['BigInt']['output'];
  amountUnit?: Maybe<Amount>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  token: Token;
  value?: Maybe<Scalars['String']['output']>;
  valueUnit?: Maybe<Amount>;
};

export enum BalanceType {
  Currencies = 'CURRENCIES',
  Nfts = 'NFTS'
}

export type BannerItem = {
  __typename?: 'BannerItem';
  /** The source url for the image on this modal */
  animationUrl?: Maybe<Scalars['String']['output']>;
  /** The number of this Product / Claim  that are available */
  availableCount?: Maybe<Scalars['Int']['output']>;
  /** The Bitski Product ID */
  bitskiProductId?: Maybe<Scalars['String']['output']>;
  /** The Claim ID.  Optional because Product types won't have a Claim */
  claimId?: Maybe<Scalars['String']['output']>;
  /** The type of Claim */
  claimableType?: Maybe<ClaimableType>;
  /** Confirmation view description */
  confirmationDescription?: Maybe<Scalars['String']['output']>;
  /** Confirmation view title */
  confirmationTitle?: Maybe<Scalars['String']['output']>;
  /** Drop Link URL */
  droplinkUrl?: Maybe<Scalars['String']['output']>;
  /** Time the link will expire */
  expireTime?: Maybe<Scalars['DateTime']['output']>;
  /** The Product ID that is suitable for an In App Purchase */
  iapProductId?: Maybe<Scalars['String']['output']>;
  /** A unique ID that is agnostic of Claims -- comes directly from Contentful */
  id: Scalars['String']['output'];
  /** An image associated with this banner */
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** A link to additional contents / materials on the web */
  learnMore?: Maybe<Scalars['String']['output']>;
  /** Preclaim modal view description */
  modalDescription?: Maybe<Scalars['String']['output']>;
  /** Copy that is shown with share sheet materials */
  shareText?: Maybe<Scalars['String']['output']>;
  /** The title copy for this banner */
  title?: Maybe<Scalars['String']['output']>;
};

export type BatchTokenMintV2 = ActivityV2 & BatchTokenTransferV2 & {
  __typename?: 'BatchTokenMintV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  cost?: Maybe<Scalars['String']['output']>;
  costUnit?: Maybe<Amount>;
  count?: Maybe<Scalars['Int']['output']>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type BatchTokenReceivedV2 = ActivityV2 & BatchTokenTransferV2 & {
  __typename?: 'BatchTokenReceivedV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  fromAddress?: Maybe<EvmAddress>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type BatchTokenSentV2 = ActivityV2 & BatchTokenTransferV2 & {
  __typename?: 'BatchTokenSentV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  toAddress?: Maybe<EvmAddress>;
  transaction: Transaction;
};

export type BatchTokenTransferAbsoluteV2 = ActivityV2 & BatchTokenTransferV2 & {
  __typename?: 'BatchTokenTransferAbsoluteV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  transaction: Transaction;
};

export type BatchTokenTransferV2 = {
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
};

export type BlockchainAccount = {
  __typename?: 'BlockchainAccount';
  /** @deprecated use `addressV2` */
  address: Scalars['String']['output'];
  addressV2: EvmAddress;
  allNFTTags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  annotations?: Maybe<Scalars['JSONObject']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  balances?: Maybe<Array<Maybe<Balance>>>;
  coinType: Scalars['Int']['output'];
  contractsForTag?: Maybe<Array<Maybe<ContractKeys>>>;
  createdAt: Scalars['DateTime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use `avatar` */
  emoji?: Maybe<Scalars['String']['output']>;
  enabledNotifications?: Maybe<Array<NotificationType>>;
  hardwareWalletDetails?: Maybe<HardwareWalletDetails>;
  hasSeenOnboarding?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<RemoteAsset>;
  isPortfolio?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated Use `kindV2` */
  kind: BlockchainAccountKind;
  kindV2: BlockchainAccountKindV2;
  labels?: Maybe<Scalars['JSONObject']['output']>;
  tagsForAllNFTs?: Maybe<Array<Maybe<TokenTags>>>;
  tagsForContract?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tagsForNFT?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tokensForTag?: Maybe<Array<Maybe<TokenKeys>>>;
  totalCurrencyValue?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use `totalCurrencyValue(input: { currency: USD })` */
  totalCurrencyValueUSD?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


export type BlockchainAccountBalancesArgs = {
  input: GetBlockchainAccountBalancesInput;
};


export type BlockchainAccountContractsForTagArgs = {
  input: Scalars['String']['input'];
};


export type BlockchainAccountTagsForContractArgs = {
  input: ContractInput;
};


export type BlockchainAccountTagsForNftArgs = {
  input: NftInput;
};


export type BlockchainAccountTokensForTagArgs = {
  input: Scalars['String']['input'];
};


export type BlockchainAccountTotalCurrencyValueArgs = {
  input: TotalCurrencyValueV2Input;
};


export type BlockchainAccountTotalCurrencyValueUsdArgs = {
  input: TotalCurrencyValueInput;
};

export enum BlockchainAccountKind {
  Bitski = 'Bitski',
  ContractWallet = 'ContractWallet',
  View = 'View'
}

export enum BlockchainAccountKindV2 {
  AccountAbstraction = 'ACCOUNT_ABSTRACTION',
  Bitski = 'BITSKI',
  EthAccount = 'ETH_ACCOUNT',
  Hardware = 'HARDWARE',
  SelfCustody = 'SELF_CUSTODY',
  SelfCustodyInstalled = 'SELF_CUSTODY_INSTALLED',
  Watched = 'WATCHED'
}

export type BlockchainAccountPayload = {
  __typename?: 'BlockchainAccountPayload';
  blockchainAccount?: Maybe<BlockchainAccount>;
};

export type BlockchainAccounts = {
  __typename?: 'BlockchainAccounts';
  accounts: Array<BlockchainAccount>;
  currencySummary?: Maybe<CurrencyPortfolioSummary>;
  historicalTotalValue?: Maybe<Array<HistoricalTotalValuesByCurrency>>;
  nftSummary?: Maybe<NftPortfolioSummary>;
  totalValue?: Maybe<TotalValuesByCurrency>;
  userId: Scalars['String']['output'];
};


export type BlockchainAccountsCurrencySummaryArgs = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type BlockchainAccountsHistoricalTotalValueArgs = {
  chainIds?: InputMaybe<PortfolioSummaryChainsInput>;
};


export type BlockchainAccountsNftSummaryArgs = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type BlockchainAccountsTotalValueArgs = {
  chainIds?: InputMaybe<PortfolioSummaryChainsInput>;
};

export type BlockchainAccountsV2Input = {
  fallbackToEthAccounts?: InputMaybe<Scalars['Boolean']['input']>;
  filterByTag?: InputMaybe<AccountTag>;
  installationId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type BlockchainAddress = {
  displayName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Chain = {
  __typename?: 'Chain';
  id: Scalars['Int']['output'];
  isTestNet?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  nativeTokenName?: Maybe<Scalars['String']['output']>;
};

export type ClaimCode = {
  __typename?: 'ClaimCode';
  claimableType?: Maybe<ClaimableType>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  maxClaims?: Maybe<Scalars['Int']['output']>;
  storeUsername?: Maybe<Scalars['String']['output']>;
};

export type ClaimCodeMerged = {
  __typename?: 'ClaimCodeMerged';
  claimCode: ClaimCode;
  claimCodeMetadata: ClaimCodeMergedMetadata;
  network: Scalars['String']['output'];
};

export type ClaimCodeMergedMetadata = {
  __typename?: 'ClaimCodeMergedMetadata';
  /** The source url for the image on this modal */
  animationUrl?: Maybe<Scalars['String']['output']>;
  /** Confirmation view description */
  confirmationDescription?: Maybe<Scalars['String']['output']>;
  /** Confirmation view title */
  confirmationTitle?: Maybe<Scalars['String']['output']>;
  /** The token's description / confirmation copy */
  description: Scalars['String']['output'];
  /** Drop Link URL */
  droplinkUrl?: Maybe<Scalars['String']['output']>;
  /** Time the link will expire */
  expireTime?: Maybe<Scalars['DateTime']['output']>;
  /** The source url for the image on this modal */
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** A link to additional contents / materials on the web */
  learnMore?: Maybe<Scalars['String']['output']>;
  /** Preclaim modal view description */
  modalDescription?: Maybe<Scalars['String']['output']>;
  /** Copy that is shown with share sheet materials */
  shareText?: Maybe<Scalars['String']['output']>;
  /** The token's name / title copy for this modal */
  title: Scalars['String']['output'];
};

export type ClaimCodeTokenMetadata = {
  __typename?: 'ClaimCodeTokenMetadata';
  animationUrl?: Maybe<Scalars['String']['output']>;
  attributes?: Maybe<Array<Scalars['JSONObject']['output']>>;
  backgroundColor?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  externalUrl?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<Scalars['JSONObject']['output']>;
  youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type ClaimCodeWithMetadata = {
  __typename?: 'ClaimCodeWithMetadata';
  claimCode: ClaimCode;
  network: Scalars['String']['output'];
  tokenMetadata: ClaimCodeTokenMetadata;
};

export type ClaimEthereumInput = {
  claimCodeId: Scalars['String']['input'];
  destination: EthereumBlockchainAccountIdentifier;
};

export type ClaimResponse = {
  __typename?: 'ClaimResponse';
  success: Scalars['Boolean']['output'];
};

export enum ClaimableType {
  DropLinkGroup = 'DROP_LINK_GROUP',
  Product = 'PRODUCT',
  Raffle = 'RAFFLE'
}

export type Collection = {
  __typename?: 'Collection';
  description?: Maybe<Scalars['String']['output']>;
  floorPrices?: Maybe<Array<Maybe<Price>>>;
  image?: Maybe<RemoteAsset>;
  name?: Maybe<Scalars['String']['output']>;
  standards?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CollectionStats = {
  __typename?: 'CollectionStats';
  floorSaleChange?: Maybe<PeriodicalStats>;
  topBid?: Maybe<Price>;
  topBidV2?: Maybe<MarketplaceCurrencyValue>;
  volume?: Maybe<PeriodicalStats>;
  volumeChange?: Maybe<PeriodicalStats>;
};

export type CollectionV2 = {
  __typename?: 'CollectionV2';
  /** @deprecated use `addressV2` */
  address: Address;
  addressV2: BlockchainAddress;
  chainId: Scalars['Int']['output'];
  coinType: Scalars['Int']['output'];
  /** @deprecated Use `address.raw` */
  contractAddress: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** @deprecated This data is still in testing. Use `groupedNFTBalances.floorPrices` in production. */
  floorPrice?: Maybe<Price>;
  /** @deprecated Use `priceChanges` instead. */
  floorPrice1DChange?: Maybe<Scalars['Float']['output']>;
  /** @deprecated Use `priceChanges` instead. */
  floorPrice1DChangeV2?: Maybe<Percentage>;
  floorPriceV2?: Maybe<MarketplaceCurrencyValue>;
  historicalFloorPrices?: Maybe<Array<HistoricalCurrencyValue>>;
  image?: Maybe<RemoteAsset>;
  name?: Maybe<Scalars['String']['output']>;
  priceChanges?: Maybe<PriceChanges>;
  standards?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export enum CombinedPortfolioInclude {
  Both = 'BOTH',
  NonSpam = 'NON_SPAM',
  Spam = 'SPAM'
}

export type CombinedPortfolioSummary = {
  __typename?: 'CombinedPortfolioSummary';
  currencies: CurrencyPortfolioSummary;
  historicalTotalValue?: Maybe<Array<HistoricalTotalValuesByCurrency>>;
  historicalTotalValues?: Maybe<HistoricalPortfolioValues>;
  nfts: NftPortfolioSummary;
  totalValue?: Maybe<TotalValuesByCurrency>;
  wallets: Array<PortfolioWalletBalance>;
};


export type CombinedPortfolioSummaryHistoricalTotalValueArgs = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type CombinedPortfolioSummaryHistoricalTotalValuesArgs = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum ContentfulEnvironmentId {
  Master = 'MASTER',
  Sandbox = 'SANDBOX'
}

export type ContractInput = {
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
};

export type ContractInteraction = Activity & {
  __typename?: 'ContractInteraction';
  chainId: Scalars['Int']['output'];
  contractAddress?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type ContractInteractionV2 = ActivityV2 & {
  __typename?: 'ContractInteractionV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  contractAddress?: Maybe<Scalars['String']['output']>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type ContractKeys = {
  __typename?: 'ContractKeys';
  chainId: Scalars['Int']['output'];
  coinType: Scalars['Int']['output'];
  contractAddress: Scalars['String']['output'];
};

export type ContractMetadata = {
  __typename?: 'ContractMetadata';
  /** @deprecated use `addressV2` */
  address: Address;
  addressV2: BlockchainAddress;
  balanceAmount?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  coinType: Scalars['Int']['output'];
  /** @deprecated Use `collectionV2` */
  collection?: Maybe<Collection>;
  collectionV2?: Maybe<CollectionV2>;
  /** @deprecated Use `address.raw` */
  contractAddress: Scalars['String']['output'];
  decimals?: Maybe<Scalars['Int']['output']>;
  /** @deprecated use `loadStatus` */
  didLoad?: Maybe<Scalars['Boolean']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  loadStatus?: Maybe<EntityLoadStatus>;
  /** @deprecated Use `displayName` */
  name?: Maybe<Scalars['String']['output']>;
  spamScore?: Maybe<Scalars['Int']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};


export type ContractMetadataBalanceAmountArgs = {
  walletAddress: Scalars['String']['input'];
};


export type ContractMetadataSpamScoreArgs = {
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type ContractTagInput = {
  accountId: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};

export type ContractTags = {
  __typename?: 'ContractTags';
  contract: ContractKeys;
  tags: Array<Scalars['String']['output']>;
};

export type CreateBlockchainAccountInput = {
  additionalSigners?: InputMaybe<Array<Scalars['String']['input']>>;
  address: Scalars['String']['input'];
  avatar?: InputMaybe<Scalars['String']['input']>;
  coinType?: InputMaybe<Scalars['Int']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  hardwareWalletDetails?: InputMaybe<HardwareWalletDetailsInput>;
  installationId?: InputMaybe<Scalars['String']['input']>;
  isSelfCustody?: InputMaybe<Scalars['Boolean']['input']>;
  kindV2?: InputMaybe<BlockchainAccountKindV2>;
  tag?: InputMaybe<AccountTag>;
  threshold?: InputMaybe<Scalars['Int']['input']>;
};

export type Currency = Token & {
  __typename?: 'Currency';
  /** @deprecated use `addressV2` */
  address: Address;
  addressV2: BlockchainAddress;
  balanceAmount?: Maybe<Amount>;
  chain?: Maybe<Chain>;
  chainId: Scalars['Int']['output'];
  coinType: Scalars['Int']['output'];
  /** @deprecated Use `collectionV2` */
  collection?: Maybe<Collection>;
  collectionV2?: Maybe<CollectionV2>;
  /** @deprecated Use `address.raw` */
  contractAddress: Scalars['String']['output'];
  decimals?: Maybe<Scalars['Int']['output']>;
  /** @deprecated use `loadStatus` */
  didLoad?: Maybe<Scalars['Boolean']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<RemoteAsset>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  loadStatus?: Maybe<EntityLoadStatus>;
  /** @deprecated Use `metadataV2` */
  metadata?: Maybe<TokenMetadata>;
  metadataV2?: Maybe<TokenMetadataV2>;
  /** @deprecated Use `displayName` */
  name?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use `priceChanges` instead. */
  price1DChange?: Maybe<Percentage>;
  priceChanges?: Maybe<PriceChanges>;
  prices?: Maybe<Array<Maybe<Price>>>;
  spamScore?: Maybe<Scalars['Int']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};


export type CurrencyBalanceAmountArgs = {
  walletAddress: Scalars['String']['input'];
};


export type CurrencySpamScoreArgs = {
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type CurrencyAmount = {
  __typename?: 'CurrencyAmount';
  amount: Amount;
  formatted?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};


export type CurrencyAmountFormattedArgs = {
  input?: InputMaybe<CurrencyAmountFormattedInput>;
};

export type CurrencyAmountFormattedInput = {
  cleanup?: InputMaybe<Scalars['Boolean']['input']>;
  includeUnit?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Locale>;
  truncateTo?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrencyBalance = {
  __typename?: 'CurrencyBalance';
  address: EvmAddress;
  /** @deprecated Use `amountV2` instead. */
  amount: Amount;
  amountV2: CurrencyAmount;
  currency: Currency;
  /** Contract address + amount, for svelte rendering */
  key: Scalars['String']['output'];
  totalValue?: Maybe<CurrencyValue>;
  value: Amount;
};

export type CurrencyBalanceConnection = {
  __typename?: 'CurrencyBalanceConnection';
  /** A list of edges. */
  edges: Array<CurrencyBalanceEdge>;
  /** A list of nodes. */
  nodes: Array<CurrencyBalance>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CurrencyBalanceEdge = {
  __typename?: 'CurrencyBalanceEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: CurrencyBalance;
};

export enum CurrencyBalancesInclude {
  Both = 'BOTH',
  NonSpam = 'NON_SPAM',
  Spam = 'SPAM'
}

export type CurrencyBalancesResult = {
  __typename?: 'CurrencyBalancesResult';
  connections: CurrencyBalanceConnection;
  totalBalanceUSD: Amount;
};

export type CurrencyFormattedAmountInput = {
  cleanup?: InputMaybe<Scalars['Boolean']['input']>;
  includeUnit?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Locale>;
  truncateTo?: InputMaybe<Scalars['Int']['input']>;
};

export type CurrencyPortfolioSummary = {
  __typename?: 'CurrencyPortfolioSummary';
  collections?: Maybe<Array<Maybe<CurrencyBalance>>>;
  /** @deprecated Use `historical_total_values.daily_30d` instead. */
  historicalTotalValue?: Maybe<Array<HistoricalTotalValuesByCurrency>>;
  historicalTotalValues?: Maybe<HistoricalPortfolioValues>;
  totalValue?: Maybe<TotalValuesByCurrency>;
  wallets: Array<CurrencyWalletBalances>;
};


export type CurrencyPortfolioSummaryHistoricalTotalValueArgs = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type CurrencyPortfolioSummaryHistoricalTotalValuesArgs = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CurrencyValue = {
  amount: Amount;
  asEth?: Maybe<EthValue>;
  asMatic?: Maybe<MaticValue>;
  asUsd?: Maybe<UsdValue>;
  formatted?: Maybe<Scalars['String']['output']>;
};


export type CurrencyValueFormattedArgs = {
  input?: InputMaybe<CurrencyFormattedAmountInput>;
};

export type CurrencyWalletBalances = {
  __typename?: 'CurrencyWalletBalances';
  address: Scalars['String']['output'];
  balances: Array<CurrencyBalance>;
  totalValue?: Maybe<TotalValuesByCurrency>;
};

export type DeleteBlockchainAccountPayload = {
  __typename?: 'DeleteBlockchainAccountPayload';
  id?: Maybe<Scalars['ID']['output']>;
};

export type EnsAddress = BlockchainAddress & {
  __typename?: 'ENSAddress';
  address?: Maybe<EvmAddress>;
  displayName?: Maybe<Scalars['String']['output']>;
  ens: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
};

export type EvmAddress = Address & BlockchainAddress & {
  __typename?: 'EVMAddress';
  displayName?: Maybe<Scalars['String']['output']>;
  ens?: Maybe<EnsAddress>;
  fullName?: Maybe<Scalars['String']['output']>;
  raw: Scalars['String']['output'];
  truncated?: Maybe<Scalars['String']['output']>;
};

export enum EntityLoadStatus {
  JoinFailed = 'JoinFailed',
  JoinNotAuthorized = 'JoinNotAuthorized',
  JoinSuceeded = 'JoinSuceeded',
  Local = 'Local',
  LocalLoadFailed = 'LocalLoadFailed',
  LocalLoadSuceeded = 'LocalLoadSuceeded'
}

export type EthValue = CurrencyValue & {
  __typename?: 'EthValue';
  amount: Amount;
  asEth?: Maybe<EthValue>;
  asMatic?: Maybe<MaticValue>;
  asUsd?: Maybe<UsdValue>;
  formatted?: Maybe<Scalars['String']['output']>;
};


export type EthValueFormattedArgs = {
  input?: InputMaybe<CurrencyFormattedAmountInput>;
};

export type EthereumBlockchainAccountIdentifier = {
  address: Scalars['String']['input'];
};

export enum EventType {
  Approval = 'APPROVAL',
  Burn = 'BURN',
  Mint = 'MINT',
  Transfer = 'TRANSFER'
}

export enum FiatCurrencies {
  Usd = 'USD'
}

export type FormattedAmountInput = {
  cleanup?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Locale>;
  truncateTo?: InputMaybe<Scalars['Int']['input']>;
};

export type FormattedPercentageInput = {
  cleanup?: InputMaybe<Scalars['Boolean']['input']>;
  includeUnit?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Locale>;
  truncateTo?: InputMaybe<Scalars['Int']['input']>;
};

export enum GateType {
  Beta = 'BETA'
}

export type GatedContent = {
  __typename?: 'GatedContent';
  kind: GatedContentKind;
  value: Scalars['String']['output'];
};

export enum GatedContentKind {
  BulletText = 'BULLET_TEXT',
  CustomFile = 'CUSTOM_FILE',
  FullResolutionAnimation = 'FULL_RESOLUTION_ANIMATION',
  FullResolutionImage = 'FULL_RESOLUTION_IMAGE',
  InstagramFilter = 'INSTAGRAM_FILTER',
  SnapLens = 'SNAP_LENS'
}

export type GatedContentV2 = {
  __typename?: 'GatedContentV2';
  authorized?: Maybe<Scalars['Boolean']['output']>;
  items?: Maybe<Array<GatedContent>>;
};

export type GetActivitiesConnections = {
  address: Scalars['String']['input'];
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetActivitiesInput = {
  address: Scalars['String']['input'];
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  includeTestNets?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  supportedChains?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GetActivitiesInputV2 = {
  address: Scalars['String']['input'];
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventTypes?: InputMaybe<Array<EventType>>;
  features?: InputMaybe<ActivityV2Features>;
  includeTestNets?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  supportedChains?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GetActivitiesInputV3 = {
  address: Scalars['String']['input'];
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type GetActivityInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  chainId: Scalars['Int']['input'];
  features?: InputMaybe<ActivityV2Features>;
  transactionHash: Scalars['String']['input'];
};

export type GetActivityStatisticsInput = {
  address: Scalars['String']['input'];
};

export type GetBalanceInput = {
  address: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  type: BalanceType;
};

export type GetBalancesInput = {
  address: Scalars['String']['input'];
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  contractAddresses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** @deprecated This is always true now */
  disableMetadataPrefetch?: InputMaybe<Scalars['Boolean']['input']>;
  includeTestNets?: InputMaybe<Scalars['Boolean']['input']>;
  supportedChains?: InputMaybe<Scalars['Boolean']['input']>;
  type: BalanceType;
};

export type GetBannerItemsInput = {
  environmentId: ContentfulEnvironmentId;
};

export type GetBlockchainAccountBalancesInput = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  includeTestNets?: InputMaybe<Scalars['Boolean']['input']>;
  supportedChains?: InputMaybe<Scalars['Boolean']['input']>;
  type: BalanceType;
};

export type GetChainActivitiesInput = {
  address: Scalars['String']['input'];
};

export type GetChainBalancesInput = {
  address: Scalars['String']['input'];
  type: BalanceType;
};

export type GetContractMetadataInput = {
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
};

export type GetCurrencyBalancesV2Input = {
  address: Scalars['String']['input'];
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  include?: InputMaybe<CurrencyBalancesInclude>;
};

export type GetFeatureFlagsInput = {
  userId: Scalars['String']['input'];
};

export type GetGatesInput = {
  addresses: Array<Scalars['String']['input']>;
};

export type GetMarketingCodesInput = {
  environmentId: ContentfulEnvironmentId;
};

export type GetNftBalancesGroupedInput = {
  address: Scalars['String']['input'];
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** @deprecated This is always true now */
  disableMetadataPrefetch?: InputMaybe<Scalars['Boolean']['input']>;
  groupBy?: InputMaybe<NftBalancesGroupedBy>;
  includeTestNets?: InputMaybe<Scalars['Boolean']['input']>;
  sortedBy?: InputMaybe<NftBalancesSortedBy>;
  supportedChains?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GetNftMetadataInput = {
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type GetNftBalancesInput = {
  address: Scalars['String']['input'];
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  include?: InputMaybe<NftBalancesInclude>;
};

export type GetNftBalancesSummaryInput = {
  address: Scalars['String']['input'];
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  include?: InputMaybe<NftBalancesInclude>;
  limit: Scalars['Int']['input'];
};

export type GetPendingAirdrops = {
  address: Scalars['String']['input'];
};

export type GetTokenAllowancesInput = {
  address: Scalars['String']['input'];
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  contractAddresses?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GetUnclaimedCodesInput = {
  ids: Array<Scalars['String']['input']>;
};

export type HardwareWalletDetails = {
  __typename?: 'HardwareWalletDetails';
  deviceId: Scalars['String']['output'];
  hdPath: Scalars['String']['output'];
  kind: HardwareWalletKind;
  productId: Scalars['String']['output'];
  productName: Scalars['String']['output'];
};

export type HardwareWalletDetailsInput = {
  deviceId: Scalars['String']['input'];
  hdPath: Scalars['String']['input'];
  kind: HardwareWalletKind;
  productId: Scalars['String']['input'];
  productName: Scalars['String']['input'];
};

export enum HardwareWalletKind {
  Ledger = 'LEDGER'
}

export type HistoricalCurrencyValue = {
  __typename?: 'HistoricalCurrencyValue';
  timestamp: Scalars['DateTime']['output'];
  value: CurrencyValue;
};

export type HistoricalPortfolioValues = {
  __typename?: 'HistoricalPortfolioValues';
  /** Portfolio data in 1 day increments for the last 30 days. */
  daily30D: Array<HistoricalTotalValuesByCurrency>;
  /** (TODO - add support) Portfolio data in 1 day increments for the last 90 days. */
  daily90D: Array<HistoricalTotalValuesByCurrency>;
  /** Portfolio data in 6 hour increments for the last 7 days. */
  hourly7D: Array<HistoricalTotalValuesByCurrency>;
  /** Portfolio data in 1 hour increments for the last 24 hours. */
  hourly24Hr: Array<HistoricalTotalValuesByCurrency>;
};

export type HistoricalTotalValuesByCurrency = {
  __typename?: 'HistoricalTotalValuesByCurrency';
  timestamp: Scalars['DateTime']['output'];
  value: TotalValuesByCurrency;
};

export type ListCollectionNftsInput = {
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
  ids: Array<Scalars['String']['input']>;
};

export enum Locale {
  EnUs = 'EN_US'
}

export type MarketplaceCurrencyValue = {
  __typename?: 'MarketplaceCurrencyValue';
  marketplace?: Maybe<Scalars['String']['output']>;
  value: CurrencyValue;
};

export type MaticValue = CurrencyValue & {
  __typename?: 'MaticValue';
  amount: Amount;
  asEth?: Maybe<EthValue>;
  asMatic?: Maybe<MaticValue>;
  asUsd?: Maybe<UsdValue>;
  formatted?: Maybe<Scalars['String']['output']>;
};


export type MaticValueFormattedArgs = {
  input?: InputMaybe<CurrencyFormattedAmountInput>;
};

export type ModifyAccountTagsInput = {
  addTags?: InputMaybe<Array<AccountTag>>;
  removeTags?: InputMaybe<Array<AccountTag>>;
};

export type ModifyNotificationsPayload = {
  __typename?: 'ModifyNotificationsPayload';
  types: Array<NotificationType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addContractTag?: Maybe<BlockchainAccountPayload>;
  addNFTTag?: Maybe<BlockchainAccountPayload>;
  changeBlockchainAccountDisplayDetails?: Maybe<BlockchainAccountPayload>;
  changeBlockchainAccountDisplayName?: Maybe<BlockchainAccountPayload>;
  changeOwnerToSafeAccount?: Maybe<BlockchainAccountPayload>;
  /** claims a given claim code */
  claim: ClaimResponse;
  convertWatchedWalletToSelfCustody?: Maybe<BlockchainAccountPayload>;
  createBlockchainAccount?: Maybe<BlockchainAccountPayload>;
  deleteBlockchainAccount?: Maybe<DeleteBlockchainAccountPayload>;
  disableNotifications?: Maybe<ModifyNotificationsPayload>;
  enableNotifications?: Maybe<ModifyNotificationsPayload>;
  installSelfCustody?: Maybe<BlockchainAccountPayload>;
  modifyAccountTags?: Maybe<BlockchainAccountPayload>;
  onboardBlockchainAccount?: Maybe<BlockchainAccountPayload>;
  removeContractTag?: Maybe<BlockchainAccountPayload>;
  removeNFTTag?: Maybe<BlockchainAccountPayload>;
  uninstallSelfCustody?: Maybe<BlockchainAccountPayload>;
};


export type MutationAddContractTagArgs = {
  input: ContractTagInput;
};


export type MutationAddNftTagArgs = {
  input: NftTagInput;
};


export type MutationChangeBlockchainAccountDisplayDetailsArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  installationId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationChangeBlockchainAccountDisplayNameArgs = {
  displayName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  installationId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationChangeOwnerToSafeAccountArgs = {
  address: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationClaimArgs = {
  input: ClaimEthereumInput;
};


export type MutationConvertWatchedWalletToSelfCustodyArgs = {
  id: Scalars['ID']['input'];
  installationId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateBlockchainAccountArgs = {
  input: CreateBlockchainAccountInput;
};


export type MutationDeleteBlockchainAccountArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisableNotificationsArgs = {
  id: Scalars['ID']['input'];
  types?: InputMaybe<Array<NotificationType>>;
};


export type MutationEnableNotificationsArgs = {
  id: Scalars['ID']['input'];
  types?: InputMaybe<Array<NotificationType>>;
};


export type MutationInstallSelfCustodyArgs = {
  id: Scalars['ID']['input'];
  installationId: Scalars['String']['input'];
};


export type MutationModifyAccountTagsArgs = {
  id: Scalars['ID']['input'];
  input: ModifyAccountTagsInput;
  installationId: Scalars['String']['input'];
};


export type MutationOnboardBlockchainAccountArgs = {
  avatar: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  installationId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveContractTagArgs = {
  input: ContractTagInput;
};


export type MutationRemoveNftTagArgs = {
  input: NftTagInput;
};


export type MutationUninstallSelfCustodyArgs = {
  id: Scalars['ID']['input'];
  installationId: Scalars['String']['input'];
};

export type Nft = Token & {
  __typename?: 'NFT';
  /** @deprecated use `addressV2` */
  address: Address;
  addressV2: BlockchainAddress;
  blurHash?: Maybe<Scalars['String']['output']>;
  chain?: Maybe<Chain>;
  chainId: Scalars['Int']['output'];
  coinType: Scalars['Int']['output'];
  /** @deprecated Use `collectionV2` */
  collection?: Maybe<Collection>;
  collectionStats?: Maybe<CollectionStats>;
  collectionV2?: Maybe<CollectionV2>;
  /** @deprecated Use `address.raw` */
  contractAddress: Scalars['String']['output'];
  decimals?: Maybe<Scalars['Int']['output']>;
  /** @deprecated use `loadStatus` */
  didLoad?: Maybe<Scalars['Boolean']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  gatedContent?: Maybe<Array<GatedContent>>;
  gatedContentV2?: Maybe<GatedContentV2>;
  id: Scalars['String']['output'];
  image?: Maybe<RemoteAsset>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  lastSale?: Maybe<Price>;
  lastSaleV2?: Maybe<MarketplaceCurrencyValue>;
  loadStatus?: Maybe<EntityLoadStatus>;
  /** @deprecated Use `metadataV2` */
  metadata?: Maybe<TokenMetadata>;
  metadataV2?: Maybe<TokenMetadataV2>;
  nftTopBid?: Maybe<MarketplaceCurrencyValue>;
  preloadedSpamScore?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use `balance.address` */
  requestingOwner?: Maybe<Scalars['String']['output']>;
  shareUrl?: Maybe<Scalars['String']['output']>;
  spamScore?: Maybe<Scalars['Int']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  tokenAllowances?: Maybe<TokenAllowancesResult>;
};


export type NftSpamScoreArgs = {
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
};


export type NftTokenAllowancesArgs = {
  walletAddress: Scalars['String']['input'];
};

export type NftBalance = {
  __typename?: 'NFTBalance';
  address: EvmAddress;
  amount: Amount;
  nft: Nft;
};

export type NftBalanceConnection = {
  __typename?: 'NFTBalanceConnection';
  /** A list of edges. */
  edges: Array<NftBalanceEdge>;
  /** A list of nodes. */
  nodes: Array<NftBalance>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type NftBalanceEdge = {
  __typename?: 'NFTBalanceEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: NftBalance;
};

export type NftBalanceGroup = {
  __typename?: 'NFTBalanceGroup';
  balances?: Maybe<Array<Maybe<Balance>>>;
  /** @deprecated This query is still in testing. Use `balances[0].collection` in production. */
  collection?: Maybe<CollectionV2>;
  floorPrices?: Maybe<Array<Maybe<Price>>>;
  image?: Maybe<RemoteAsset>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type NftBalanceV2 = {
  __typename?: 'NFTBalanceV2';
  address: EvmAddress;
  amount: Amount;
  nft: Nft;
};

export type NftBalanceV2Connection = {
  __typename?: 'NFTBalanceV2Connection';
  /** A list of edges. */
  edges: Array<NftBalanceV2Edge>;
  /** A list of nodes. */
  nodes: Array<NftBalanceV2>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type NftBalanceV2Edge = {
  __typename?: 'NFTBalanceV2Edge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<NftBalanceV2>;
};

export enum NftBalancesGroupedBy {
  ContractAddress = 'CONTRACT_ADDRESS'
}

export enum NftBalancesSortedBy {
  CollectionName = 'COLLECTION_NAME'
}

export type NftBalancesSummary = {
  __typename?: 'NFTBalancesSummary';
  amount?: Maybe<Scalars['Int']['output']>;
  chainId?: Maybe<Scalars['Int']['output']>;
  contract?: Maybe<ContractMetadata>;
  nftIds?: Maybe<Array<Scalars['String']['output']>>;
  /** @deprecated Use the `nftIds` instead and shallow load. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** @deprecated Use the `include` input on `nftBalanceSummary` to filter out spam contracts. */
  nonSpam?: Maybe<Array<Maybe<Nft>>>;
  totalValue?: Maybe<CurrencyValue>;
};


export type NftBalancesSummaryNonSpamArgs = {
  blockchainAccountId?: InputMaybe<Scalars['String']['input']>;
};

export type NftInput = {
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type NftPortfolioSummary = {
  __typename?: 'NFTPortfolioSummary';
  collections?: Maybe<Array<Maybe<NftBalancesSummary>>>;
  /** @deprecated Use `historical_total_values.daily_30d` instead. */
  historicalTotalValue?: Maybe<Array<HistoricalTotalValuesByCurrency>>;
  historicalTotalValues?: Maybe<HistoricalPortfolioValues>;
  totalValue?: Maybe<TotalValuesByCurrency>;
  wallets: Array<NftWalletBalances>;
};


export type NftPortfolioSummaryHistoricalTotalValueArgs = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type NftPortfolioSummaryHistoricalTotalValuesArgs = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NftTagInput = {
  accountId: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
  id: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};

export type NftWalletBalances = {
  __typename?: 'NFTWalletBalances';
  address: Scalars['String']['output'];
  balances: Array<NftBalancesSummary>;
  totalValue?: Maybe<TotalValuesByCurrency>;
};

export enum NftBalancesInclude {
  Both = 'BOTH',
  NonSpam = 'NON_SPAM',
  Spam = 'SPAM'
}

export enum NotificationType {
  ContractInteraction = 'CONTRACT_INTERACTION',
  DripFeed = 'DRIP_FEED',
  NftDelivery = 'NFT_DELIVERY',
  NftMint = 'NFT_MINT',
  NftPurchase = 'NFT_PURCHASE',
  NftSale = 'NFT_SALE',
  NftSent = 'NFT_SENT',
  OpenseaBidOffer = 'OPENSEA_BID_OFFER',
  TokenAirdrop = 'TOKEN_AIRDROP',
  TokenApproval = 'TOKEN_APPROVAL',
  TokenDelivery = 'TOKEN_DELIVERY',
  TokenSent = 'TOKEN_SENT',
  TokenSwap = 'TOKEN_SWAP'
}

/** Information about pagination in a connection */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  currency?: Maybe<Currency>;
  from?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use `currency` */
  token?: Maybe<Token>;
};

export type PaymentV2 = {
  __typename?: 'PaymentV2';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  currency?: Maybe<Currency>;
  from?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};

export type PendingActivitiesInput = {
  address: Scalars['String']['input'];
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type PendingActivity = {
  __typename?: 'PendingActivity';
  activity?: Maybe<PendingActivityJoin>;
  transactionId: Scalars['String']['output'];
};

export type PendingActivityInput = {
  transactionId: Scalars['String']['input'];
};

export type PendingActivityJoin = {
  __typename?: 'PendingActivityJoin';
  details?: Maybe<ActivityV2>;
  loadStatus?: Maybe<EntityLoadStatus>;
};

export type Percentage = {
  __typename?: 'Percentage';
  formatted?: Maybe<Scalars['String']['output']>;
  value: Scalars['Float']['output'];
};


export type PercentageFormattedArgs = {
  input?: InputMaybe<FormattedPercentageInput>;
};

export type PeriodicalStats = {
  __typename?: 'PeriodicalStats';
  allTime?: Maybe<Scalars['Float']['output']>;
  day1?: Maybe<Scalars['Float']['output']>;
  day7?: Maybe<Scalars['Float']['output']>;
  day30?: Maybe<Scalars['Float']['output']>;
};

export type Platform = {
  __typename?: 'Platform';
  name?: Maybe<Scalars['String']['output']>;
};

export type PortfolioCombinedInput = {
  addressesWithIds: Array<AddressWithId>;
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  include?: InputMaybe<CombinedPortfolioInclude>;
};

export type PortfolioCurrencyInput = {
  addressesWithIds: Array<AddressWithId>;
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  include?: InputMaybe<CurrencyBalancesInclude>;
};

export type PortfolioSummaryChainsInput = {
  currencies?: InputMaybe<Array<Scalars['Int']['input']>>;
  nfts?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type PortfolioWalletBalance = {
  __typename?: 'PortfolioWalletBalance';
  address: Scalars['String']['output'];
  currencies: Array<CurrencyBalance>;
  nfts: Array<NftBalancesSummary>;
  totalValue?: Maybe<TotalValuesByCurrency>;
};

export type PortfolionNftCollectionsInput = {
  addressesWithIds: Array<AddressWithId>;
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  include?: InputMaybe<NftBalancesInclude>;
};

export type Price = {
  __typename?: 'Price';
  currency: Scalars['String']['output'];
  marketplace?: Maybe<Scalars['String']['output']>;
  price: Scalars['String']['output'];
  priceUnit?: Maybe<Amount>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
};

export type PriceChanges = {
  __typename?: 'PriceChanges';
  percent1D?: Maybe<Percentage>;
  percent1H?: Maybe<Percentage>;
  percent7D?: Maybe<Percentage>;
  percent30D?: Maybe<Percentage>;
  percent90D?: Maybe<Percentage>;
};

export enum PurchaseType {
  AcceptOffer = 'ACCEPT_OFFER',
  BuyNow = 'BUY_NOW'
}

export type Query = {
  __typename?: 'Query';
  activities?: Maybe<Array<Maybe<Activity>>>;
  activitiesConnections: ActivityConnection;
  activitiesV2?: Maybe<Array<Maybe<ActivityV2>>>;
  /** @deprecated In dev, do not use. Prefer `activitiesV2` */
  activitiesV3?: Maybe<Array<Maybe<ActivityV3>>>;
  activity?: Maybe<ActivityV2>;
  activityStatistics?: Maybe<ActivityStatistics>;
  amount?: Maybe<Amount>;
  balance?: Maybe<Balance>;
  /** @deprecated Use either `nftBalances` or `currencyBalances` */
  balances?: Maybe<Array<Maybe<Balance>>>;
  /** A list of Banner items that always returns Product Banners */
  bannerItems?: Maybe<Array<BannerItem>>;
  blockchainAccount?: Maybe<BlockchainAccount>;
  blockchainAccounts?: Maybe<Array<Maybe<BlockchainAccount>>>;
  blockchainAccountsV2?: Maybe<BlockchainAccounts>;
  contractMetadata?: Maybe<ContractMetadata>;
  currencyBalances: CurrencyBalancesResult;
  ensAddress?: Maybe<EnsAddress>;
  evmAddress?: Maybe<EvmAddress>;
  featureFlags?: Maybe<Scalars['JSONObject']['output']>;
  getImageMimeType?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use `nftBalanceSummary` */
  groupedNFTBalances?: Maybe<Array<Maybe<NftBalanceGroup>>>;
  listCollectionNFTs: Array<Nft>;
  nftBalanceSummary?: Maybe<Array<Maybe<NftBalancesSummary>>>;
  nftBalances: NftBalanceConnection;
  nftBalancesV2: NftBalanceV2Connection;
  pendingActivities?: Maybe<Array<PendingActivity>>;
  pendingActivity?: Maybe<PendingActivity>;
  pendingAirdrops?: Maybe<Array<Maybe<ActivityV2>>>;
  portfolioCombined: CombinedPortfolioSummary;
  portfolioCurrencies: CurrencyPortfolioSummary;
  portfolioNftCollections?: Maybe<NftPortfolioSummary>;
  remoteAsset?: Maybe<RemoteAsset>;
  testBlockchainAccounts: BlockchainAccounts;
  testContractMetadata?: Maybe<ContractMetadata>;
  testCurrency?: Maybe<Currency>;
  testCurrencyAmount: CurrencyAmount;
  testEthValue: EthValue;
  testMaticValue: MaticValue;
  testNft?: Maybe<Nft>;
  testPendingActivity?: Maybe<PendingActivity>;
  testPercentage: Percentage;
  testTotalValuesByCurrency: TotalValuesByCurrency;
  testUsdValue: UsdValue;
  token?: Maybe<Token>;
  tokenAllowances?: Maybe<TokenAllowancesResult>;
  unclaimedCodes?: Maybe<Array<ClaimCodeWithMetadata>>;
  /** returns which active marketing campaign claim codes are not yet claimed */
  unclaimedMarketingCodes?: Maybe<Array<ClaimCodeMerged>>;
  walletGates?: Maybe<Array<Maybe<GateType>>>;
};


export type QueryActivitiesArgs = {
  input: GetActivitiesInput;
};


export type QueryActivitiesConnectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  input: GetActivitiesConnections;
};


export type QueryActivitiesV2Args = {
  input: GetActivitiesInputV2;
};


export type QueryActivitiesV3Args = {
  input: GetActivitiesInputV3;
};


export type QueryActivityArgs = {
  input: GetActivityInput;
};


export type QueryActivityStatisticsArgs = {
  input: GetActivityStatisticsInput;
};


export type QueryAmountArgs = {
  input: AmountInput;
};


export type QueryBalanceArgs = {
  input: GetBalanceInput;
};


export type QueryBalancesArgs = {
  input: GetBalancesInput;
};


export type QueryBannerItemsArgs = {
  input?: InputMaybe<GetBannerItemsInput>;
};


export type QueryBlockchainAccountArgs = {
  id: Scalars['String']['input'];
  installationId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBlockchainAccountsArgs = {
  fallbackToEthAccounts?: InputMaybe<Scalars['Boolean']['input']>;
  filterByTag?: InputMaybe<AccountTag>;
  installationId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBlockchainAccountsV2Args = {
  input: BlockchainAccountsV2Input;
};


export type QueryContractMetadataArgs = {
  input: GetContractMetadataInput;
};


export type QueryCurrencyBalancesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  input: GetCurrencyBalancesV2Input;
};


export type QueryEnsAddressArgs = {
  address: Scalars['String']['input'];
};


export type QueryEvmAddressArgs = {
  address: Scalars['String']['input'];
};


export type QueryFeatureFlagsArgs = {
  input: GetFeatureFlagsInput;
};


export type QueryGetImageMimeTypeArgs = {
  url: Scalars['String']['input'];
};


export type QueryGroupedNftBalancesArgs = {
  input: GetNftBalancesGroupedInput;
};


export type QueryListCollectionNfTsArgs = {
  input: ListCollectionNftsInput;
};


export type QueryNftBalanceSummaryArgs = {
  input: GetNftBalancesSummaryInput;
};


export type QueryNftBalancesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  input: GetNftBalancesInput;
};


export type QueryNftBalancesV2Args = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  input: GetNftBalancesInput;
};


export type QueryPendingActivitiesArgs = {
  input: PendingActivitiesInput;
};


export type QueryPendingActivityArgs = {
  input: PendingActivityInput;
};


export type QueryPendingAirdropsArgs = {
  input: GetPendingAirdrops;
};


export type QueryPortfolioCombinedArgs = {
  input: PortfolioCombinedInput;
};


export type QueryPortfolioCurrenciesArgs = {
  input: PortfolioCurrencyInput;
};


export type QueryPortfolioNftCollectionsArgs = {
  input: PortfolionNftCollectionsInput;
};


export type QueryRemoteAssetArgs = {
  url: Scalars['String']['input'];
};


export type QueryTestBlockchainAccountsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryTestContractMetadataArgs = {
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
};


export type QueryTestCurrencyArgs = {
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
};


export type QueryTestCurrencyAmountArgs = {
  amount: Scalars['Float']['input'];
  symbol: Scalars['String']['input'];
};


export type QueryTestEthValueArgs = {
  value: Scalars['Float']['input'];
};


export type QueryTestMaticValueArgs = {
  value: Scalars['Float']['input'];
};


export type QueryTestNftArgs = {
  chainId: Scalars['Int']['input'];
  coinType: Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type QueryTestPendingActivityArgs = {
  transactionId: Scalars['String']['input'];
};


export type QueryTestPercentageArgs = {
  value: Scalars['Float']['input'];
};


export type QueryTestTotalValuesByCurrencyArgs = {
  eth: Scalars['Float']['input'];
  matic: Scalars['Float']['input'];
  usd: Scalars['Float']['input'];
};


export type QueryTestUsdValueArgs = {
  value: Scalars['Float']['input'];
};


export type QueryTokenArgs = {
  input: GetNftMetadataInput;
};


export type QueryTokenAllowancesArgs = {
  input: GetTokenAllowancesInput;
};


export type QueryUnclaimedCodesArgs = {
  input: GetUnclaimedCodesInput;
};


export type QueryUnclaimedMarketingCodesArgs = {
  input?: InputMaybe<GetMarketingCodesInput>;
};


export type QueryWalletGatesArgs = {
  input: GetGatesInput;
};

export type RemoteAsset = {
  __typename?: 'RemoteAsset';
  /** @deprecated Do not use */
  mimeType?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use url instead */
  resizedImage?: Maybe<RemoteAsset>;
  /** @deprecated Do not use */
  responsiveImages?: Maybe<Array<Maybe<RemoteAsset>>>;
  /** @deprecated Do not use */
  type?: Maybe<RemoteAssetType>;
  url: Scalars['String']['output'];
};


export type RemoteAssetResizedImageArgs = {
  input: ResizedImageInput;
};


export type RemoteAssetResponsiveImagesArgs = {
  widths: Array<Scalars['Int']['input']>;
};

export enum RemoteAssetType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type ResizedImageInput = {
  anim?: InputMaybe<Scalars['Boolean']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  blur?: InputMaybe<Scalars['Int']['input']>;
  brightness?: InputMaybe<Scalars['Float']['input']>;
  contrast?: InputMaybe<Scalars['Float']['input']>;
  dpr?: InputMaybe<Scalars['Int']['input']>;
  fit?: InputMaybe<ResizedImageInputFit>;
  format?: InputMaybe<ResizedImageInputFormat>;
  gamma?: InputMaybe<Scalars['Float']['input']>;
  gravity?: InputMaybe<ResizedImageInputGravity>;
  height?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<ResizedImageInputMetadata>;
  quality?: InputMaybe<Scalars['Int']['input']>;
  rotate?: InputMaybe<Scalars['Int']['input']>;
  sharpen?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export enum ResizedImageInputFit {
  Contain = 'CONTAIN',
  Cover = 'COVER',
  Crop = 'CROP',
  Pad = 'PAD',
  ScaleDown = 'SCALE_DOWN'
}

export enum ResizedImageInputFormat {
  Auto = 'AUTO',
  Avif = 'AVIF',
  Webp = 'WEBP'
}

export type ResizedImageInputGravity = {
  auto?: InputMaybe<Scalars['Boolean']['input']>;
  side?: InputMaybe<ResizedImageInputGravitySide>;
  x?: InputMaybe<Scalars['Float']['input']>;
  y?: InputMaybe<Scalars['Float']['input']>;
};

export enum ResizedImageInputGravitySide {
  Bottom = 'BOTTOM',
  Left = 'LEFT',
  Right = 'RIGHT',
  Top = 'TOP'
}

export enum ResizedImageInputMetadata {
  Copyright = 'COPYRIGHT',
  Keep = 'KEEP',
  None = 'NONE'
}

export type Token = {
  /** @deprecated use `addressV2` */
  address: Address;
  addressV2: BlockchainAddress;
  chain?: Maybe<Chain>;
  chainId: Scalars['Int']['output'];
  coinType: Scalars['Int']['output'];
  collection?: Maybe<Collection>;
  collectionV2?: Maybe<CollectionV2>;
  /** @deprecated Use `address.raw` */
  contractAddress: Scalars['String']['output'];
  decimals?: Maybe<Scalars['Int']['output']>;
  /** @deprecated use `loadStatus` */
  didLoad?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  loadStatus?: Maybe<EntityLoadStatus>;
  metadata?: Maybe<TokenMetadata>;
  metadataV2?: Maybe<TokenMetadataV2>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type TokenAirdropV2 = ActivityV2 & TokenTransferV2 & {
  __typename?: 'TokenAirdropV2';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  fromAddress?: Maybe<EvmAddress>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  token?: Maybe<TokenV2>;
  transaction: Transaction;
};

export type TokenAllowance = {
  __typename?: 'TokenAllowance';
  allowance?: Maybe<Amount>;
  isApprovalForAll?: Maybe<Scalars['Boolean']['output']>;
  kind?: Maybe<TokenAllowanceKind>;
  spender?: Maybe<ContractMetadata>;
};

export type TokenAllowanceKind = ContractMetadata | Currency;

export type TokenAllowancesResult = {
  __typename?: 'TokenAllowancesResult';
  allowances?: Maybe<Array<Maybe<TokenAllowance>>>;
};

export type TokenApproval = {
  contract?: Maybe<ContractMetadata>;
  owner?: Maybe<Scalars['String']['output']>;
  spender?: Maybe<ContractMetadata>;
};

export type TokenApprovalAll = Activity & TokenApproval & {
  __typename?: 'TokenApprovalAll';
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  owner?: Maybe<Scalars['String']['output']>;
  spender?: Maybe<ContractMetadata>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenApprovalAllV2 = ActivityV2 & TokenApprovalV2 & {
  __typename?: 'TokenApprovalAllV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  spender?: Maybe<ContractMetadata>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type TokenApprovalV2 = {
  contract?: Maybe<ContractMetadata>;
  owner?: Maybe<Scalars['String']['output']>;
  spender?: Maybe<ContractMetadata>;
};

export type TokenApproved = Activity & TokenApproval & {
  __typename?: 'TokenApproved';
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  owner?: Maybe<Scalars['String']['output']>;
  rawAllowance?: Maybe<Scalars['String']['output']>;
  spender?: Maybe<ContractMetadata>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenApprovedV2 = ActivityV2 & TokenApprovalV2 & {
  __typename?: 'TokenApprovedV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  rawAllowance?: Maybe<Scalars['String']['output']>;
  spender?: Maybe<ContractMetadata>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type TokenBurn = Activity & TokenTransfer & {
  __typename?: 'TokenBurn';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Token>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenBurnV2 = ActivityV2 & TokenTransferV2 & {
  __typename?: 'TokenBurnV2';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  token?: Maybe<TokenV2>;
  transaction: Transaction;
};

export type TokenKeys = {
  __typename?: 'TokenKeys';
  chainId: Scalars['Int']['output'];
  coinType: Scalars['Int']['output'];
  contractAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type TokenMetadata = {
  __typename?: 'TokenMetadata';
  animation?: Maybe<RemoteAsset>;
  /** @deprecated Use `animation`. */
  animationUrl?: Maybe<RemoteAsset>;
  attributes?: Maybe<Array<Scalars['JSONObject']['output']>>;
  description?: Maybe<Scalars['String']['output']>;
  externalUrl?: Maybe<Scalars['String']['output']>;
  image?: Maybe<RemoteAsset>;
  marketplaceUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<Scalars['JSONObject']['output']>;
};

export type TokenMetadataV2 = {
  __typename?: 'TokenMetadataV2';
  /** @deprecated use `addressV2` */
  address: Address;
  addressV2: BlockchainAddress;
  animation?: Maybe<RemoteAsset>;
  attributes?: Maybe<Array<Scalars['JSONObject']['output']>>;
  chainId: Scalars['Int']['output'];
  coinType: Scalars['Int']['output'];
  /** @deprecated Use `address.raw` */
  contractAddress: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** @deprecated use `loadStatus` */
  didLoad?: Maybe<Scalars['Boolean']['output']>;
  externalUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<RemoteAsset>;
  loadStatus?: Maybe<EntityLoadStatus>;
  marketplaceUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<Scalars['JSONObject']['output']>;
};

export type TokenMint = Activity & TokenTransfer & {
  __typename?: 'TokenMint';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  cost?: Maybe<Scalars['String']['output']>;
  costUnit?: Maybe<Amount>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  token?: Maybe<Token>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenMintV2 = ActivityV2 & TokenTransferV2 & {
  __typename?: 'TokenMintV2';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  cost?: Maybe<Scalars['String']['output']>;
  costUnit?: Maybe<Amount>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  token?: Maybe<TokenV2>;
  transaction: Transaction;
};

export type TokenPurchased = Activity & TokenSale & {
  __typename?: 'TokenPurchased';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  nft?: Maybe<Nft>;
  payment?: Maybe<Payment>;
  platform?: Maybe<Platform>;
  purchaseType?: Maybe<PurchaseType>;
  seller?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  /** @deprecated Use `nft` */
  token?: Maybe<Token>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenPurchasedV2 = ActivityV2 & TokenSaleV2 & {
  __typename?: 'TokenPurchasedV2';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  nft?: Maybe<Nft>;
  payment?: Maybe<PaymentV2>;
  platform?: Maybe<ContractMetadata>;
  purchaseType?: Maybe<PurchaseType>;
  seller?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type TokenReceived = Activity & TokenTransfer & {
  __typename?: 'TokenReceived';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  from?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  token?: Maybe<Token>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenReceivedV2 = ActivityV2 & TokenTransferV2 & {
  __typename?: 'TokenReceivedV2';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  fromAddress?: Maybe<EvmAddress>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  token?: Maybe<TokenV2>;
  transaction: Transaction;
};

export type TokenRejectAll = Activity & TokenApproval & {
  __typename?: 'TokenRejectAll';
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  owner?: Maybe<Scalars['String']['output']>;
  spender?: Maybe<ContractMetadata>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenRejectAllV2 = ActivityV2 & TokenApprovalV2 & {
  __typename?: 'TokenRejectAllV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  spender?: Maybe<ContractMetadata>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type TokenRevokeApprovalV2 = ActivityV2 & TokenApprovalV2 & {
  __typename?: 'TokenRevokeApprovalV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  spender?: Maybe<ContractMetadata>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type TokenSale = {
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  nft?: Maybe<Nft>;
  payment?: Maybe<Payment>;
  platform?: Maybe<Platform>;
  purchaseType?: Maybe<PurchaseType>;
  /** @deprecated Use `nft` */
  token?: Maybe<Token>;
};

export type TokenSaleAbsoluteV2 = ActivityV2 & TokenSaleV2 & {
  __typename?: 'TokenSaleAbsoluteV2';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  buyer?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  nft?: Maybe<Nft>;
  payment?: Maybe<PaymentV2>;
  platform?: Maybe<ContractMetadata>;
  purchaseType?: Maybe<PurchaseType>;
  seller?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type TokenSaleV2 = {
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  nft?: Maybe<Nft>;
  payment?: Maybe<PaymentV2>;
  platform?: Maybe<ContractMetadata>;
  purchaseType?: Maybe<PurchaseType>;
};

export type TokenSent = Activity & TokenTransfer & {
  __typename?: 'TokenSent';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Token>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenSentV2 = ActivityV2 & TokenTransferV2 & {
  __typename?: 'TokenSentV2';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  toAddress?: Maybe<EvmAddress>;
  token?: Maybe<TokenV2>;
  transaction: Transaction;
};

export type TokenSold = Activity & TokenSale & {
  __typename?: 'TokenSold';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  buyer?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  nft?: Maybe<Nft>;
  payment?: Maybe<Payment>;
  platform?: Maybe<Platform>;
  purchaseType?: Maybe<PurchaseType>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  /** @deprecated Use `nft` */
  token?: Maybe<Token>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenSoldV2 = ActivityV2 & TokenSaleV2 & {
  __typename?: 'TokenSoldV2';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  buyer?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  nft?: Maybe<Nft>;
  payment?: Maybe<PaymentV2>;
  platform?: Maybe<ContractMetadata>;
  purchaseType?: Maybe<PurchaseType>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  transaction: Transaction;
};

export type TokenSwap = Activity & {
  __typename?: 'TokenSwap';
  chainId: Scalars['Int']['output'];
  platform?: Maybe<Platform>;
  received?: Maybe<TokenSwapDetails>;
  sent?: Maybe<TokenSwapDetails>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  trader?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type TokenSwapDetails = {
  __typename?: 'TokenSwapDetails';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  currency?: Maybe<Currency>;
  /** @deprecated Use `currency` */
  token?: Maybe<Token>;
};

export type TokenSwapDetailsV2 = {
  __typename?: 'TokenSwapDetailsV2';
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  token?: Maybe<TokenV2>;
};

export type TokenSwapV2 = ActivityV2 & {
  __typename?: 'TokenSwapV2';
  address?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  platform?: Maybe<ContractMetadata>;
  received?: Maybe<TokenSwapDetailsV2>;
  sent?: Maybe<TokenSwapDetailsV2>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  trader?: Maybe<Scalars['String']['output']>;
  transaction: Transaction;
};

export type TokenTags = {
  __typename?: 'TokenTags';
  tags: Array<Scalars['String']['output']>;
  token: TokenKeys;
};

export type TokenTransfer = {
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  token?: Maybe<Token>;
};

export type TokenTransferAbsoluteV2 = ActivityV2 & TokenTransferV2 & {
  __typename?: 'TokenTransferAbsoluteV2';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  chainId: Scalars['Int']['output'];
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  /** A unique string key for caching and de-duping */
  key: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  token?: Maybe<TokenV2>;
  transaction: Transaction;
};

export type TokenTransferV2 = {
  amount?: Maybe<Scalars['String']['output']>;
  amountUnit?: Maybe<Amount>;
  contract?: Maybe<ContractMetadata>;
  contractAddress?: Maybe<Scalars['String']['output']>;
  token?: Maybe<TokenV2>;
};

export type TokenV2 = Currency | Nft;

export type TotalCurrencyValueInput = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  supportedChains?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TotalCurrencyValueV2Input = {
  chainIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  currency: FiatCurrencies;
  supportedChains?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TotalValuesByCurrency = {
  __typename?: 'TotalValuesByCurrency';
  eth: EthValue;
  matic: MaticValue;
  sumAsEth?: Maybe<EthValue>;
  sumAsUsd?: Maybe<UsdValue>;
  usd: UsdValue;
};

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber?: Maybe<Scalars['Int']['output']>;
  detailsUrl?: Maybe<Scalars['String']['output']>;
  effectiveGasPrice?: Maybe<Amount>;
  gasUsed?: Maybe<Amount>;
  hash?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type UsdValue = CurrencyValue & {
  __typename?: 'UsdValue';
  amount: Amount;
  asEth?: Maybe<EthValue>;
  asMatic?: Maybe<MaticValue>;
  asUsd?: Maybe<UsdValue>;
  formatted?: Maybe<Scalars['String']['output']>;
};


export type UsdValueFormattedArgs = {
  input?: InputMaybe<CurrencyFormattedAmountInput>;
};

export enum Join__Graph {
  Activity = 'ACTIVITY',
  Activityv2 = 'ACTIVITYV2',
  BlockchainAccounts = 'BLOCKCHAIN_ACCOUNTS',
  ClaimsSubgraph = 'CLAIMS_SUBGRAPH',
  FeatureFlags = 'FEATURE_FLAGS',
  PendingActivitySubgraph = 'PENDING_ACTIVITY_SUBGRAPH',
  SimplehashSubgraph = 'SIMPLEHASH_SUBGRAPH',
  TokenApi = 'TOKEN_API'
}

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type TotalBalanceUsdQueryVariables = Exact<{
  input: GetCurrencyBalancesV2Input;
}>;


export type TotalBalanceUsdQuery = { __typename?: 'Query', currencyBalances: { __typename?: 'CurrencyBalancesResult', totalBalanceUSD: { __typename?: 'Amount', formatted?: string | null }, connections: { __typename?: 'CurrencyBalanceConnection', nodes: Array<{ __typename?: 'CurrencyBalance', address: { __typename?: 'EVMAddress', raw: string, truncated?: string | null }, amountV2: { __typename?: 'CurrencyAmount', formatted?: string | null, amount: { __typename?: 'Amount', decimals?: number | null, formatted?: string | null, value: string } }, value: { __typename?: 'Amount', decimals?: number | null, formatted?: string | null, value: string }, currency: { __typename?: 'Currency', displayName?: string | null, symbol?: string | null, decimals?: number | null, image?: { __typename?: 'RemoteAsset', url: string } | null } }> } } };


export const TotalBalanceUsdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TotalBalanceUSD"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCurrencyBalancesV2Input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currencyBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBalanceUSD"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"connections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raw"}},{"kind":"Field","name":{"kind":"Name","value":"truncated"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amountV2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"formatted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TotalBalanceUsdQuery, TotalBalanceUsdQueryVariables>;
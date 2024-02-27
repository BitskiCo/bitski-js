/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'query TotalBalanceUSD($input: GetCurrencyBalancesV2Input!) {\n  currencyBalances(input: $input) {\n    totalBalanceUSD {\n      formatted\n    }\n    connections {\n      nodes {\n        address {\n          raw\n          truncated\n        }\n        amountV2 {\n          amount {\n            decimals\n            formatted\n            value\n          }\n          formatted\n        }\n        value {\n          decimals\n          formatted\n          value\n        }\n        currency {\n          displayName\n          image {\n            url\n          }\n          symbol\n          decimals\n        }\n      }\n    }\n  }\n}':
    types.TotalBalanceUsdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query TotalBalanceUSD($input: GetCurrencyBalancesV2Input!) {\n  currencyBalances(input: $input) {\n    totalBalanceUSD {\n      formatted\n    }\n    connections {\n      nodes {\n        address {\n          raw\n          truncated\n        }\n        amountV2 {\n          amount {\n            decimals\n            formatted\n            value\n          }\n          formatted\n        }\n        value {\n          decimals\n          formatted\n          value\n        }\n        currency {\n          displayName\n          image {\n            url\n          }\n          symbol\n          decimals\n        }\n      }\n    }\n  }\n}',
): (typeof documents)['query TotalBalanceUSD($input: GetCurrencyBalancesV2Input!) {\n  currencyBalances(input: $input) {\n    totalBalanceUSD {\n      formatted\n    }\n    connections {\n      nodes {\n        address {\n          raw\n          truncated\n        }\n        amountV2 {\n          amount {\n            decimals\n            formatted\n            value\n          }\n          formatted\n        }\n        value {\n          decimals\n          formatted\n          value\n        }\n        currency {\n          displayName\n          image {\n            url\n          }\n          symbol\n          decimals\n        }\n      }\n    }\n  }\n}'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://api.bitski.com/graphql',
  useGETForQueries: true,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export async function queryTotalBalanceUSD(address: string, chainId: number) {
  const result = await client.query({
    variables: {
      input: {
        address: address,
        include: 'NON_SPAM',
        chainIds: [chainId],
      },
    },
    query: gql`
      query TotalBalanceUSD($input: GetCurrencyBalancesV2Input!) {
        currencyBalances(input: $input) {
          totalBalanceUSD {
            formatted
          }
          connections {
            nodes {
              amountV2 {
                formatted
              }
              value {
                formatted
              }
              currency {
                displayName
                image {
                  url
                }
              }
            }
          }
        }
      }
    `,
  });
  return result;
}

export async function queryActivity(address: string, chainId: number) {
  return await client.query({
    variables: {
      input: {
        address: address,
        chainIds: [chainId],
      },
    },
    query: gql`
      query ActivitiesV2($input: GetActivitiesInputV2!) {
        activitiesV2(input: $input) {
          __typename
          timestamp
          transaction {
            hash
          }
          ... on TokenMintV2 {
            costUnit {
              formatted
            }
            amountUnit {
              formatted
            }
            ... on TokenMintV2 {
              token {
                ... on NFT {
                  displayName
                  image {
                    url
                  }
                }
              }
            }
          }
          ... on TokenReceivedV2 {
            from
            token {
              ... on NFT {
                displayName
                image {
                  url
                }
              }
              ... on Currency {
                displayName
                image {
                  url
                }
              }
            }
          }
          ... on TokenSentV2 {
            to
            token {
              ... on Currency {
                displayName
                image {
                  url
                }
              }
              ... on NFT {
                displayName
                image {
                  url
                }
              }
            }
          }
        }
      }
    `,
  });
}

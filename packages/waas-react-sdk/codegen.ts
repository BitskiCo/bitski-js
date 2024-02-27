import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'schema.graphql',
  documents: 'src/lib/**/*.graphql',
  config: {
    asyncQuery: true,
    useIndexSignature: true,
    useTypeImports: true,
    scalars: {
      DateTime: 'Date',
    },
  },
  generates: {
    './src/lib/generated/gql/': {
      preset: 'client',
      config: {
        fetcher: 'graphql-request',
      },
    },
    './src/lib/generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  hooks: {
    afterOneFileWrite: ['npm exec prettier -- --write'],
  },
};

export default config;

# start step
1. add file [config.ts] in __' utils/ '__
```ts
export const QUERY_PORT = 0000;
export const CHAIN_PORT = 0001;
export const MARKET_PORT = 0002;

export const MONGO_PORT = 27017;
export const REDIS_PORT = 6379;

// allowed price source;
export type TFrom = 'market' | 'chain';
// allowed token types
export type TTokens = 'SETM'| 'SERP'| 'DNAR';
export const ALLOW_TOKENS: TTokens[] = ['SETM', 'SERP', 'DNAR'];
// token to token_id map
export const TOKENS_MAP: {[k in TTokens]: number} = {
  SETM: 5034,
  SERP: 10042,
  DNAR: 3222
}
// cmc request url
export const CMC_API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";

export const QUERY_INTERVAL = 1000 * 60 * 10

```

2. add file [pm2.config.js] in __' / '__
```js
module.exports = {
  apps: [{
    name: 'price-query',
    script: './dist/query/index.js',
    env: {
      DD_SITE: "datadoghq.com",
      DD_API_KEY: "DD_API_KEY",
      DD_APP_KEY: "DD_APP_KEY",
      CMC_API_KEY: "CMC_API_KEY"
   }
  },{
    name: 'price-market',
    script: './dist/market/index.js',
    env: {
      ...
    }
  },{
    name: 'price-chain',
    script: './dist/chain/index.js',
    env: {
      ...
    }
  }]
};
```

3. add file [nodemon.json] in __' / '__
```json
{
  "env": {
    "DD_SITE": "datadoghq.com",
    "DD_API_KEY": "DD_API_KEY",
    "DD_APP_KEY": "DD_APP_KEY",
    "CMC_API_KEY": "CMC_API_KEY"
  }
}
```

4. docker-compose up -d 

5. success!
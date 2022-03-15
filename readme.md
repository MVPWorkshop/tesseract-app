# tesr.finance 

## Local development setup

- Clone the [repository](git@github.com:MVPWorkshop/tesseract-app.git) in to your local environment
  ```
  git clone git@github.com:<username>/tesseract-app.git
  ```
- Create a `.env` file in the root directory
  ```
  cp .env.example .env
  ```

  These are the variables we use for local development

  ```
  REACT_APP_API_BASE_URL=https://prom.tesr.finance/api/v1
  REACT_APP_SUPPORTED_CHAIN_IDS=[137,43114]
  REACT_APP_DEFAULT_CHAIN_ID=137
  REACT_APP_METAMASK_DOWNLOAD_LINK=https://metamask.io/download.html

  REACT_APP_EXPLORER_POLYGON_MAINNET=https://polygonscan.com
  REACT_APP_EXPLORER_AVAX_MAINNET=https://snowtrace.io/

  REACT_APP_RPC_PROVIDER_POLYGON=https://polygon-rpc.com/
  REACT_APP_RPC_PROVIDER_AVAX=https://api.avax.network/ext/bc/C/rpc

  REACT_APP_REGISTRY_ADDRESS_POLYGON_MAINNET=0xD6Ee035903CBF773Edf275982A81A64839aa9305
  REACT_APP_REGISTRY_ADDRESS_AVAX_MAINNET=0x9090fA73Bc1317c71BeCb9BDB631afEec8Bc741a

  REACT_APP_PROVIDER_POLLING_INTERVAL=12000
  REACT_APP_CONFIRMATIONS_SUCCESS=3

  REACT_APP_BANNER_ENABLED=false
  REACT_APP_BANNER_TEXT="Example banner text"
  ```

- Install dependencies
    ```
    yarn
    ```
- Compile languages
    ```
    npm run lang:compile
    ```

- Start app
    ```
    npm start
    ```

## Translations

We use [LinguiJS](https://lingui.js.org/) for internationalization

```jsx
{/* Localized messages are simply wrapped in <Trans> */}
<Trans id="msg.header">Internationalization in React</Trans>
```

i18n outside of react

```js
i18n._(t`Internationalization in React`)
```

# tesr.finance 

## Local development setup

- Clone the [repository](git@github.com:MVPWorkshop/tesseract-app.git) in to your local environment
  ```
  git clone git@github.com:MVPWorkshop/tesseract-app.git
  ```
- Create a `.env` file in the root directory. The env.example file already has the defaults config to run the app locally
  ```
  cp .env.example .env
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

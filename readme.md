# tesr.finance 

## Initial setup

- Fork the original [repository](https://test.com) in to your github account
- Clone the forked repo in to your local 
  ```
  git clone git@github.com:<username>/tesseract-app.git
  ```
- Create a `.env` file in the root directory
  ```
  cp .env.example .env
  ```

## Development
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
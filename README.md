# Fullerton Healthcare Booking Admin

## Requirement

- Recommended editor: [VS Code](https://code.visualstudio.com/)
- Recommended extensions: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Recommended CLI: [yarn](https://yarnpkg.com/)

## Commands

- `yarn`: Install dependencies
- `yarn start`: Start development server, use `.env.development`
- `yarn build`: Build production version, use `.env.production`
- `yarn build:staging`: Build staging version, use `.env.staging`
- `yarn format`: Format code

## Structure

```
project
│  .eslintrc               --> ESlint config
│  tsconfig.json           --> Typescript config
│  package.json            --> Project config
|  .env.*                  --> Environment variables (Important)
│  ...
│
├── build                  --> Webpack output
│
├── config                 --> Webpack config
│
├── public
│  │  index.html           --> main HTML for web
│  │  favicon.*            --> favicon for web
│  │  ...
│  │
│  └── locales             --> translation files
│
├── scripts                --> scripts are used when npm run start/build/test
│
├── src
│  │  index.tsx            --> root file
│  │  ...
│  │
│  ├── @types              --> define interfaces
│  │
│  ├── apis                --> utility functions
│  │  │
│  │  ├── graphql          --> hooks, to query graphql api
│  │  │
│  │  └── rest             --> hooks, to query rest api
│  │
│  ├── assets              --> contains all the assets like: images, svg,...
│  │
│  ├── components
│  │  │
│  │  ├── pages            --> separate components for every screen
│  │  │
│  │  ├── common           --> common components
│  │  │  │
│  │  │  ├── [Component]
│  │  │  │  │  actions.ts  --> redux actions only use for this component
│  │  │  │  │  config.ts   --> config, constants only use for this component
│  │  │  │  │  index.tsx   --> main UI
│  │  │  │  │  reducers.ts --> redux reducers only use for this component
│  │  │  │  │  sagas.ts    --> redux saga only use for this component
│  │  │  │  │  styles.module.scss       --> styling
│  │  │  │  │  styles.module.scss.d.ts  --> type declaration for styles (auto-generated)
│  │  │  │  │  ...
│  │  │  │
│  │  │  └── ...
│  │
│  ├── config              --> config functions and variables
│  │
│  ├── constants           --> define enums and constants
│  │
│  ├── hooks               --> utility hooks
│  │
│  ├── redux
│  │  │
│  │  │  store.ts          --> redux's store root
│  │  │
│  │  ├── actions          --> common actions
│  │  │
│  │  ├── reducers         --> common reducers
│  │  │
│  │  └── sagas            --> common sagas
│  │
│  ├── router              --> router root
│  │
│  ├── screens             --> website screens
│  │
│  ├── styles              --> common style, define css and scss's variables
│  │
│  ├── utils               --> utility functions
│  │
│  └── ...
│
```

## Code Formatting

- Using [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to format code, along with `Typescript`
- `Typescript`: Do not use type `any` in any case, only use in utility functions

## Styling

- [Colors](https://ant.design/docs/spec/colors)
- Style file:
  - [CSS module](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet) + [sass](https://create-react-app.dev/docs/adding-a-sass-stylesheet) ([\*.module.scss](src/pages/Content/Post/styles.module.scss) files)
  - [Auto-generated style's types](@teamsupercell/typings-for-css-modules-loader) ([\*.module.scss.d.ts](src/pages/Content/Post/styles.module.scss.d.ts) files)

## Routing

- Using [react-router v6](https://reactrouter.com/docs/en/v6/getting-started/overview)
- Use this [config file](src/config/menu.tsx) to config `router` with `component`, `sidebar` and `breadcrumb` is auto-generated follow this config

## Translation

- Using [react-i18n](https://react.i18next.com/) to config translation, translate key is defined [here](src/constants/locales.ts)
- [Example here](src/components/common/Container/index.tsx)

## Redux

- Using basic [redux](https://redux.js.org/) structure: `action` - `reducer` - `store`
- Using [redux-toolkit](https://redux-toolkit.js.org/) to create redux's [actions](https://redux-toolkit.js.org/api/createAction) and [reducers](https://redux-toolkit.js.org/api/createReducer)
- Using [redux-persist](https://github.com/rt2zz/redux-persist) to store `redux's state `to `Local Storage`
- Using [redux-saga](https://redux-saga.js.org/)'s `effect` to handle async API call, like: `login`, `logout`,...

![Schemes](https://camo.githubusercontent.com/88993e43ee04ad203740ab1e04c952ec69fcec594e323202c107a2a1579bc454/68747470733a2f2f696d6167652e6962622e636f2f685043316a4a2f536368656d615f4e6772782e706e67)

## API Call

### GraphQL

- Using [@apollo/client](https://www.apollographql.com/docs/react/) to do [query](https://www.apollographql.com/docs/react/data/queries/) and [mutation](https://www.apollographql.com/docs/react/data/mutations/)
- [Example here](src/apis/graphql/category/province.ts)

### REST

- Using [react-query](https://react-query.tanstack.com/) to do [query](https://react-query.tanstack.com/guides/queries) (`GET`) and [mutation](https://react-query.tanstack.com/guides/mutations) (`POST`, `PUT`, `DELETE`). [Query's example](src/apis/rest/posts/useCreatePost.ts) and [Mutation's example](src/apis/rest/posts/useGetPosts.ts)
- Using [redux-saga](https://redux-saga.js.org/) (not frequently) to call API and save response to redux's store. [Example here](src/redux/sagas/auth.ts)

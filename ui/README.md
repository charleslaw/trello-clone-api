# react-redux-saga-boilerplate

[![Dependencies Status](https://david-dm.org/manishaggarwalm/react-redux-saga-boilerplate.svg)](https://www.npmjs.com/package/react-redux-saga-boilerplate)
[![Version Status](https://badge.fury.io/js/react-redux-saga-boilerplate.svg)](https://www.npmjs.com/package/react-redux-saga-boilerplate)
[![Download Status](https://img.shields.io/npm/dt/react-redux-saga-boilerplate.svg)](https://www.npmjs.com/package/react-redux-saga-boilerplate)

This boilerplate contain a ready to go **react application** with **redux** and **Saga** as middleware.

## How to Run

1. Download the package on local

```
git clone https://github.com/manishaggarwalm/react-redux-saga-boilerplate.git
```

2. Run following command to install dependencies

```
npm install
```

3. Execute to run application in dev mode

```
npm run dev
```

The dev server will run on `http://localhost:3000`

## Redux

Redux is a predictable state container for JavaScript apps. (Not to be confused with a WordPress framework – Redux Framework.)
Redux has 4 major components:

1. Action Types
2. Actions
3. Reducers
4. Middleware like thunk, saga(where we handle api calls and other complex logics)

### What are Action Types and How to define Action Types?

Action Types are tiny part of application but are major building block of Redux Application.

```
const CREATE_ITEM = "CREATE_ITEM";
```

or you can use it like an object structure

```
export const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
};
```

It should be **unique** throughout the application.

### What are Actions and How to define Actions?

Actions are something that orchestras the whole flow of application, with the help of actions we can modify the data in the store or perform some operations like API calls, remove data from store.

we can simply define action as:

```
const createItem = (task) => ({
  type: Types.CREATE_ITEM,
  payload: task,
});
```

It should be object with two keys, one `type` and other `payload`, you can use any name here for the keys but to make it consistent we use type and payload (The use of `type` and `payload` will come in `reducers`)

or, Alternatively you can use `redux-actions`

```
npm install redux-actions
```

```
import { createActions } from 'redux-actions';

const CREATE_ITEM = "CREATE_ITEM";
const createItem = createActions(CREATE_ITEM)

```

## Dependencies

1. "react": "^16.13.1"
2. "react-dom": "^16.13.1"
3. "react-redux": "^7.2.1"
4. "redux": "^4.0.5"
5. "redux-saga": "^1.1.3"
6. "source-map-loader": "^1.0.2"

## DevDependencies

1. "@babel/core": "^7.11.4",
2. "@babel/plugin-proposal-class-properties": "^7.10.4",
3. "@babel/plugin-transform-runtime": "^7.11.0",
4. "@babel/preset-env": "^7.11.0",
5. "@babel/preset-react": "^7.10.4",
6. "babel-loader": "^8.1.0",
7. "css-loader": "^4.2.2",
8. "html-webpack-plugin": "^4.3.0",
9. "path": "^0.12.7",
10. "style-loader": "^1.2.1",
11. "webpack": "^4.44.1",
12. "webpack-cli": "^3.3.12",
13. "webpack-dev-server": "^3.11.0"

import { createStore, applyMiddleware, Store, AnyAction, Action } from "redux";

import { persistStore, persistReducer } from "redux-persist";

import logger from "redux-logger";
import rootReducer, { RootState } from "./reducers";
import storage from "../libs/persistor-storage/index";
import thunk, { ThunkDispatch } from "redux-thunk";
const persistConfig = {
  key: "zdoctor-root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: Array<any> = [];
middlewares.push(thunk);

if (__DEV__) {
  middlewares.push(logger);
}
export const store: Store<RootState, AnyAction> = createStore(persistedReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export type AppDispatch = ThunkDispatch<RootState, any, Action>;

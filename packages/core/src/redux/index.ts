import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import logger from "redux-logger";
import rootReducer from "./reducers";
import storage from "../libs/persistor-storage/index";
const persistConfig = {
  key: "zdoctor-root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: Array<any> = [];

if (__DEV__) {
  middlewares.push(logger);
}
export const store: any = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

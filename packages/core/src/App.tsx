import React from "react";
import Navigation from "./navigation";
import { store, persistor } from "./redux";
import { Provider } from "react-redux";
import { AlertProvider } from "./components/Alert";
import { PersistGate } from "redux-persist/integration/react";
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <Navigation />
        </AlertProvider>
      </PersistGate>
    </Provider>
  );
}

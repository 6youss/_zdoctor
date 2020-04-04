import React from "react";
import Navigation from "./navigation";
import { store } from "./redux";
import { Provider } from "react-redux";
import { AlertProvider } from "./components/Alert";

export default function App() {
  return (
    <Provider store={store}>
      <AlertProvider>
        <Navigation />
      </AlertProvider>
    </Provider>
  );
}

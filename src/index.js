import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./app/store";


let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <MoralisProvider initializeOnMount={true}
          serverUrl="https://it200adba9tf.usemoralis.com:2053/server" appId="BHvBuek1TZiN1uEiKhVUzXKuIv5wzl5AKGQB83dt"
          masterKey="6TgnpRRUOqle4Z4csNyaj2cSaw8u8TPMQ7JuB2TR"
          >
          <App />
        </MoralisProvider>

      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

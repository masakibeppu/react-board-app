import type { AppProps } from "next/app";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import postsReducer from "../features/Posts";
import {Account} from "./Account";
import Status from "./Status"

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Account>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Account>
  );
}

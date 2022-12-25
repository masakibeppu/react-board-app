import type { AppProps } from "next/app";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import postsReducer from "../features/Posts";
import { Account } from "../component/Account";
import Header from "../component/Header";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // return (
  //   <Account>
  //     <Header />
  //     <Provider store={store}>
  //       <Component {...pageProps} />
  //     </Provider>
  //   </Account>
  // );
  switch (pageProps.layout) {
    case 'main': {
      return (
        <Account>
          <Header />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Account>
      )    
    } default: {
      return (
        <Account>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Account>
      )   
    }
  }
}

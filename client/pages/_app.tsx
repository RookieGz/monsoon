import { createContext, useEffect, useRef } from "react";
import { AppContext, AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Store, { initStore } from "store";

export const StoreContext = createContext<Partial<Store>>({});

function App({ Component, pageProps, store }: AppProps & { store: Store }) {
  const defaultStore = useRef(initStore(store));

  return (
    <>
      <ThemeProvider theme={{}}>
        <StoreContext.Provider value={defaultStore.current}>
          <Component {...pageProps} />
        </StoreContext.Provider>
      </ThemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const { Component, ctx } = appContext;

  const store = initStore();
  ctx.store = store;
  const defaultHandle: any[] = [];

  if (Component.getInitialProps) {
    defaultHandle.unshift(Component.getInitialProps(ctx));
  }

  const [appProps] = await Promise.all(defaultHandle);

  return { pageProps: appProps, store };
};

export default App;

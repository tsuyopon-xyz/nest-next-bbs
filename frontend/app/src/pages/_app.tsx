import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'src/components/shared/Layout';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

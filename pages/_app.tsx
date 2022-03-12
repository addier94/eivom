import '../assets/main.css';
import type {AppProps} from 'next/app';
import {FC, useEffect} from 'react';
import {ManagedUIContext} from '@components/ui/context';
import {AuthProvider} from '@components/auth/context';
import {SessionProvider} from 'next-auth/react';

const Noop: FC = ({children}) => <>{children}</>;

export default function MyApp({Component, pageProps}: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <SessionProvider>
        <ManagedUIContext>
          <AuthProvider>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ManagedUIContext>
      </SessionProvider>
    </>
  );
}

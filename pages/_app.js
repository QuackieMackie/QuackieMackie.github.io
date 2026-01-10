import Head from 'next/head';
import { UIProvider } from '../context/UIContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <UIProvider>
            <Head>
                <title>QuackieMackie | Portfolio</title>
            </Head>
            <Component {...pageProps} />
        </UIProvider>
    );
}

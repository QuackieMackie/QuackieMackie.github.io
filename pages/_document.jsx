import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Font Awesome for placeholder icons */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <meta name="description" content="Portfolio layout skeleton" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

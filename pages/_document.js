import { Head, Html, NextScript, Main } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head/>
            <body>
            <div id='overlay'/>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
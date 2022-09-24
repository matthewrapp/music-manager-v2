import { 
    Html, // required
    Head, // required
    Main, // required
    NextScript // required
} from "next/document";

/* DOCUMENTATION
*
*   - This file is not required. This file is intended to override the default document.
*   - This file is rendered on the server... do NOT add app logic here
*   - The <Head /> tag in the document file (this file) is not the same as next/head.
*   - The <Head /> tag here should only be used for any <head></head> code that is common for all pages
*/

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* <link rel="icon" href="%PUBLIC_URL%/shine-favicon.png" />
                <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}

                {/* <!-- Google Fonts --> */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto&Poppins&display=swap"
                    rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
};
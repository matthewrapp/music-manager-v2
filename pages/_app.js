import Head from "next/head";
import { StoreProvider, useStore } from "../client/context";
import WithAuth from "../hocs/with-auth";
import Layout from "../components/layout";
import "../styles/_global.scss";

const MyApp = ({ Component, pageProps }) => {
    // use the layout defined at the page level, if available...
    // const getLayout = Component.getLayout || ((page) => page);
    // const routeProtected = Component.permissions?.protected || false;
    const { showNavbar, showSidebar, navbarProps } = Component.layoutSettings ? Component.layoutSettings : { showNavbar: true, showSidebar: false, navbarProps: { type: 1, title: null } };

    return (
        <>
            <Head>
                <title>Music Manager v2</title>
            </Head>
            <StoreProvider>
                <Layout 
                    showNavbar={showNavbar} 
                    showSidebar={showSidebar}
                    navbarProps={navbarProps}
                >
                    <Component {...pageProps} />
                </Layout>
                {/* {getLayout(<Component {...pageProps} />)} */}
                {/* {routeProtected ? (
                    <WithAuth>
                        {getLayout(<Component {...pageProps} />)}
                    </WithAuth>
                ) :
                    getLayout(<Component {...pageProps} />)
                } */}
            </StoreProvider>
        </>
    )
};

export default MyApp;
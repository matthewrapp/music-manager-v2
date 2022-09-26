import styles from '../styles/components/Layout.module.scss';
import Navbar from './navbar';
import Sidebar from './sidebar';
// import { authedRoutes, publicRoutes } from '../utilities/route-data';

const Layout = ({ children, showNavbar, showSidebar, navbarProps }) => {

    return (
        <div className={styles.layout}>
            {showNavbar && <Navbar navbarProps={navbarProps} />}
            <main style={{ gridTemplateColumns: showSidebar ? '260px minmax(auto, 1100px)' :  'auto' }}>
                {showSidebar && <Sidebar />}
                <div className={styles['content-container']}>
                    {children}
                </div>
            </main>
        </div>
    )
};

export default Layout;
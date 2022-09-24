import styles from '../styles/components/Layout.module.scss';
import Navbar from './navbar';
import Sidebar from './sidebar';
// import { authedRoutes, publicRoutes } from '../utilities/route-data';

const Layout = ({ children, showNavbar, showSidebar }) => {

    return (
        <div className={styles.layout}>
            {showNavbar && <Navbar />}
            <main style={{ gridTemplateColumns: showSidebar ? ' repeat(2, max-content)' :  'auto' }}>
                {showSidebar && <Sidebar />}
                <div className={styles['content-container']}>
                    {children}
                </div>
            </main>
        </div>
    )
};

export default Layout;
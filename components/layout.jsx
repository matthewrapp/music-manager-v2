import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from '../client/context';
// import styles from '../styles/components/Layout.module.scss';
import Navbar from './navbar';

const Layout = ({ children, showNavbar, navbarProps }) => {
    const [state, _] = useStore();
    const router = useRouter();
    const { permissionId } = state.user;

    // useEffect(() => {
    //     if (!permissionId && state.user.authed) {
    //         router.push('/initiate-account');
    //     };
    // }, [state.user]);

    return (
        <div>
            {showNavbar && <Navbar navbarProps={navbarProps} />}
            <main className='w-full'>
                {children}
            </main>
        </div>
    )
};

export default Layout;
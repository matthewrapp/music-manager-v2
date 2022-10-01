import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import styles from '../styles/components/Navbar.module.scss';
import Link from 'next/link';
import { FaChevronRight, FaSignOutAlt, FaSortAmountUp, FaUser, FaWrench } from "react-icons/fa";
import Avatar from './avatar';

import imgOne from '../public/images/img-one.jpg';
import { useStore } from '../client/context';
import { authConstants } from '../client/context/constants';
import { useRouter } from 'next/router';
import FloatingMenu from './floating-menu';
import NavLink from './nav-link';
import MobileMenuBtn from './mobile-menu-btn';

const navLinks = [
    { name: "Dashboard", href: '/dashboard' },
    { name: "Pricing", href: '/pricing' }
];

const profileLinks = [
    { name: "Profile", href: '/profile', icon: <FaUser /> },
    { name: "Account", href: '/account', icon: <FaWrench /> },
]

const Navbar = ({ navbarProps: { type, title } }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [state, dispatch] = useStore();
    const router = useRouter();
    const { authed, firstName, lastName, tier } = state.user;

    const handleLogout = () => {
        // destroy token out of cookies, reset user state, redirect to login page
        Cookies.remove('mm_token');
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
        router.push('/login');
    };

    return (
        <div className={styles['navbar']}>

            <div className={styles['nav-brand']}>
                <Link href={'/'} passHref>
                    <a href={'/'}>LOGO</a>
                </Link>
            </div>

            <div className={`${styles.desktop} ${styles.navigation} ${styles[`nav-type-${type}`]}`}>

                {/* TYPE: 1 | Default Users Links */}
                {type === 1 &&
                    <div className={`${styles['nav-links']} ${styles.links}`}>
                        {navLinks?.map((link, i) => (
                            <NavLink
                                key={i}
                                text={link.name}
                                href={link.href}
                                active={("/" + router.pathname.split('/')[1] === link.href || router.asPath === link.href)}
                                activeColor={'blue'}
                                width={'auto'}
                            />)
                        )}
                    </div>
                }

                {/* TYPE: 2 | Creating/Editing Links */}
                {type === 2 &&
                    <div className={styles['page-title-container']}>
                        <FaChevronRight />
                        <div className={styles.title}>{title && title}</div>
                    </div>
                }

                <div className={`${styles['profile-links']} ${styles.links}`}>
                    {authed ? (
                        <>
                            <div className={styles['details-container']}>
                                <div className={styles['inner-container']}>
                                    <div>
                                        <span className={styles.label}>Name</span>
                                        <span className={styles.value}>{firstName + ' ' + lastName}</span>
                                    </div>
                                    <div>
                                        <span className={styles.label}>Tier</span>
                                        <span className={styles.value} style={{ textTransform: 'uppercase' }}>{tier}</span>
                                    </div>
                                </div>
                                <Avatar
                                    handleClick={() => setShowProfileMenu(!showProfileMenu)}
                                    rounded={true}
                                    bgColor={'transparent'}
                                    color={'black'}
                                    text={'MR'}
                                    src={imgOne}
                                />
                            </div>
                            <FloatingMenu
                                className={styles['profile-menu']}
                                showMenu={showProfileMenu}
                                setShowMenu={(bool) => setShowProfileMenu(bool)}
                            >
                                <NavLink icon={<FaSortAmountUp />} text={'Upgrade'} growOnHover={true} href={'/account/subscription'} backgroundColor={'orange'} />
                                {profileLinks.map((link, i) => <NavLink key={i} icon={link.icon} text={link.name} growOnHover={false} href={link.href} />)}
                                <NavLink icon={<FaSignOutAlt />} text={'Logout'} growOnHover={false} handleClick={handleLogout} />
                            </FloatingMenu>
                        </>
                    ) : (
                        <>
                            <NavLink text={'Login'} href={'/login'} />
                            <NavLink text={'Signup'} href={'/signup'} />
                        </>
                    )}
                </div>

            </div>

            <MobileMenuBtn
                className={styles['mobile-menu-icon']}
                handleClick={() => setShowMobileMenu(!showMobileMenu)}
                show={showMobileMenu}
            />

            {/* MOBILE MENU HERE... if needed */}
        </div>
    )
};

export default Navbar;
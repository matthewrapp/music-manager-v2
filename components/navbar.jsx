import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import styles from '../styles/components/Navbar.module.scss';
import Link from 'next/link';
import { FaSignOutAlt, FaSortAmountUp, FaUser, FaWrench } from "react-icons/fa";
import Avatar from './avatar';

import imgOne from '../public/images/img-one.jpg';
import { useStore } from '../client/context';
import { authConstants } from '../client/context/constants';
import { useRouter } from 'next/router';

const navLinks = [
    { name: "Dashboard", href: '/dashboard' },
    { name: "Pricing", href: '/pricing' }
];

const profileLinks = [
    { name: "Profile", href: '/profile', icon: <FaUser /> },
    { name: "Account", href: '/account', icon: <FaWrench /> },
]

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [state, dispatch] = useStore();
    const router = useRouter();
    const { authed, firstName, lastName, tier } = state.user;
    const profileLinksContainerRef = useRef();


    // useEffect to detect a click outside of the profile links container
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileLinksContainerRef.current && 
                !profileLinksContainerRef.current.contains(event.target)) {
                    setShowProfileMenu(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        // Unbind the event listener on clean up
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [profileLinksContainerRef])

    const handleLogout = () => {
        // destroy token out of cookies, reset user state, redirect to login page
        Cookies.remove('auth_token');
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

            <div className={`${styles.desktop} ${styles.navigation}`}>
                <div className={`${styles['nav-links']} ${styles.links}`}>
                    {navLinks?.map((link, i) => (
                        <li 
                            key={i} 
                            className={`
                                ${styles.link} 
                                ${ ("/" + router.pathname.split('/')[1] === link.href || router.asPath === link.href) ? styles.active : ''}
                            `}
                        >
                            <Link href={link.href} passHref>
                                <a href={link.href}>{link.name}</a>
                            </Link>
                        </li>
                    ))}
                </div>
                <div className={`${styles['profile-links']} ${styles.links}`} ref={profileLinksContainerRef}>
                    {authed ? (
                        <>
                            <li 
                                className={styles.link}
                                // onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >   
                                <div className={styles['details-container']}>
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
                            </li>
                            <div 
                                className={`${styles['profile-menu']} ${showProfileMenu ? styles.active : ''}`}
                                style={{ 
                                    opacity: showProfileMenu ? '1' : '0',
                                    visibility: showProfileMenu ? 'visible' : 'hidden'
                                }}
                            >
                                <li className={`${styles.link} ${styles.btn}`}>
                                    <Link href={'/account/subscription'} passHref>
                                        <a href='/account/subscription'>
                                            <FaSortAmountUp />
                                            <span>Upgrade</span>
                                        </a>
                                    </Link>
                                </li>
                                {profileLinks.map((link, i) => (
                                    <li className={styles.link} key={i}>
                                        <Link href={link.href} passHref>
                                            <a href={link.href}>
                                                {link.icon}
                                                <span>{link.name}</span>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                                <li className={styles.link} onClick={handleLogout}>
                                    <div>
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </div>
                                </li>
                            </div>
                        </>
                    ) : (
                        <>
                            <li className={styles.link}>
                                <Link href={'/login'} passHref>
                                    <a href='/login'>Login</a>
                                </Link>
                            </li>
                            <li className={styles.link}>
                                <Link href={'/signup'} passHref>
                                    <a href='/signup'>Signup</a>
                                </Link>
                            </li>
                        </>
                    )}
                </div>
            </div>

            <div
                className={`${styles['mobile-menu-icon']} ${showMobileMenu ? styles.active : ''}`}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                <span className={`${styles.line} ${styles['line-1']}`}></span>
                <span className={`${styles.line} ${styles['line-2']}`}></span>
                <span className={`${styles.line} ${styles['line-3']}`}></span>
            </div>

            <div className={`${styles.mobile} ${styles.navigation}`}>

                <div className={styles['mobile-nav-container']} style={{ height: showMobileMenu ? '101%' : '0' }}>
                    <div className={styles.overlay}>
                        <div className={styles['nav-links']}>
                            {navLinks?.map((link, i) => (
                                <li key={i} className={styles.link}>
                                    <Link href={link.href} passHref>
                                        <a href={link.href}>{link.name}</a>
                                    </Link>
                                </li>
                            ))}
                        </div>
                        <div className={styles['profile-links']}>
                            {/* IF UN-AUTHED */}
                            <li className={styles.link}>
                                <Link href={'/login'} passHref>
                                    <a href='/login'>Login</a>
                                </Link>
                            </li>
                            <li className={styles.link}>
                                <Link href={'/signup'} passHref>
                                    <a href='/signup'>Login</a>
                                </Link>
                            </li>
                            {/* IF AUTHED */}
                            <li className={styles.link}>
                                <Link href={'/logout'} passHref>
                                    <a href='/logout'>
                                        <Avatar
                                            rounded={true}
                                            bgColor={'pink'}
                                            color={'black'}
                                            text={'MR'}
                                        />
                                    </a>
                                </Link>
                                <Link href={'/logout'} passHref>
                                    <a href='/logout'>Logout</a>
                                </Link>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;
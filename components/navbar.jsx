import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
// import styles from '../styles/components/Navbar.module.scss';
import Link from 'next/link';
import { FaChevronRight, FaSignOutAlt, FaSortAmountUp, FaUser, FaWrench } from "react-icons/fa";
import Avatar from './avatar';

import imgOne from '../public/images/img-one.jpg';
import { useStore } from '../client/context';
import { authConstants } from '../client/context/constants';
import { useRouter } from 'next/router';
import FloatingMenu from './floating-menu';
// import NavLink from './nav-link';
import MobileMenuBtn from './mobile-menu-btn';
import NavLink from './nav-link';

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
        <div className={'bg-neutral-900 shadow-sm'}>
            <div className='w-full mx-auto px-10'>
                <div className="flex md:justify-between">

                    <div className="flex flex-1 md:flex-0 space-x-3">
                        {/* LOGO */}
                        <div>
                            <Link href={'/'} passHref>
                                <a href={'/'} className='flex items-center py-4 px-2'>
                                    <img src="" alt="" className="h-8 w-8 mr-2" />
                                    {/* <span className='font-semibold text-zinc-400 text-lg'>Navigation</span> */}
                                </a>
                            </Link>
                        </div>

                        {/* Primary Navbar items */}
                        {type === 1 &&
                            <div className='hidden md:flex items-center space-x-1 flex-1'>
                                {navLinks?.map((link, i) => (
                                    <NavLink
                                        key={i}
                                        text={link.name}
                                        href={link.href}
                                        active={("/" + router.pathname.split('/')[1] === link.href || router.asPath === link.href)}
                                        activeColor={'sky'}
                                    />
                                ))}
                            </div>
                        }

                        {/* TYPE: 2 | Creating/Editing Links */}
                        {type === 2 &&
                            <div className='hidden md:flex items-center space-x-1 flex-1'>
                                <FaChevronRight className='text-zinc-400 mr-4 text-sm' />
                                <div className='text-zinc-400 uppercase tracking-widest text-sm'>{title && title}</div>
                            </div>
                        }

                    </div>

                    {/* Secondary navbar items / profile links*/}
                    {authed ?
                        <>
                            <div className='flex md:space-x-3 mr-2 md:mr-0 items-center justify-self-end'>
                                <div className='hidden md:flex flex-col'>
                                    <div className=''>
                                        <span className='uppercase text-zinc-500 mr-1 tracking-widest' style={{ fontSize: '10px' }}>Name</span>
                                        <span className='text-zinc-300 text-xs tracking-widest'>{firstName + ' ' + lastName}</span>
                                    </div>
                                    <div className=''>
                                        <span className='uppercase text-zinc-500 mr-1 tracking-widest' style={{ fontSize: '10px' }}>Tier</span>
                                        <span className='text-zinc-300 text-xs tracking-widest'>{tier}</span>
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
                                // className={styles['profile-menu']}
                                showMenu={showProfileMenu}
                                setShowMenu={(bool) => setShowProfileMenu(bool)}
                            >
                                <NavLink
                                    text={'Upgrade'}
                                    href={'/account/subscription'}
                                    icon={<FaSortAmountUp />}
                                    className={'bg-orange-700'}
                                />
                                {profileLinks.map((link, i) => (
                                    <NavLink
                                        key={i}
                                        text={link.name}
                                        href={link.href}
                                        icon={link.icon}
                                    />
                                ))}
                                <NavLink
                                    text={'Logout'}
                                    icon={<FaSignOutAlt />}
                                    handleClick={handleLogout}
                                />
                            </FloatingMenu>
                        </>
                        :
                        <>
                            <div className='hidden md:flex items-center space-x-3 justify-self-end'>
                                <NavLink
                                    text={'Login'}
                                    href={'/login'}
                                    resetStyles={true}
                                    className={'py-3 px-4 uppercase text-zinc-300 hover:brightness-125 transition duration-300 text-sm tracking-widest'}
                                />
                                <NavLink
                                    text={'Signup'}
                                    href={'/signup'}
                                    resetStyles={true}
                                    className={'py-3 px-4 uppercase text-zinc-300 bg-sky-500 hover:brightness-125 transition duration-300 text-sm tracking-widest'}
                                />
                            </div>
                        </>
                    }

                    {/* Mobile menu btn */}
                    <div className='md:hidden flex items-center' onClick={() => setShowMobileMenu(!showMobileMenu)}>
                        <div className='btn mobile-menu-button hover:cursor-pointer'>
                            <svg
                                class="w-6 h-6 text-gray-500"
                                x-show="!showMenu"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile menu */}
            <div className={`mobile-menu ${showMobileMenu ? '' : 'hidden'}`}>
                {navLinks?.map((link, i) => (
                    <Link href={link.href} passHref key={i}>
                        <a
                            href={link.href}
                            className='block py-4 px-2 text-zinc-300 font-normal uppercase text-sm tracking-widest'
                        >
                            <span>{link.name}</span>
                        </a>
                    </Link>
                ))}
            </div>
        </div >
    )
    // return (
    //     <div className={styles['navbar']}>

    //         <div className={styles['nav-brand']}>
    //             <Link href={'/'} passHref>
    //                 <a href={'/'}>LOGO</a>
    //             </Link>
    //         </div>

    //         <div className={`${styles.desktop} ${styles.navigation} ${styles[`nav-type-${type}`]}`}>

    //             {/* TYPE: 1 | Default Users Links */}
    //             {type === 1 &&
    //                 <div className={`${styles['nav-links']} ${styles.links}`}>
    //                     {navLinks?.map((link, i) => (
    //                         <NavLink
    //                             key={i}
    //                             text={link.name}
    //                             href={link.href}
    //                             active={("/" + router.pathname.split('/')[1] === link.href || router.asPath === link.href)}
    //                             activeColor={'blue'}
    //                             width={'auto'}
    //                         />)
    //                     )}
    //                 </div>
    //             }

    //             {/* TYPE: 2 | Creating/Editing Links */}
    //             {type === 2 &&
    //                 <div className={styles['page-title-container']}>
    //                     <FaChevronRight />
    //                     <div className={styles.title}>{title && title}</div>
    //                 </div>
    //             }

    //             <div className={`${styles['profile-links']} ${styles.links}`}>
    //                 {authed ? (
    //                     <>
    //                         <div className={styles['details-container']}>
    //                             <div className={styles['inner-container']}>
    //                                 <div>
    //                                     <span className={styles.label}>Name</span>
    //                                     <span className={styles.value}>{firstName + ' ' + lastName}</span>
    //                                 </div>
    //                                 <div>
    //                                     <span className={styles.label}>Tier</span>
    //                                     <span className={styles.value} style={{ textTransform: 'uppercase' }}>{tier}</span>
    //                                 </div>
    //                             </div>
    //                             <Avatar
    //                                 handleClick={() => setShowProfileMenu(!showProfileMenu)}
    //                                 rounded={true}
    //                                 bgColor={'transparent'}
    //                                 color={'black'}
    //                                 text={'MR'}
    //                                 src={imgOne}
    //                             />
    //                         </div>
    //                         <FloatingMenu
    //                             className={styles['profile-menu']}
    //                             showMenu={showProfileMenu}
    //                             setShowMenu={(bool) => setShowProfileMenu(bool)}
    //                         >
    //                             <NavLink icon={<FaSortAmountUp />} text={'Upgrade'} growOnHover={true} href={'/account/subscription'} backgroundColor={'orange'} />
    //                             {profileLinks.map((link, i) => <NavLink key={i} icon={link.icon} text={link.name} growOnHover={false} href={link.href} />)}
    //                             <NavLink icon={<FaSignOutAlt />} text={'Logout'} growOnHover={false} handleClick={handleLogout} />
    //                         </FloatingMenu>
    //                     </>
    //                 ) : (
    //                     <>
    //                         <NavLink text={'Login'} href={'/login'} />
    //                         <NavLink text={'Signup'} href={'/signup'} />
    //                     </>
    //                 )}
    //             </div>

    //         </div>

    //         <MobileMenuBtn
    //             className={styles['mobile-menu-icon']}
    //             handleClick={() => setShowMobileMenu(!showMobileMenu)}
    //             show={showMobileMenu}
    //         />

    //         {/* MOBILE MENU HERE... if needed */}
    //     </div>
    // )
};

export default Navbar;
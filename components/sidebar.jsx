
import Link from 'next/link';
import styles from '../styles/components/Sidebar.module.scss';
import { FaLink, FaMagnet } from "react-icons/fa";
import { useRouter } from 'next/router';
import { useStore } from '../client/context';

const navLinks = [
    { name: 'Smart Links', href: '/smart-links', icon: <FaLink />, tierLevels: ['free', 'basic', 'pro'] },
    { name: 'Fan Magnets', href: '/fan-magnets', icon: <FaMagnet />, tierLevels: ['pro'] }
];

const Sidebar = () => {
    const router = useRouter();
    const [state, _] = useStore();
    const { tier } = state.user;
    const routeToCompare = "/" + router.pathname.split('/')[2];
    
    return (
        <div className={styles.sidebar}>
            <div className={styles['main-links-container']}>
                {navLinks.map((link, i) => (
                    <li 
                        className={`
                            ${styles.link}
                            ${routeToCompare === link.href ? styles.active : ""}
                        `} 
                        // className={`
                        //     ${styles.link} 
                        //     ${link.tierLevels.includes(tier) ? "" : styles.disabled}
                        //     ${routeToCompare === link.href ? styles.active : ""}
                        // `} 
                        key={i}
                    >
                        <Link href={link.href} passHref>
                            <a href={link.href}>
                                {link.icon}
                                <span>{link.name}</span>
                            </a>
                        </Link>
                    </li>
                ))}
            </div>
        </div>
    )
};

export default Sidebar;
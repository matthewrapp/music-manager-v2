
import Link from 'next/link';
import styles from '../styles/components/Sidebar.module.scss';
import { FaLink, FaMagnet } from "react-icons/fa";
import { useRouter } from 'next/router';
import { useStore } from '../client/context';

const Sidebar = ({ sidebarLinks }) => {
    const router = useRouter();
    const [state, _] = useStore();
    const { tier } = state.user;
    const routeToCompare = "/" + router.pathname.split('/')[2];
    
    return (
        <aside className={styles.sidebar}>
            <div className={styles['main-links-container']}>
                {sidebarLinks?.map((link, i) => (
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
        </aside>
    )
};

export default Sidebar;
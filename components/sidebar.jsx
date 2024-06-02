
import Link from 'next/link';
// import styles from '../styles/components/Sidebar.module.scss';
import { FaLink, FaMagnet } from "react-icons/fa";
import NavLink from './nav-link';
import { useRouter } from 'next/router';
import { useStore } from '../client/context';

const Sidebar = ({ sidebarLinks }) => {
    const router = useRouter();
    const [state, _] = useStore();
    const { tier } = state.user;
    const routeToCompare = "/" + router.pathname.split('/')[2];
    
    return (
        <aside className='bg-transparent'>
            <div className='flex flex-col'>
                {sidebarLinks?.map((link, i) => (
                    <NavLink 
                        icon={link.icon}
                        text={link.name}
                        active={routeToCompare === link.href}
                        activeColor={'sky'}
                        href={link.href}
                    />
                    
                ))}
            </div>
        </aside>
    )
};

export default Sidebar;
import AnalyticsCard from "../../components/analytics-card";
import withAuth from "../../hocs/with-auth";
import styles from '../../styles/pages/SmartLinks.module.scss';
import { FaBullhorn, FaEye, FaPlus } from "react-icons/fa";
import imgOne from '../../public/images/img-one.jpg';
import ItemCard from "../../components/item-card";
import NavLink from "../../components/nav-link";

const SmartLinks = () => {
    return (
        <div className={styles['smart-links']}>
            <div className={styles.header}>
                <div className={styles.title}>Manage Smart Links</div>
                <NavLink 
                    text={"Create New Smart Link"}
                    icon={<FaPlus />}
                    href={'/dashboard/smart-links/create'}
                    active={true}
                    activeColor={'orange'}
                />
            </div>

            <div className={styles['overview-container']}>
                <AnalyticsCard
                    icon={<FaBullhorn />}
                    title={"Total Smart Links"}
                    stat={'4'}
                />
                <AnalyticsCard
                    icon={<FaEye />}
                    title={"Total Visits"}
                    stat={'120'}
                />
            </div>

            <div className={styles['smart-links-container']}>

                <ItemCard 
                    className={styles['smart-link']}
                    imgSrc={imgOne}
                    name={'MVTT - Smart Link'}
                    href={'https://facebook.com/itsmvtt'}
                    handleClick={(e) => { return null }}
                    handleAvatarClick={(e) => { return null }}
                    lastUpdate={'2 Days Ago'}
                    clickCount={15}
                />
                <ItemCard 
                    className={styles['smart-link']}
                    imgSrc={imgOne}
                    name={'MVTT - Smart Link'}
                    href={'https://facebook.com/itsmvtt'}
                    handleClick={(e) => { return null }}
                    handleAvatarClick={(e) => { return null }}
                    lastUpdate={'2 Days Ago'}
                    clickCount={15}
                />
                <ItemCard 
                    className={styles['smart-link']}
                    imgSrc={imgOne}
                    name={'MVTT - Smart Link'}
                    href={'https://facebook.com/itsmvtt'}
                    handleClick={(e) => { return null }}
                    handleAvatarClick={(e) => { return null }}
                    lastUpdate={'2 Days Ago'}
                    clickCount={15}
                />
                <ItemCard 
                    className={styles['smart-link']}
                    imgSrc={imgOne}
                    name={'MVTT - Smart Link'}
                    href={'https://facebook.com/itsmvtt'}
                    handleClick={(e) => { return null }}
                    handleAvatarClick={(e) => { return null }}
                    lastUpdate={'2 Days Ago'}
                    clickCount={15}
                />
                
            </div>

        </div>
    )
};

const SmartLinksWithAuth = withAuth(SmartLinks, { redirectPath: '/login', tierLevels: ["free", "basic", "pro"] });
SmartLinksWithAuth.layoutSettings = { showNavbar: true, showSidebar: true };
export default SmartLinksWithAuth;
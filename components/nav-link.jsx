import Link from 'next/link';
import styles from '../styles/components/NavLink.module.scss';

const NavLink = ({
    icon,
    text,
    growOnHover,
    href,
    active,
    activeColor,
    backgroundColor,
    handleClick,
    width
}) => {

    const isLink = href ? true : false;

    return (
        <>
            {isLink ?
                <Link href={href} passHref>
                    <a 
                        href={href}
                        className={`
                            ${styles['nav-link']}
                            ${width ? styles[`w-${width}`] : ''}
                            ${growOnHover ? styles['hover-grow'] : ''}
                            ${active ? 
                                activeColor ? styles[`active-${activeColor}`] : styles['active-blue']
                                : ""}
                            ${backgroundColor ? styles[`bg-${backgroundColor}`] : ''}
                        `}
                    >
                        {icon && icon}
                        <span>{text}</span>
                    </a>
                </Link>
            : 
                <div
                    onClick={(e) => handleClick && handleClick(e)}
                    className={`
                        ${styles['nav-link']}
                        ${growOnHover ? styles['hover-grow'] : ''}
                        ${active ? 
                            activeColor ? styles[`active-${activeColor}`] : styles['active-blue']
                            : ""}
                        ${backgroundColor ? styles[`bg-${backgroundColor}`] : ''}
                    `}
                >
                    {icon && icon}
                    <span>{text}</span>
                </div>
            }
        </>
        
    )
};

export default NavLink;
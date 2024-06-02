import Link from 'next/link';
// import styles from '../styles/components/NavLink.module.scss';

const NavLink = ({
    icon,
    text,
    growOnHover,
    href,
    active,
    activeColor,
    backgroundColor,
    handleClick,
    className,
    width,
    resetStyles = false
}) => {

    const isLink = href ? true : false;

    console.log(active, href, 'text-'+ activeColor + '-500', activeColor)

    return (
        <>
            {isLink ?
                <Link href={href} passHref>
                    <a
                        href={href}
                        className={`
                            ${!resetStyles && 'flex space-x-4 items-center py-5 pl-8 uppercase transition duration-300 text-sm tracking-widest hover:brightness-125 text-zinc-300'}
                            ${className && className}
                            ${active ?
                                activeColor ? 'text-'+ activeColor + '-500' : 'text-sky-500'
                                : ''}
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
                        cursor-pointer flex space-x-4 items-center py-5 pl-8 uppercase transition duration-300 text-sm tracking-widest hover:brightness-125 text-zinc-300
                        ${className && className}
                        ${active ?
                            activeColor ? 'text-'+ activeColor + '-500' : 'text-sky-500'
                            : ''}
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
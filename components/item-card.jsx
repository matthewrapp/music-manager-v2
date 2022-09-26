import Link from 'next/link';
import { FaEye, FaLink, FaPencilAlt, FaTrash, FaCopy } from 'react-icons/fa';
import { BiDotsHorizontalRounded, BiShareAlt } from 'react-icons/bi';
import styles from '../styles/components/ItemCard.module.scss';
import FloatingMenu from './floating-menu';
import Avatar from './avatar';
import NavLink from './nav-link';
import { useState } from 'react';

const ItemCard = ({
    id = 0,
    className,
    imgSrc,
    name,
    href,
    handleClick,
    handleAvatarClick,
    lastUpdate,
    clickCount
}) => {
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const handleDelete = () => {
        console.log('handling delete')
    };

    const handleEdit = () => {
        console.log('handle edit')
    };

    return (
        <div
            onClick={(e) => handleClick && handleClick(e)}
            className={`${styles['item-card']} ${className ? className : ''}`}
        >
            <BiDotsHorizontalRounded 
                onClick={() => {
                    if (showShareMenu) setShowShareMenu(false);
                    setShowOptionsMenu(!showOptionsMenu);
                }}
                data-id={100} // data id is to prevent being detected inside the floating menu click listener
            />
            <BiShareAlt 
                onClick={() => {
                    if (showOptionsMenu) setShowOptionsMenu(false);
                    setShowShareMenu(!showShareMenu);
                }} 
                data-id={100} // data id is to prevent being detected inside the floating menu click listener
            />
            <Avatar
                sqaured={true}
                bgColor={'transparent'}
                src={imgSrc}
                imgSize={'260px'}
                handleClick={handleAvatarClick}
                clickable={false}
                addShadow={false}
            />
            <div className={styles['content-container']}>
                <div className={styles.name}>{name}</div>
                <Link
                    href={href}
                    passHref
                >
                    <a href={href} target="_blank" className={styles.link}>
                        <FaLink />
                        <span>{href}</span>
                    </a>
                </Link>
                <div className={styles['analytics']}>
                    <div className={`${styles.clicks}`}>
                        <span>Clicks</span>
                        <span>{clickCount}</span>
                    </div>
                </div>
                <div className={styles['last-update']}>
                    <span>Last Updated</span>
                    <span>{lastUpdate}</span>
                </div>
            </div>

            <FloatingMenu
                className={styles['options-menu']}
                showMenu={showOptionsMenu}
                setShowMenu={(bool) => setShowOptionsMenu(bool)}
            >
                <NavLink icon={<FaPencilAlt />} text={'Edit'} href={`/smart-links/edit/${id}`} />
                <NavLink icon={<FaEye />} text={'View Page'} href={`/fanlink/${id}`} />
                <NavLink icon={<FaTrash />} text={'Delete'} handleClick={handleDelete} backgroundColor={'red'} />
            </FloatingMenu>

            <FloatingMenu
                className={styles['options-menu']}
                showMenu={showShareMenu}
                setShowMenu={(bool) => setShowShareMenu(bool)}
            >
                <NavLink icon={<FaCopy />} text={'Copy Link'} handleClick={() => {
                    // Copy link to clipboard here
                }} />
            </FloatingMenu>

        </div>
    )
};

export default ItemCard;
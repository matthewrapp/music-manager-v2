import Link from 'next/link';
import { FaEye, FaLink, FaPencilAlt, FaTrash, FaCopy } from 'react-icons/fa';
import { BiDotsHorizontalRounded, BiShareAlt } from 'react-icons/bi';
// import styles from '../styles/components/ItemCard.module.scss';
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
            className={`
                relative shadow-lg shadow-[#0000006e]
                ${className && className}
            `}
        >

            <div className='flex flex-row items-center space-x-1 absolute right-2 top-2 z-10'>
                <BiDotsHorizontalRounded
                    onClick={() => {
                        if (showShareMenu) setShowShareMenu(false);
                        setShowOptionsMenu(!showOptionsMenu);
                    }}
                    data-id={100} // data id is to prevent being detected inside the floating menu click listener
                    className='text-white text-4xl cursor-pointer transition duration-300 shadow-sm shadow-black bg-neutral-900 hover:scale-110'
                />
                <BiShareAlt
                    onClick={() => {
                        if (showOptionsMenu) setShowOptionsMenu(false);
                        setShowShareMenu(!showShareMenu);
                    }}
                    data-id={100} // data id is to prevent being detected inside the floating menu click listener
                    className='text-white text-4xl cursor-pointer transition duration-300 shadow-sm shadow-black bg-neutral-900 hover:scale-110 p-1.5'
                />
            </div>

            <Avatar
                sqaured={true}
                bgColor={'transparent'}
                src={imgSrc}
                imgSize={'260px'}
                handleClick={handleAvatarClick}
                clickable={false}
                addShadow={false}
            />
            <div className='px-8 py-5 flex flex-col items-start gap-4'>
                <div className='text-lg text-zinc-100'>{name}</div>
                <Link href={href} passHref>
                    <a href={href} target="_blank" className={'text-zinc-300 text-xs flex flex-row justify-start items-center gap-x-2 tracking-wide hover:brightness-110 transition duration-300'}>
                        <FaLink />
                        <span className='w-[70%] overflow-x-hidden text-ellipsis'>{href}</span>
                    </a>
                </Link>
                <div>
                    <div className='flex flex-row items-center gap-x-2'>
                        <span className='text-xs text-zinc-300 transition duration-300 font-light uppercase'>Clicks</span>
                        <span className='text-xs text-white transition duration-300 font-light'>{clickCount}</span>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-x-2'>
                    <span className='text-xs text-zinc-300 transition duration-300 font-light uppercase'>Last Updated</span>
                    <span className='text-xs text-white transition duration-300 font-light'>{lastUpdate}</span>
                </div>
            </div>

            <FloatingMenu
                className='absolute w-[240px] top-[60px] right-2.5 shadow-lg'
                showMenu={showOptionsMenu}
                setShowMenu={(bool) => setShowOptionsMenu(bool)}
            >
                <NavLink icon={<FaPencilAlt />} text={'Edit'} href={`/smart-links/edit/${id}`} />
                <NavLink icon={<FaEye />} text={'View Page'} href={`/fanlink/${id}`} />
                <NavLink icon={<FaTrash />} text={'Delete'} handleClick={handleDelete} className="text-zinc-300 bg-red-600" />
            </FloatingMenu>

            <FloatingMenu
                className='absolute w-[240px] top-[60px] right-2.5 shadow-lg'
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
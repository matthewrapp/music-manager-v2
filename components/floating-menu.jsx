import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge'
// import styles from '../styles/components/FloatingMenu.module.scss';

const FloatingMenu = ({ 
    children,
    className,
    showMenu,
    setShowMenu
}) => {
    const floatMenuRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (floatMenuRef.current &&
                !floatMenuRef.current.contains(event.target)
                && event.target.dataset.id !== "100") { // custom attribute added
                    setShowMenu && setShowMenu(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        // Unbind the event listener on clean up
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [floatMenuRef]);

    return (
        <div 
            className={twMerge(`
                max-h-max overflow-auto bg-neutral-800 transition duration-300 translate-y-1.5 fixed z-50 right-[2rem] top-[86px] w-[300px]
                ${showMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible'}
                ${className ? className : ''}
            `)}
            ref={floatMenuRef}
        >
            {children}
        </div>
    )
};

export default FloatingMenu;
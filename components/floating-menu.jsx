import { useEffect, useRef } from 'react';
import styles from '../styles/components/FloatingMenu.module.scss';

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
            className={`
                ${styles['floating-menu']} 
                ${showMenu ? styles.active : ''}
                ${className ? className : ''}
            `}
            style={{ 
                opacity: showMenu ? '1' : '0',
                visibility: showMenu ? 'visible' : 'hidden'
            }}
            ref={floatMenuRef}
        >
            {children}
        </div>
    )
};

export default FloatingMenu;
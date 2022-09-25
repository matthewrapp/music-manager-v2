import styles from '../styles/components/MobileMenuBtn.module.scss';

const MobileMenuBtn = ({ 
    show,
    className,
    handleClick
}) => {
    return (
        <div
            className={`
                ${styles['mobile-menu-btn']} 
                ${show ? styles.active : ''}
                ${className ? className : ''}
            `}
            onClick={(e) => handleClick && handleClick(e)}
        >
            <span className={`${styles.line} ${styles['line-1']}`}></span>
            <span className={`${styles.line} ${styles['line-2']}`}></span>
            <span className={`${styles.line} ${styles['line-3']}`}></span>
        </div>
    )
};

export default MobileMenuBtn;
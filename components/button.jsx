import styles from '../styles/components/Button.module.scss';

const Button = ({ 
    type, 
    children, 
    disabled, 
    handleClick, 
    className, 
    btnStyle, // primary, secondary
    btnWidth, // expand
    btnSize // large
}) => {

    return (
        <div className={styles['button-container']}>
            {/* link button */}
            
            {/* submit button */}
            {(type === 'submit' || type === 'button') &&
                <button
                    type={type}
                    disabled={disabled}
                    className={`
                        ${styles.button} 
                        ${className ? className : ''}
                        ${btnStyle && styles[btnStyle]}
                        ${btnSize && styles[btnSize]}
                        ${btnWidth && styles[btnWidth]}
                    `}
                    onClick={(e) => {
                        handleClick && handleClick(e);
                    }}
                >
                    {children}
                </button>
            }
        </div>
    )
};

export default Button;
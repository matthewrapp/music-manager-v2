import styles from '../styles/components/Input.module.scss';

const Input = ({ 
    placeholder, 
    type, 
    name, 
    handleChange, 
    handleBlur,
    className, 
    value, 
    label,
    description,
    readOnly,
    asterickText,
    error
}) => {

    return (
        <>
            {label &&
                <div className={styles.label}>
                    {label}
                    {asterickText && <span className={styles.asterick}>{asterickText}</span>}
                </div>
            }

            {description &&
                <div className={styles.desc}>{description}</div>
            }

            <input
                readOnly={readOnly ? true : false}
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={handleChange && handleChange}
                onBlur={handleBlur && handleBlur}
                className={`${styles.input} ${className ? className : ''}`}
            />

            {error &&
                <div className={styles.error}>{error}</div>
            }
        </>
    )
}

export default Input;
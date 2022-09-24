import styles from '../styles/components/Input.module.scss';

const Input = ({ placeholder, type, name, handleChange, className, value, label }) => {

    return (
        <>
            {label &&
                <div className={styles.label}>{label}</div>
            }

            <input
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={handleChange && handleChange}
                className={`${styles.input} ${className ? className : ''}`}
            />
        </>
    )
}

export default Input;
// import styles from '../styles/components/Input.module.scss';
import ErrorMessage from './error-message';
import { twMerge } from 'tailwind-merge'

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
                <div
                    className='text-white text-sm text-left transition duration-300 ease-in-out font-light mb-2.5 relative'
                >
                    {label}
                    {asterickText && <span className='text-zinc-300 text-xs font-light absolute ml-1.5'>{asterickText}</span>}
                </div>
            }

            {description &&
                <div className='text-zinc-300 text-sm font-light text-left transition-colors duration-300 ease-in-out mb-4'>{description}</div>
            }

            <input
                readOnly={readOnly ? true : false}
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={handleChange && handleChange}
                onBlur={handleBlur && handleBlur}
                className={twMerge(`
                    bg-transparent border border-zinc-600 rounded-none box-border flex-1 leading-5 outline-none p-4 transition duration-300 w-full text-white text-sm focus:border-sky-300
                    ${className ? className : ''}
                `)}
            />

            {error &&
                <ErrorMessage>{error}</ErrorMessage>
            }
        </>
    )
}

export default Input;
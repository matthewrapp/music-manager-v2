// import styles from '../styles/components/Button.module.scss';
import { twMerge } from 'tailwind-merge';

const Button = ({ 
    type, 
    children, 
    disabled, 
    handleClick, 
    className, 
    btnStyle // primary, secondary
}) => {

    return (
        <div>
            {/* link button */}
            
            {/* submit button */}
            {(type === 'submit' || type === 'button') &&
                <button
                    type={type}
                    disabled={disabled}
                    className={twMerge(`
                        rounded-sm inline-block text-center position relative no-underline uppercase transition duration-300 border border-black tracking-wide hover:brightness-105 h-14 px-8
                        ${(btnStyle && btnStyle === 'primary') && 
                            'bg-sky-900 border-sky-300 rounded-none text-sky-300'}
                        ${className ? className : ''}
                    `)}
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
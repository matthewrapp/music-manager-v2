import styles from '../styles/components/View.module.scss';
import { twMerge } from 'tailwind-merge';

const View = ({ children, className, withSidebar = false, sidebarSize, customStyles }) => {

    return (
        <div 
            className={twMerge(`
                w-full py-[40px] px-[20px]
                ${styles.view}
                ${className ? className : ''}
                ${withSidebar ? styles['with-sidebar'] : ''}
            `)}
            style={sidebarSize ? { gridTemplateColumns: `${sidebarSize} minmax(auto, 1100px)`, ...customStyles } : { ...customStyles }}
        >
            {children}
        </div>
    )
};

export default View;
import styles from '../styles/components/View.module.scss';

const View = ({ children, className, withSidebar = false, sidebarSize }) => {

    return (
        <div 
            className={`
                ${styles.view}
                ${className ? className : ''}
                ${withSidebar ? styles['with-sidebar'] : ''}
            `}
            style={sidebarSize ? { gridTemplateColumns: `${sidebarSize} minmax(auto, 1100px)` } : {}}
        >
            {children}
        </div>
    )
};

export default View;
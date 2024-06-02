/*
* OVERVIEW: use this component to wrap all the content within a view
* PURPOSE: keep organization, make sure the app stays consistent within the content level
*/

// import styles from '../styles/components/ContentContainer.module.scss';

const ContentContainer = ({ children, className }) => {
    
    return (
        <div className={`${className && className}`}>
            {children}
        </div>
    )
};

export default ContentContainer;
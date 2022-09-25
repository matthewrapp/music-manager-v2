import styles from '../styles/components/AnalyticsCard.module.scss';

const AnalyticsCard = ({ icon, title, stat }) => {
    return (
        <div className={styles['analytics-card']}>
            <div className={styles['content-container']}>
                {icon}
                <div className={styles['info-container']}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.stat}>{stat}</div>
                </div>
            </div>
        </div>
    )
}; 

export default AnalyticsCard;
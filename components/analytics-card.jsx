import React from 'react';
// import styles from '../styles/components/AnalyticsCard.module.scss';

const ClonedIcon = ({ icon }) => React.cloneElement(icon, {
    className: 'text-4xl'
})

const AnalyticsCard = ({ icon, title, stat }) => {
    return (
        <div className='bg-neutral-900 text-zinc-200 shadow-md shadow-[#111]'>
            <div className='flex flex-row gap-x-4 justify-start items-center py-4 pl-6' style={{ minWidth: '260px' }}>
                <ClonedIcon icon={icon} />
                <div>
                    <div className='font-light tracking-wide text-sm uppercase text-zinc-300 mb-1'>{title}</div>
                    <div className='font-bold tracking-wide text-white text-4xl'>{stat}</div>
                </div>
            </div>
        </div>
    )
    // return (
    //     <div className={styles['analytics-card']}>
    //         <div className={styles['content-container']}>
    //             {icon}
    //             <div className={styles['info-container']}>
    //                 <div className={styles.title}>{title}</div>
    //                 <div className={styles.stat}>{stat}</div>
    //             </div>
    //         </div>
    //     </div>
    // )
}; 

export default AnalyticsCard;
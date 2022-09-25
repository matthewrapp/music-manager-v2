import Image from "next/image";
import styles from '../styles/components/Avatar.module.scss';

const Avatar = ({ 
    handleClick, 
    src,
    text,
    bgColor,
    textColor,
    alt,
    sqaured,
    rounded,
    imgSize = '45px',
    textSize = '18px',
    clickable = true,
    addShadow = true,
}) => {
    const placeholder = "";

    return (
        <div className={styles.avatar}>
            <div 
                className={styles['img-wrapper']}
                onClick={(e) => handleClick && handleClick(e)}
                style={{
                    cursor: "pointer",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',              
                    margin: 'auto',
                    ...(rounded && { borderRadius: '50%' }),
                    ...(sqaured && { borderRadius: '0' }),
                    ...(text && { background: bgColor }),
                    ...(imgSize && { width: imgSize, height: imgSize }),
                    ...(!clickable && { pointerEvents: 'none' }),
                    ...(addShadow && { boxShadow: '1px 1px 8px 1px #272727' })
                }}  
            >
                {(text && !src) ? (
                    <div style={{ color: textColor, fontSize: textSize }}>{text}</div>
                ) : (
                    <Image 
                        layout="fill"
                        objectFit="cover"
                        src={src || placeholder}
                        alt={alt || "profile image"}
                        placeholder="blur"
                        priority={'lazy'}
                        data-id={100}
                    />
                )}
            </div>
        </div>
    )
};

export default Avatar;
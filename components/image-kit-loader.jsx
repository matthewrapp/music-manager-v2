import Image from "next/image";
// import BlurImage from '../public/images/no-picture.jpg';

const customLoader = ({ src, width, quality }) => {
    if(src[0] === "/") src = src.slice(1);
    const params = [`w-${width}`];
    if (quality) {
      params.push(`q-${quality}`);
    }
    const paramsString = params.join(",");
    // var urlEndpoint = "https://ik.imagekit.io/vmsdviyzk6";
    // if(urlEndpoint[urlEndpoint.length-1] === "/") urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
    return `${src}?tr=${paramsString}`
  }

const ImageKitLoader = ({ src, imgWidth, imgHeight, alt, style }) => {
    return (
        <Image 
            loader={customLoader}
            src={src || ''}
            alt={alt || 'image'}
            width={imgWidth || 200}
            height={imgHeight || 200}
            style={{ borderRadius: '50%' }}
            placeholder='blur'
            blurDataURL={'../public/images/no-picture'}
        />
    )
};

export default ImageKitLoader;
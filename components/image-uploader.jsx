import axios from "axios";
import { useEffect, useState } from "react";

const ImageUploader = () => {
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const handleImagesChange = (e) => {
        setImages([...e.target.files]);
    };

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(img => {
            console.log(img, 'img here')
            // axios.post('/api/v1/upload-images', { imgBlob: img })
            //     .then(res => console.log('res', res))
            //     .catch(err => console.log(err)) 
        });
        setImageUrls(newImageUrls);
    }, [images]);

    useEffect(() => {
        console.log(imageUrls)   
    })

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImagesChange} />
            {imageUrls.map(imgSrc => <img src={imgSrc} />)}
        </div>
    )
};

export default ImageUploader;

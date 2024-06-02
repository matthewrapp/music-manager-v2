import Button from "../../components/button";
import ToggleSwitch from "../../components/toggle-switch";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from 'axios';
// import styles from '../../styles/components/initiate-account-partials/CreateArtist.module.scss';
import { useStore } from "../../client/context";
import Cookies from "js-cookie";
import ImageKitLoader from "../../components/image-kit-loader";
import { useEffect, useRef, useState } from "react";
import Loading from "react-loading";


const CreateArtist = ({ handleClick, formData }) => {
    const [tempArtistImgSrc, setTempArtistImgSrc] = useState( ...formData.artistImg );
    const [uploadingImg, setUploadingImg] = useState(false);
    const uploadImgRef = useRef();

    const handleArtistSave = (e, packageName) => {
        // if (packageName === '' || !packageName) return;
        // const values = { ...formData, package: packageName };
        // handleClick && handleClick(values);
    };
    
    const handleImagesChange = async (e) => {
        if (!uploadImgRef.current) return;
        setUploadingImg(true);
        const token = Cookies.get('mm_token');

        const formData = new FormData();
        Object.values(e.target.files).forEach(file => {
            console.log('file here', file)
            formData.append('pictureToSave', file);
        });

        const imgData = await axios.post('/api/v1/image-kit/upload', formData, {
            "headers": { "authorization": `$Bearer ${token}`, "Content-Type": "multipart/form-data" },
        })
            .then(res => res)
            .catch(err => console.log(err));

        setUploadingImg(false)
        setTempArtistImgSrc(imgData.data.url)
    };

    return (
        <div>
            <div>
                <div className=''>Create Your First Artist</div>
                <div className=''>Before you can create anything, you must have an artist identity.</div>
            </div>

            <div className=''>

                <div className='flex flex-row items-center'>

                    {(tempArtistImgSrc && !uploadingImg) && 
                        <ImageKitLoader 
                            src={tempArtistImgSrc}
                            imgWidth={200}
                            imgHeight={200}
                            alt={'profile pic'}
                        /> 
                    }

                    {/* {(!tempArtistImgSrc && uploadingImg) &&
                        
                    } */}

                    {(!tempArtistImgSrc) &&
                        <div 
                            className='rounded-full w-[200px] h-[200px] bg-neutral-400 bg-center bg-cover p-5 flex content-center items-center'
                            style={{
                                backgroundImage: require('../../public/images/no-picture.jpg'),
                                ...(uploadingImg && { backgroundImage: 'none' }) 
                            }}
                        >
                            {uploadingImg && <Loading type="spin" />}
                        </div>
                    }

                    <Button
                        type={'button'}
                        disabled={false}
                        btnStyle={'primary'}
                        className={''}
                        handleClick={(e) => uploadImgRef.current.click()}
                    >Choose File</Button>
                    <input 
                        ref={uploadImgRef} 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImagesChange} 
                        hidden
                    />
                </div>

            </div>
        </div>
    )
};

export default CreateArtist;
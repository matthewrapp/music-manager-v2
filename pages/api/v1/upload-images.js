import apiHandler from '../../../utilities/api/apiHandler';
// import UploadClient from '@uploadcare/upload-client';
// const client = new UploadClient({ publicKey: '1fc7c2b0a27c15c02aa1' });

// use apiHandler to know which function to hit by method
// export default apiHandler({
//     post: uploadImage,
// });

const uploadImage = async (req, res) => {

    try {
        console.log('getting here?')
        const { imgBlob } = req.body;
        await client.uploadFile(imgBlob).then(file => console.log('file here!', file));
        return res.status(200).json({});
    } catch(err) {
        console.log(err)
        return res.status(400).json({ message: err });
    }
};

export default uploadImage;
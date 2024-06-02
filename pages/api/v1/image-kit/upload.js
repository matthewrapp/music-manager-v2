import api_handler from '../../../../middleware/api_handler';
import ImageKit from "imagekit";
import parseForm from '../../../../utilities/api/parse_form';
import { promises as fs } from "fs";

const uploadImage = async (req, res) => {

    try {
        if (!req.user) return res.status(404).json({ message: "Not authorizaed..." });
    } catch(err) {
        console.log(err)
        return res.status(400).json({ message: err });
    }

    try {
        // create an image kit instance
        const imgkit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: process.env.IMAGEKIT_ENDPOINT
        });

        console.log('getting here!!')

        // parse form data coming in
        const { fields, files } = await parseForm(req);

        // const base64ImageData = await fs.readFile(parsed_data.files.pictureToSave.filepath, { encoding: "base64" });
        const base64ImageData = await fs.readFile(files.pictureToSave.filepath, (err, data) => {
            if (err) throw new Error(err);
            return data;
        });

       const imgkit_results = await imgkit.upload({
            file: base64ImageData,
            fileName: files.pictureToSave.newFilename,
            tags: ['test-tag']
        })
        .then(response => response)
        .catch(err => {
            console.log(err);
            throw new Error(err);
        });

        return res.status(200).json(imgkit_results);
        
    } catch(err) {
        console.log(err)
        return res.status(400).json({ message: err });
    }
};

export const config = { api: { bodyParser: false } }; // Disallow body parsing, consume as stream }
export default api_handler.post(uploadImage);
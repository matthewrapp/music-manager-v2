const formidable = require('formidable');
import { mkdir, stat } from "fs/promises";
import { join } from "path";
const fs = require('fs');

const parseForm = async (req) => {
    return await new Promise(async (resolve, reject) => {
        const upload_dir = join(process.env.ROOT_DIR || process.cwd(), `/uploads/${Date.now()}`)

        try {
            // see if the directory already exists
            // will throw an exception if not found
            await stat(upload_dir);
        } catch (err) {
            if (err.code === "ENOENT") {
                await mkdir(upload_dir, { recursive: true });
            } else {
                console.log(err);
                reject(err);
                return;
            }
        }

        const form = new formidable.IncomingForm({
            keepExtensions: true,
            uploadDir: upload_dir,
            filename: (name, ext, part) => {
                return `${name}-${Date.now()}${ext}`;
            },
            filter: ({ name, originalFilename, mimetype }) => {
                // keep only images
                return mimetype && mimetype.includes("image")
            }
        });

        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });

    });
};

export default parseForm;
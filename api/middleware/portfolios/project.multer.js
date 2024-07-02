import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sanitize from '../../utils/sanitize.js';

const __dirname = path.resolve();

export const multerUploadProject = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            try {
                const username = sanitize(req.user.username);
                const portfolioTitle = sanitize(req.body.portfolioTitle);
                const title = sanitize(req.body.title);

                const userDir = path.join(__dirname, 'public/portfolios', username);
                const portfolioDir = path.join(userDir, portfolioTitle);
                const projectDir = path.join(portfolioDir, title);

                // console.log("Creating directories:", userDir, portfolioDir, projectDir);

                if (!fs.existsSync(userDir)) {
                    fs.mkdirSync(userDir, { recursive: true });
                }

                if (!fs.existsSync(portfolioDir)) {
                    fs.mkdirSync(portfolioDir, { recursive: true });
                }

                if (!fs.existsSync(projectDir)) {
                    fs.mkdirSync(projectDir, { recursive: true });
                }
                // console.log("Directories created successfully");

                cb(null, projectDir);
            } catch (error) {
                console.error("Error creating directories:", error);
                cb(error);
            }
        },
        filename: (req, file, cb) => {
            const filename = 'PIMG' + '-' + Date.now() + Math.round(Math.random() * 1000000) + '.' + file.mimetype.split('/')[1];
            console.log("Saving file as:", filename);
            cb(null, filename);
        },
    });

    const fileFilter = (req, file, cb) => {
        const extFilter = ['jpg', 'jpeg', 'png', 'gif'];
        const checkExt = extFilter.includes(file.mimetype.split('/')[1].toLowerCase());

        if (checkExt) {
            cb(null, true);
        } else {
            cb(new Error('File format not match'));
        }
    };

    return multer({ storage, fileFilter });
};

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sanitize from '../../utils/sanitize.js';

const __dirname = path.resolve();

export const multerUploadPortfolio = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // const username = req.user.username;
            // const { title } = req.body;
            const username = sanitize(req.user.username);
            const title = sanitize(req.body.title)

            const userDir = path.join(__dirname, 'public/portfolios', username);
            const portfolioDir = path.join(userDir, title)

            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir, { recursive: true });
            }

            if (!fs.existsSync(portfolioDir)) {
                fs.mkdirSync(portfolioDir, { recursive: true });
            }

            cb(null, portfolioDir);
        },
        filename: (req, file, cb) => {
            cb(null,
                'PIMG' + '-' + Date.now() + Math.round(Math.random() * 1000000) + '.' +
                file.mimetype.split('/')[1]
            );
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

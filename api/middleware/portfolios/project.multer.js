import multer from 'multer';
import path from 'path';
const __dirname = import.meta.dirname;

 export const multerUploadProject = () => {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                // cb(null, './src/public')
                cb(null, path.join(__dirname, `../../public/portfolios/projects`));
            },
            filename: (req, file, cb) => {
                cb(null,
                    'PIMG' + '-' + Date.now() + Math.round(Math.random() * 1000000) + '.' +
                    file.mimetype.split('/')[1]
                );
            },
            limits: {
                fileSize: 1024 * 1024,
            },
        });

        const fileFilter = (req, file, cb) => {
            const extFilter = ['jpg', 'jpeg', 'png', 'gif']
            const checkExt = extFilter.includes(file.mimetype.split('/')[1].toLowerCase())

            if (checkExt) {
                cb(null, true)
            } else {
                cb(new Error('File format not match'))
            }
        }
        return multer({ storage, fileFilter })
    }
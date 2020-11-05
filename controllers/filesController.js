const multer = require('multer');
const shortid = require('shortid');

exports.uploadFile = async (req, res, next) => {

    const configurationMulter = {
        limits : { fileSize : req.user ? 1024 * 1024 * 10 : 1024 * 1024  },
        storage: filseStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}` );
            }
        })
    }

    const upload = multer(configurationMulter).single('file');

    upload( req, res, async(error) => {
        console.log(req.file);
        if (!error) {
            res.json({file: req.file.filename});
        }else{
            console.log(error);
            return next();
        }
    })
}

exports.deleteFile = async (req, res) => {
    console.log('from deleteFile')
}

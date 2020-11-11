const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Links = require('../models/Link');

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
    console.log(req.file);
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
        console.log('File deleted');
    } catch (error) {
        console.log(error);
    }
}

exports.download = async (req, res, next) => {

    const { file } = req.params;

    const link = await Links.findOne({name: file})

    const fileDownload = __dirname + '/../uploads/' + file;
    res.download(fileDownload);

    const { downloads, name } = link;
    if (downloads === 1) {
        req.file = name;
        await Links.findOneAndRemove(link.id);
        next()
    }else{
        link.downloads--;
        await link.save();
    }
}

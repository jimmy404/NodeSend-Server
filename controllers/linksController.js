const Links = require('../models/Link');
const shortid = require('shortid');


exports.newLink = async(req, res, next) => {
    const { original_name, password } = req.body;

    const link = new Links();
    link.url = shortid.generate();
    link.name = shortid.generate();
    link.original_name = original_name;
    link.password = password;
    try {
        await link.save();
        return res.json({ msg: `${link.url}`});
        next();
    } catch (error) {
        console.log(error);
    }
}

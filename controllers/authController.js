const User = require('../models/User');

exports.authenticateUser = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
        res.status(401).json({msg: 'Username does not exist'})
        return next();
    }
    console.log('Username exist')
}

exports.authenticatedUser = (req, res) => {

}
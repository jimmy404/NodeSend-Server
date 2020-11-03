const User = require('../models/User');

exports.newUser = async (req, res) => {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if(user){
        return res.status(400).json({msg: 'User already exist'})
    }
    user = await new User(req.body);
    user.save();
    res.json({msg: 'user created successfully'});
}

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(authHeader){
        const token = authHeader.split(' ')[1];

        try {
            const user = jwt.verify(token, process.env.SECRET);
            res.user = user;
        } catch (error) {
            console.log('jwt no valido')
        }
    }

    return next();
}

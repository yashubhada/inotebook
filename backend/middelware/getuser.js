// middleware of get user from db using user TOKEN
const jwt = require('jsonwebtoken');
const JWT_SECRET = "User@123##*";

const getUser = (req, res, next) => {
    // get token from api using header
    const token = req.headers['auth-token']
    // const token = req.body.token;
    // when token not match than send error
    if (!token) {
        return res.status(401).json('Unauthorize user');
    }
    try {
        // verify token
        const data = jwt.verify(token, JWT_SECRET);
        req.decode = data.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Token not valid');    
    }
}

module.exports = getUser;

let jwt = require('jsonwebtoken');
const checkToken = (req, res, next) => {
    let accessToken = req.headers.authorization.split(' ')[1];
    let decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    let expires = decoded.exp;
    console.log('expires', expires)
    let now = Math.floor(Date.now() / 1000);
    if (expires < now) {
        return res.status(401).json({ error: 'Phiên đăng nhập đã hết hạn.' });
    }
    console.log(req.headers.authorization.split(' ')[1])
    next();
};

module.exports = {
    checkToken
}

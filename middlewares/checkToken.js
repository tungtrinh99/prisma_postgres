const jwt = require("jsonwebtoken")

const checkToken = (req, res, next) => {
	if (req.headers.authorization) {
		try {
			const authorization = req.headers.authorization.split(" ")
			if (authorization[0] !== "Bearer") {

				return res.status(401).json({ error: "Không tìm thấy token." })
			}
			const accessToken = authorization[1]
			const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
			jwt.verify(accessToken, accessTokenSecret)
			// const expires = decoded.exp;
			// const now = Math.floor(Date.now() / 1000);
			// if (expires < now) {
			//     return res.status(401).json({ error: 'Phiên đăng nhập đã hết hạn.' });
			// }

			return next()
		} catch (e) {

			return res.status(401).json({ error: "Forbidden: " + e.message })
		}
	} else {

		return res.status(401).json({ error: "Không tìm thấy token." })
	}

}

module.exports = {
	checkToken
}

const {PrismaClient} = require("@prisma/client")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const generateAccessToken = (email) => {
	const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
	return accessToken
}

const generateRefreshToken = (email) => {
	const refreshToken = jwt.sign({ email },  process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
	return refreshToken
}


exports.userController = () => {
	const prisma = new PrismaClient()

	return {
		signup: async (req, res) => {
			const { email, password, username, firstName, lastName } = req.body

			try {
				const passwordHash = await bcrypt.hash(password, 10)
				const user = await prisma.user.create({
					data: {
						email,
						passwordHash,
						username,
						firstName,
						lastName,
					},
				})

				res.json({ user })
			} catch (error) {
				res.status(500).json({ error: error })
			}
		},
		login: async (req, res) => {
			const { email, password } = req.body

			try {
				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				})

				if (!user) {
					return res.status(401).json({ error: "Tài khoản không tồn tại." })
				}

				const passwordMatch = await bcrypt.compare(password, user.passwordHash)

				if (!passwordMatch) {
					return res.status(401).json({ error: "Tài khoản hoặc mật khẩu không đúng." })
				}

				const accessToken = generateAccessToken(email)
				const refreshToken = generateRefreshToken(email)

				res.json({ message: "Đăng nhập thành công.", user, accessToken, refreshToken })
			} catch (error) {
				res.status(500).json({ error: "Đã có lỗi xảy ra." })
			}
		},
		refreshToken: async (req, res) => {
			const { email, refreshToken } = req.body

			try {
				const user = await prisma.user.findUnique({
					where: {
						refreshToken,
					},
				})

				if (!user) {
					return res.status(401).json({ error: "Tài khoản không tồn tại." })
				}

				const refreshToken = generateRefreshToken(email)
				const accessToken = generateAccessToken(email)

				res.json({ message: "Lấy token thành công.", accessToken, refreshToken })
			} catch (error) {
				res.status(500).json({ error: "Đã có lỗi xảy ra." })
			}
		},
		// logout: async (req, res) => {
		//     const authorization = req.headers.authorization;
		//     const accessToken = authorization.split(' ')[1];
		//     if (accessToken) {
		//         blackList.push(accessToken);
		//     }
		//     return res.statusCode(200).json({ message: 'Đăng xuất thành công.' });
		// }
	}
}
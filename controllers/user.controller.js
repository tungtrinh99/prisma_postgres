const {PrismaClient} = require('@prisma/client');
const {validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateAccessToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    return accessToken;
};

const generateRefreshToken = (email) => {
    const refreshToken = jwt.sign({ email: email },  process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return refreshToken;
};

exports.userController = () => {
    const prisma = new PrismaClient()

    return {
        signup: async (req, res) => {
            const { email, password, username, firstName, lastName } = req.body;

            // try {
                // const passwordHash = await bcrypt.hash(password, 10);
                // const user = await prisma.user.create({
                //     data: {
                //         email,
                //         passwordHash,
                //         username,
                //         firstName,
                //         lastName,
                //     },
                // });

                const accessToken = generateAccessToken(1);
                await prisma.accessToken.create({
                    data: {
                        user_id: 1,
                        token: accessToken,
                    }
                });

                res.json({ accessToken });
            // } catch (error) {
            //     res.status(500).json({ error: error });
            // }
        },
        login: async (req, res) => {
            const { username, password } = req.body;

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        username,
                    },
                });

                if (!user) {
                    return res.status(401).json({ error: 'Tài khoản không tồn tại.' });
                }

                const passwordMatch = await bcrypt.compare(password, user.passwordHash);

                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Tài khoản hoặc mật khẩu không đúng.' });
                }

                const accessToken = await prisma.accessToken.findUnique({
                    where: {
                        user_id: user.id
                    },
                });

                const refreshToken = generateRefreshToken();

                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        refreshToken,
                    },
                });

                res.json({ message: 'Đăng nhập thành công.', user, accessToken, refreshToken });
            } catch (error) {
                res.status(500).json({ error: 'Đã có lỗi xảy ra.' });
            }
        },
        refreshToken: async (req, res) => {
            const { refreshToken } = req.body;

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        refreshToken,
                    },
                });

                if (!user) {
                    return res.status(401).json({ error: 'Tài khoản không tồn tại.' });
                }

                const accessToken = generateAccessToken(user.id);
                await prisma.accessToken.update({
                    where: {
                        user_id: user.id,
                    },
                    data: {
                        token: accessToken,
                    },
                });

                res.json({ message: 'Lấy token thành công.', accessToken });
            } catch (error) {
                res.status(500).json({ error: 'Đã có lỗi xảy ra.' });
            }
        },
        // api user
        index: async (req, res) => {
            const users = await prisma.user.findMany();
            res.json(users);
        },
        detail: async (req, res) => {
            const userId = req.params.id;
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(userId),
                },
            })
            res.json(user)
        },
        create: async (req, res, next) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array(),
                    });
                }

                const {firstName, lastName} = req.body;
                const user = await prisma.user.create({
                    data: {
                        firstName,
                        lastName
                    }
                })
                res.json(user);
            } catch (e) {
                next(e);
            }

        }
    }
}
const {PrismaClient} = require('@prisma/client');
const {validationResult} = require("express-validator");

exports.userController = () => {
    const prisma = new PrismaClient()

    return {
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
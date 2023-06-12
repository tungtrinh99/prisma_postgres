const {PrismaClient} = require('@prisma/client');
const {validationResult} = require("express-validator");

exports.messageController = () => {
    const prisma = new PrismaClient();

    return {
        index: async (req, res) => {
            try {
                const messages = await prisma.message.findMany({
                    orderBy: {
                        id: 'desc'
                    }
                })
                res.json(messages);
            } catch (err) {
                res.status(500).json(err);
            }
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

                const {
                    woman_id,
                    user_id,
                    message
                } = req.body;
                const result = await prisma.message.create({
                    data: {
                        woman_id,
                        user_id,
                        message
                    }
                });
                res.json(result);
            } catch (e) {
                next(e)
            }
        }
    }
}
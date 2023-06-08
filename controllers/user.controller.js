const {PrismaClient} = require('@prisma/client');

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
        }
    }
}
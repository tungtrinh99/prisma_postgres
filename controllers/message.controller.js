const {PrismaClient} = require('@prisma/client');
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
        }
    }
}
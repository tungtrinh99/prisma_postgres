const cloudinary = require("../util/cloudinary");
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();
const {PrismaClient} = require('@prisma/client');

exports.womanController = () => {
    const prisma = new PrismaClient();

    const index = async (req, res) => {
        try {
            const women = await prisma.woman.findMany({
                include: {
                    _count: {
                        select: {Message: true},
                    },
                },
                orderBy: {
                    Message: {
                        _count: 'desc'
                    }
                }
            })
            res.json(women);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    const detail = async (req, res) => {
        try {
            const womanId = Number(req.params.id);
            const woman = await prisma.woman.findUnique({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    avatar: true,
                    Message: true,
                },
                where: {
                    id: womanId,
                },
            })
            res.json(woman)
        } catch (err) {
            res.status(500).json(err);
        }

    }
    const create = async (req, res) => {
        const {firstName, lastName, username} = req.body;
        const woman = prisma.woman.create({
            data: {
                firstName,
                lastName,
                username
            }
        })
        res.json(woman);
    }
    const update = async (req, res) => {
        const womanId = Number(req.params.id);

        try {
            const file = req.file;
            const path = file.path;
            const newPath = await cloudinary.uploads(path, process.env.CLOUDINARY_FOLDER);
            if (newPath.error) {
                res.status(500).json({
                    error: true,
                    message: "Upload picture error"
                });
            }
            fs.unlinkSync(path);
            const woman = await prisma.woman.update({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    avatar: true,
                    Message: true,
                },
                where: {
                    id: womanId,
                },
                data: {
                    avatar: newPath.url,
                },
            })
            if (woman) {
                res.json({
                    message: "Success",
                    data: woman,
                })
            }
        } catch (e) {
            res.status(500).json({
                error: e,
                message: "Error"
            })
        }
    }

    return {
        index,
        detail,
        create,
        update
    }
}

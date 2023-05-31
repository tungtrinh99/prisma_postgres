const { PrismaClient } = require('@prisma/client');
const express = require("express")

const cors = require('cors')
const prisma = new PrismaClient()
const app = express();

app.use(cors());
app.use(express.json())

// ... your REST API routes will go here
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})
// user
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})
app.get('/users/:id', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(req.params.id),
        },
    })
    res.json(user)
})
// woman
app.get('/women', async (req, res) => {
    const women = await prisma.woman.findMany()
    res.json(women)
})
app.get('/women/:id', async (req, res) => {
    const woman = await prisma.woman.findUnique({
        where: {
            id: Number(req.params.id),
        },
    })
    res.json(woman)
})

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)
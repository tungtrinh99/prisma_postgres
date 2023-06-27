const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
	const tungTrinh = await prisma.user.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			firstName: "Trinh Tung",
			lastName: "Tung",
			avatar: "https://i.imgur.com/EJKHmUw.png",
		},
	})

	const yenNhi = await prisma.woman.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			firstName: "Truong Yen",
			lastName: "Nhi",
			username: "nhi.truong",
			avatar: "https://i.imgur.com/EJKHmUw.png",
		},
	})
  
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
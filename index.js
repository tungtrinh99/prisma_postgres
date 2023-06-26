const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const {routers} = require("./routers")

const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
routers(app)
app.listen(process.env.APP_PORT, () =>
	console.log("REST API server ready at: http://localhost:" + process.env.APP_PORT)
)
const router = require("./api")

exports.routers = (app) => {
	app.use("/", router)
}
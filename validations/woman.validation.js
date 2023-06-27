const {body} = require("express-validator")
const validateWomanBodyRequest = [
	body("firstName")
		.exists({checkFalsy: true})
		.withMessage("firstName is required")
		.isString()
		.withMessage("firstName should be string"),
	body("lastName")
		.exists({checkFalsy: true})
		.withMessage("lastName is required")
		.isString()
		.withMessage("lastName should be string"),
	body("username")
		.exists({checkFalsy: true})
		.withMessage("username is required")
		.isString()
		.withMessage("username should be string")
]

module.exports = {
	validateWomanBodyRequest
}
const {body} = require("express-validator")
const validateMessageBodyRequest = [
	body("woman_id")
		.exists({checkFalsy: true})
		.withMessage("woman_id is required")
		.isInt()
		.withMessage("woman_id should be integer"),
	body("user_id")
		.exists({checkFalsy: true})
		.withMessage("user_id is required")
		.isInt()
		.withMessage("user_id should be integer"),
	body("message")
		.exists({checkFalsy: true})
		.withMessage("message is required")
		.isString()
		.withMessage("message should be string"),
]

module.exports = {
	validateMessageBodyRequest
}
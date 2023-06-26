const {body} = require("express-validator")
const {messages} = require("../utils/message")

const validateSignupBodyRequest = [
    body("email")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.email.required)
        .isEmail()
        .withMessage(messages.validation.auth.email.invalid),
    body("password")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.password.required)
        .isInt()
        .withMessage(messages.validation.auth.password.invalid),
    body("firstName")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.firstName.required)
        .isString()
        .withMessage(messages.validation.auth.firstName.invalid),
    body("lastName")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.lastName.required)
        .isString()
        .withMessage(messages.validation.auth.lastName.invalid),
    body("username")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.username.required)
        .isString()
        .withMessage(messages.validation.auth.username.invalid),
]

module.exports = {
    validateSignupBodyRequest
}
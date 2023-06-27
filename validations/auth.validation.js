const {body} = require("express-validator")
const {messages} = require("../utils/message")

const validateSignupBodyRequest = [
    body("email")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.email.required)
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
        .withMessage(messages.validation.auth.email.invalid),
    body("password")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.password.required)
        .matches(/^[0-9a-zA-Z*.!@$%^&(){}[\]:;<>,.?~_+-=|]{8,32}$/)
        .withMessage(messages.validation.auth.password.invalid)
        .isLength({ min: 8 })
        .withMessage(messages.validation.auth.password.length),
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
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage(messages.validation.auth.username.invalid),
]

const validateLoginBodyRequest = [
    body("email")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.email.required)
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
        .withMessage(messages.validation.auth.email.invalid),
    body("password")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.password.required)
        .matches(/^[0-9a-zA-Z*.!@$%^&(){}[\]:;<>,.?~_+-=|]{8,32}$/)
        .withMessage(messages.validation.auth.password.invalid)
        .isLength({ min: 8 })
        .withMessage(messages.validation.auth.password.length),
]

const validateRefreshTokenBodyRequest = [
    body("email")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.email.required)
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
        .withMessage(messages.validation.auth.email.invalid),
    body("refreshToken")
        .exists({checkFalsy: true})
        .withMessage(messages.validation.auth.refreshToken.required)
        .matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        .withMessage(messages.validation.auth.refreshToken.invalid),
]

module.exports = {
    validateSignupBodyRequest,
    validateLoginBodyRequest,
    validateRefreshTokenBodyRequest
}
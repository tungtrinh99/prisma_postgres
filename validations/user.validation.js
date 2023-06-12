const {body} = require("express-validator");
const validateUserBodyRequest = [
    body("firstName")
        .exists({checkFalsy: true})
        .withMessage("firstName is required")
        .isString()
        .withMessage("firstName should be string"),
    body("lastName")
        .exists({checkFalsy: true})
        .withMessage("lastName is required")
        .isString()
        .withMessage("lastName should be string")
];

module.exports = {
    validateUserBodyRequest
}
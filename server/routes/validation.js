import Joi from "joi";
const passwordComplexity = require("joi-password-complexity");

const PASSWORD_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const NAME_REGEX = new RegExp(
    "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"
);

const registerSchema = Joi.object.keys({
    firtName: Joi.string().pattern(NAME_REGEX).min(3).max(25).required(),
    lastName: Joi.string().pattern(NAME_REGEX).min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).required()
});

const loginSchema = Joi.object.keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = {
    registerSchema,
    loginSchema
};
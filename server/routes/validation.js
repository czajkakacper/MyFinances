const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 5,
    max: 255,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};  

const customMessages = {
    'string.base': 'Pole {#label} musi być ciągiem znaków.',
    'string.min': 'Pole {#label} musi mieć co najmniej {#limit} znaków.',
    'string.max': 'Pole {#label} nie może mieć więcej niż {#limit} znaków.',
    'string.empty': 'Pole {#label} nie może być puste.',
    'string.pattern.base': 'Pole {#label} zawiera niedozwolone znaki.',
    'number.base': 'Pole {#label} musi być liczbą.',
    'any.required': 'Pole {#label} jest wymagane.',
    'number.greater': '{#label} musi być większa niż {#limit+1}',
    'number.less': '{#label} musi być mniejsza niż {#limit-1}',
    'passwordComplexity.tooShort': 'Hasło musi mieć co najmniej 8 znaków.',
    'passwordComplexity.uppercase': 'Hasło musi zawierać przynajmniej jedną wielką literę.',
    'passwordComplexity.numeric': 'Hasło musi zawierać przynajmniej jedną cyfrę.',
    'passwordComplexity.symbol': 'Hasło musi zawierać przynajmniej jeden znak specjalny (np.!.@#$%^&*).'
};

const NAME_REGEX = new RegExp(
    "^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"
);

const userSchema   = Joi.object({
    firstName: Joi.string().pattern(NAME_REGEX).min(3).max(25).required(),
    lastName: Joi.string().pattern(NAME_REGEX).min(2).max(50).required(),
    email: Joi.string().email().required().label("E-mail"),
    password: passwordComplexity().required().label("Password")
}).messages(customMessages);

const passwordComplexityInstance = passwordComplexity(complexityOptions);

module.exports = {
    userSchema,
    passwordComplexityInstance
};
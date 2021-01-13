//Validation
import Joi from '@hapi/joi';


//register Validation
const registerValidation = data => {
    const schema = {
        name: Joi.string()
                .min(6)
                .required(),
        email: Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .min(6)
                .required()
    };
    
    return Joi.validate(data, schema);
    
}

//loginValidation
const loginValidation = data => {
    const schema = {
        email: Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .min(6)
                .required()
    };
    
    return  Joi.validate(data, schema);
    
}

export const  registerValid = registerValidation;
export  const loginValid = loginValidation;
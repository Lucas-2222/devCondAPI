import { checkSchema } from 'express-validator';

const AuthValidators = {
    
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido!'
        },
        password: {
            isLength:{
                options:{min: 2}
            },
            errorMessage: 'Senha precisa ter pelomenos 2 caracteres'
        }
    }),
    signup: checkSchema({
        name:{
            trim: true,
            notEmpty: true,
            isLength:{
                options:{min:5}
            },
            errorMessage: 'Nome precisa ter pelomenos 5 caracteres!'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido!'
        },
        password: {
            isLength:{
                options:{min: 8}
            },
            errorMessage: 'Senha precisa ter pelomenos 8 caracteres'
        },
    }),
}

export default AuthValidators;
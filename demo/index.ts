import Joi from 'joi';
import {messages} from '../src';

const schema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
});

const result = schema.validate({
    nome: 'Eduardo Oliveira',
    email: 'aaaa'
}, { messages });

if (result.error) {
    console.log(result.error.details);
}


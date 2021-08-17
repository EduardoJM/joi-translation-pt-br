import express from 'express';
import { celebrate, errors, Joi } from 'celebrate';
import { messages } from '../../src';

const ExampleValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
}, {
    abortEarly: false,
    messages: messages,
});

const app = express();
app.use(express.json());

app.post('/test', ExampleValidation, (req, res) => {
    res.json();
});

app.use(errors());
app.listen(3333);

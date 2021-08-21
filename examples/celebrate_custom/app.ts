import express, { Request, Response, NextFunction } from 'express';
import { celebrate, Joi, isCelebrateError } from 'celebrate';
import { messages } from '../../src';

function customErrors() {
    const fieldNames: { [key: string]: string; } = {
        email: 'endereço de e-mail',
        password: 'o campo de senha'
    };

    function replaceFieldNames(message: string) {
        const keys = Object.keys(fieldNames);
        let msg = message;
        keys.forEach((k) => {
            const regex = new RegExp(`\"${k}\"`, 'gi');
            msg = msg.replace(regex, String(fieldNames[k]));
        });
        return msg;
    }

    return (error: any, req: Request, res: Response, next: NextFunction) => {
        if (!isCelebrateError(error)) {
            return next(error);
        }
        // is a celebrate error
        const result: {
            error: 'VALIDATION_ERROR',
            messages: string[],
        } = {
            error: 'VALIDATION_ERROR',
            messages: [],
        };
        for (const [segment, joiError] of error.details.entries()) {
            result.messages = joiError.details.map((err) => {
                return replaceFieldNames(err.message);
            });
        }
        return res.status(400).json(result);
    };
}

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

app.use(customErrors());
app.listen(3333);

import express, { Request, Response, NextFunction } from 'express';
import { celebrate, Joi, isCelebrateError } from 'celebrate';
import { messages } from '../../src';

function customErrors() {
    const buildObjWithValue = (paths: string[], value = '') => {
        return paths.reduceRight((acc, item, index) => ({
            [item]: index === paths.length - 1
                ? value
                : acc
        }), {});
    }

    const isObject = (item: any) => {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
      
    const mergeDeep = (target: any, source: any) => {
        let output = Object.assign({}, target);
        if (isObject(target) && isObject(source)) {
            Object.keys(source).forEach(key => {
                if (isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = mergeDeep(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }

    return (error: any, req: Request, res: Response, next: NextFunction) => {
        if (!isCelebrateError(error)) {
            return next(error);
        }
        // is a celebrate error
        let data = {};
        for (const [segment, joiError] of error.details.entries()) {
            joiError.details.forEach((err) => {
                const obj = buildObjWithValue(err.path.map((item) => item.toString()), err.message);
                data = mergeDeep(data, obj);
            });
        }
        return res.status(400).json(data);
    };
}

const ExampleValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email().label("E-mail"),
        password: Joi.string().required().label("Senha"),
        items: Joi.array().items(Joi.object().keys({
            name: Joi.string().required().label("Nome"),
            price: Joi.number().min(1).max(50).required().label("Preço"),
        }))
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

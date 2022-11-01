
# Celebrate Middleware Customizado

É possível customizar a resposta do middleware celebrate para termos as mensagens de resposta de acordo com o que queremos. Para isso, precisamos criar uma nova função `errors()` que faça o papel que a função `errors()` original faz. Esse código foi escrito tendo como base o original, disponível no [GitHub](https://github.com/arb/celebrate/blob/master/lib/celebrate.js#L180). Uma versão pronta/funcional desse exemplo pode ser consultada em [examples/celebrate_custom](https://github.com/EduardoJM/joi-translation-pt-br/tree/main/examples/celebrate_custom). 

O primeiro ponto que precisamos tratar aqui é como o retorno será feito: quando fizermos uma chamada `POST` para `/test` com dados incompletos, teremos um retorno estruturado da seguinte forma, onde os erros são estruturados de acordo com o path retornado pela biblioteca Joi:

```json
{
	"email": "\"E-mail\" deve ser um e-mail válido",
	"password": "\"Senha\" é obrigatório",
	"items": {
		"0": {
			"price": "\"Preço\" é obrigatório"
		},
		"1": {
			"name": "\"Nome\" é obrigatório",
			"price": "\"Preço\" é obrigatório"
		}
	}
}
```

## Introdução

Primeiro, se estiver usando **TypeScript** é importante adicionar o seguinte item dentro das configurações de compilação do arquivo `tsconfig.json`:

```json
{
    //...
    "compilerOptions": {
        //...
        "downlevelIteration": true,
        //...
    }
    //...
}
```

Isso é apenas para o formato de iteração que utilizamos aqui (o mesmo do código original do celebrate). Você é livre para fazer isso de outra forma e, inclusive, caso queira, modificar essa documentação de forma a melhorar essa questão.

## Criando o middleware

Vamos criar um middleware que processe os dados retornados pela lib Joi e construa objetos com o `path` e a `message` e que, posteriormente, faça um *deep merge* para isso. Primeiro, algumas funções utilitárias, como o `mergeDeep()`:

```typescript
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

    // middleware aqui
}
```

O middleware, de fato é bem pequeno e pode ser resumido a:

```typescript
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
```

O código acima deve ser juntado ao anterior:

```typescript
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
```

## Utilizando o middleware

Agora, basta substituirmos o middleware no app express:

```typescript
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
```

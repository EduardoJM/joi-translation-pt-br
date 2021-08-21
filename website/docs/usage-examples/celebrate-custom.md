
# Celebrate Middleware Customizado

É possível customizar a resposta do middleware celebrate para termos as mensagens de resposta de acordo com o que queremos. Para isso, precisamos criar um novo método `errors()` que faça a mesma função que o original. Esse código foi baseado no original, disponível no [GitHub](https://github.com/arb/celebrate/blob/master/lib/celebrate.js#L180). Uma versão pronta/funcional desse exemplo pode ser consultada em [examples/celebrate_custom](https://github.com/EduardoJM/joi-translation-pt-br/tree/main/examples/celebrate_custom).

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

Vamos criar um middleware que substitua o nome dos campos das mensagens por nomes mais reais e humanos, por exemplo: troque `"email"` por `endereço de e-mail`. Assim, criamos uma função `customErrors` que faz isso:

```typescript
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

    // middleware aqui
}
```

Perceba que a função acima não apresenta, já, o middleware. Apenas uma mensagem de onde ele estará localizado. Isso foi intencional para que vocês percebam que, de fato, o middleware é bem pequeno:

```typescript
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
```

O código acima deve ser juntado ao anterior:

```typescript
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
```

## Utilizando o middleware

Agora, basta substituirmos o middleware no app express:

```typescript
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
```

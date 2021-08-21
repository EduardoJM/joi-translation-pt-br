
# Celebrate Middleware

Esse exemplo tem por objetivo mostrar o uso desse pacote para a tradução das mensagens de erros de validação utilizando o **middleware** ((celebrate)[https://github.com/arb/celebrate]) para fazer as validações. O código desse exemplo está disponível em: [examples/celebrate](https://github.com/EduardoJM/joi-translation-pt-br/tree/main/examples/celebrate).

## Dependências

Primeiro, instale as dependências utilizadas:

```bash
yarn add express celebrate joi-translation-pt-br
```

Ou, com o npm:

```bash
npm install express celebrate joi-translation-pt-br
```

## TypeScript

Caso esteja trabalhando com **TypeScript**, é necessário ainda, instalar as bibliotecas **ts-node** e **@types/express** como dependências de desenvolvimento:

```bash
yarn add -D ts-node @types/express
```

Ou, com o npm:

```bash
npm install --save-dev ts-node @types/express
```

## Código

O código do exemplo é um servidor, extremamente simples, com a rota `/test` cuja validação exige um e-mail e uma senha no corpo:

```typescript
import express from 'express';
import { celebrate, errors, Joi } from 'celebrate';
import { messages } from 'joi-translation-pt-br';

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
```

Assim, fazendo requisições com dados não formatados corretamente, teremos respostas como a que segue abaixo:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "validation": {
    "body": {
      "source": "body",
      "keys": [
        "email",
        "password"
      ],
      "message": "\"email\" deve ser um e-mail válido. \"password\" é obrigatório"
    }
  }
}
```

É possível, ainda, customizar o middleware `errors()` do **celebrate** para customizar a resposta. Isso pode ser visto no exemplo [Celebrate Middleware Customizado](celebrate-custom.md).

# Tradução PT-BR para o Joi

![GitHub](https://img.shields.io/github/license/EduardoJM/joi-translation-pt-br)
![npm](https://img.shields.io/npm/dm/joi-translation-pt-br)
![npm](https://img.shields.io/npm/v/joi-translation-pt-br)
![GitHub issues](https://img.shields.io/github/issues-raw/EduardoJM/joi-translation-pt-br)

> :brazil: Pacote contendo mensagens de tradução para PT-BR das mensagens de erro de validação do pacote [Joi](https://joi.dev/) ("the most powerful schema description language and data validator for JavaScript").

## Motivação

Essa biblioteca foi motivada devido a necessidade de ter de desenvolver aplicações reais para usuários brasileiros. Tendo esse contexto, devolver mensagens de erros de validação em inglês adiciona uma dificuldade maior nos projetos. Portanto, uma biblioteca com as mensagens de tradução, torna-se útil.

## Instalando

É importante, antes de tudo, ressaltar que esse pacote não substitui o **Joi**. Ele é um complemento ao **Joi**. Portanto, tenha o **Joi** instalado na aplicação. Instale esse pacote usando o **yarn**:

```bash
yarn add joi-translation-pt-br
```

Ou com o **npm**:

```bash
npm install joi-translation-pt-br
```

## Exemplos de Uso

### Validando com schema

O exemplo abaixo encontra-se em `examples/schema`. 

```javascript
import Joi from 'joi';
import {messages} from 'joi-translation-pt-br';

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
```

Rodando o arquivo com o `ts-node`, tem-se no terminal a resposta:

```javascript
[
  {
    message: '"email" deve ser um e-mail válido',
    path: [ 'email' ],
    type: 'string.email',
    context: {...}
  }
]
```

### Celebrate Middleware

```javascript
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

Assim, fazendo requisições no formato errado, teremos a resposta:

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

É possível, também, customizar a resposta do middleware e isso pode ser feito de acordo com a documentação [aqui](https://eduardojm.github.io/joi-translation-pt-br/docs/usage-examples/celebrate-custom).

## Author

This package was created by [Eduardo Oliveira](https://github.com/eduardoJM/) with the help of the community (see [contributors](https://github.com/EduardoJM/joi-translation-pt-br/graphs/contributors)).

## License
[MIT License](https://github.com/EduardoJM/joi-translation-pt-br/blob/main/LICENSE) © [Eduardo Oliveira](http://eduardojm.github.io/)

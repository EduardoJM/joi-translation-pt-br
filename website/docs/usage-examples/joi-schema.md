
# Validação de Schemas

A forma mais simples de validação de dados com a biblioteca `joi` é utilizando o método `.validate` de objetos de schema. Veja o exemplo abaixo de como utilizar a validação, com a tradução das mensagens. O código-fonte do projeto de exemplo encontra-se em [examples/schema](https://github.com/EduardoJM/joi-translation-pt-br/tree/main/examples/schema).

```typescript
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

Rodando o arquivo com o `ts-node`, teremos, então, no terminal o resultado:

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

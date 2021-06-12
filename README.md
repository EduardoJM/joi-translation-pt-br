## 1 Motivação

Devido ao fato de ter de desenvolver aplicações para usuários reais brasileiros, essa é uma pequena biblioteca com a tradução das mensagens de erro de validação da biblioteca [Joi](https://joi.dev/). 

## 2 Usando

### 2.1 Instalando

É importante, antes de tudo, ressaltar que esse pacote não substitui o **Joi**. Ele é um complemento ao **Joi**. Portanto, tenha o **Joi** instalado na aplicação. Instale esse pacote usando o **yarn**:

```
yarn add joi-translation-pt-br
```

Ou com o **npm**:

```
npm install joi-translation-pt-br
```

### 2.2 Usando

O exemplo abaixo encontra-se em `demo\index.ts`. 

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

```js
[
  {
    message: '"email" deve ser um e-mail válido',
    path: [ 'email' ],
    type: 'string.email',
    context: {...}
  }
]
```

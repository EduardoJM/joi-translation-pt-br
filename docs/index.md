## Início

### Motivação

Devido a necessidades de desenvolver aplicações para usuários reais brasileiros, há a importância de se utilizar validações e, ainda, devolver mensagens de erros das validações compreensíveis para o usuário final. Tendo em vista essas questões, esse é um projeto\biblioteca com o objetivo de traduzir as mensagens de erro do [Joi](https://joi.dev/) para português do Brasil.

### Usando

#### Instalando

É importante, antes de tudo, ressaltar que essa biblioteca não substitui o **Joi** e deve ser instalada junto do mesmo. Sendo assim, instale, via **yarn**:
```bash
yarn add joi-translation-pt-br
```
ou, via **npm**:
```bash
npm install joi-translation-pt-br
```

#### Usando

O seguinte exemplo, presente em `demo/index.ts`, demonstra como alterar as mensagens de validação para as disponibilizadas pelo pacote:

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

Rodando o arquivo com o `ts-node` tem-se o seguinte resultado no terminal:

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

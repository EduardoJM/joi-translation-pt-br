"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[940],{2586:(e,a,s)=>{s.r(a),s.d(a,{contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>p,toc:()=>d});var n=s(8168),r=s(8587),o=(s(6540),s(5680)),t=["components"],l={},i="Celebrate Middleware",p={unversionedId:"usage-examples/celebrate",id:"usage-examples/celebrate",isDocsHomePage:!1,title:"Celebrate Middleware",description:"Esse exemplo tem por objetivo mostrar o uso desse pacote para a tradu\xe7\xe3o das mensagens de erros de valida\xe7\xe3o utilizando o middleware ((celebrate)https [examples/celebrate.",source:"@site/docs/usage-examples/celebrate.md",sourceDirName:"usage-examples",slug:"/usage-examples/celebrate",permalink:"/joi-translation-pt-br/docs/usage-examples/celebrate",editUrl:"https://github.com/EduardoJM/joi-translation-pt-br/edit/main/website/docs/usage-examples/celebrate.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Valida\xe7\xe3o de Schemas",permalink:"/joi-translation-pt-br/docs/usage-examples/joi-schema"},next:{title:"Celebrate Middleware Customizado",permalink:"/joi-translation-pt-br/docs/usage-examples/celebrate-custom"}},d=[{value:"Depend\xeancias",id:"depend\xeancias",children:[]},{value:"TypeScript",id:"typescript",children:[]},{value:"C\xf3digo",id:"c\xf3digo",children:[{value:"Customizando as Labels",id:"customizando-as-labels",children:[]}]}],m={toc:d};function c(e){var a=e.components,s=(0,r.A)(e,t);return(0,o.yg)("wrapper",(0,n.A)({},m,s,{components:a,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"celebrate-middleware"},"Celebrate Middleware"),(0,o.yg)("p",null,"Esse exemplo tem por objetivo mostrar o uso desse pacote para a tradu\xe7\xe3o das mensagens de erros de valida\xe7\xe3o utilizando o ",(0,o.yg)("strong",{parentName:"p"},"middleware")," ((celebrate)","[https://github.com/arb/celebrate]",") para fazer as valida\xe7\xf5es. O c\xf3digo desse exemplo est\xe1 dispon\xedvel em: ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/EduardoJM/joi-translation-pt-br/tree/main/examples/celebrate"},"examples/celebrate"),"."),(0,o.yg)("h2",{id:"depend\xeancias"},"Depend\xeancias"),(0,o.yg)("p",null,"Primeiro, instale as depend\xeancias utilizadas:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"yarn add express celebrate joi-translation-pt-br\n")),(0,o.yg)("p",null,"Ou, com o npm:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"npm install express celebrate joi-translation-pt-br\n")),(0,o.yg)("h2",{id:"typescript"},"TypeScript"),(0,o.yg)("p",null,"Caso esteja trabalhando com ",(0,o.yg)("strong",{parentName:"p"},"TypeScript"),", \xe9 necess\xe1rio ainda, instalar as bibliotecas ",(0,o.yg)("strong",{parentName:"p"},"ts-node")," e ",(0,o.yg)("strong",{parentName:"p"},"@types/express")," como depend\xeancias de desenvolvimento:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"yarn add -D ts-node @types/express\n")),(0,o.yg)("p",null,"Ou, com o npm:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"npm install --save-dev ts-node @types/express\n")),(0,o.yg)("h2",{id:"c\xf3digo"},"C\xf3digo"),(0,o.yg)("p",null,"O c\xf3digo do exemplo \xe9 um servidor, extremamente simples, com a rota ",(0,o.yg)("inlineCode",{parentName:"p"},"/test")," cuja valida\xe7\xe3o exige um e-mail e uma senha no corpo:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"import express from 'express';\nimport { celebrate, errors, Joi } from 'celebrate';\nimport { messages } from 'joi-translation-pt-br';\n\nconst ExampleValidation = celebrate({\n    body: Joi.object().keys({\n        email: Joi.string().required().email(),\n        password: Joi.string().required(),\n    }),\n}, {\n    abortEarly: false,\n    messages: messages,\n});\n\nconst app = express();\napp.use(express.json());\n\napp.post('/test', ExampleValidation, (req, res) => {\n    res.json();\n});\n\napp.use(errors());\napp.listen(3333);\n")),(0,o.yg)("p",null,"Assim, fazendo requisi\xe7\xf5es com dados n\xe3o formatados corretamente, teremos respostas como a que segue abaixo:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "statusCode": 400,\n  "error": "Bad Request",\n  "message": "Validation failed",\n  "validation": {\n    "body": {\n      "source": "body",\n      "keys": [\n        "email",\n        "password"\n      ],\n      "message": "\\"email\\" deve ser um e-mail v\xe1lido. \\"password\\" \xe9 obrigat\xf3rio"\n    }\n  }\n}\n')),(0,o.yg)("h3",{id:"customizando-as-labels"},"Customizando as Labels"),(0,o.yg)("p",null,"Perceba que temos nas mensagens os campos da seguinte forma: ",(0,o.yg)("inlineCode",{parentName:"p"},'\\"password\\"'),". Para customizarmos essas labels podemos utilizar o objeto ",(0,o.yg)("inlineCode",{parentName:"p"},'.label("Senha")')," da biblioteca Joi, conforme o exemplo abaixo:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-typescript"},"import express from 'express';\nimport { celebrate, errors, Joi } from 'celebrate';\nimport { messages } from 'joi-translation-pt-br';\n\nconst ExampleValidation = celebrate({\n    body: Joi.object().keys({\n        email: Joi.string().required().email().label(\"E-mail\"),\n        password: Joi.string().required().label(\"Senha\"),\n    }),\n}, {\n    abortEarly: false,\n    messages: messages,\n});\n\nconst app = express();\napp.use(express.json());\n\napp.post('/test', ExampleValidation, (req, res) => {\n    res.json();\n});\n\napp.use(errors());\napp.listen(3333);\n")),(0,o.yg)("p",null,"A partir desse exemplo, teremos mensagens como:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "statusCode": 400,\n  "error": "Bad Request",\n  "message": "Validation failed",\n  "validation": {\n    "body": {\n      "source": "body",\n      "keys": [\n        "email",\n        "password"\n      ],\n      "message": "\\"E-mail\\" deve ser um e-mail v\xe1lido. \\"Senha\\" \xe9 obrigat\xf3rio"\n    }\n  }\n}\n')),(0,o.yg)("p",null,"\xc9 poss\xedvel, ainda, customizar o middleware ",(0,o.yg)("inlineCode",{parentName:"p"},"errors()")," do ",(0,o.yg)("strong",{parentName:"p"},"celebrate")," para customizar a resposta. Isso pode ser visto no exemplo ",(0,o.yg)("a",{parentName:"p",href:"/joi-translation-pt-br/docs/usage-examples/celebrate-custom"},"Celebrate Middleware Customizado"),"."))}c.isMDXComponent=!0}}]);
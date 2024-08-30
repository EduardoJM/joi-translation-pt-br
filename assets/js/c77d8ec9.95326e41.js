"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[641],{3460:(e,r,a)=>{a.r(r),a.d(r,{contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>u,toc:()=>m});var o=a(8168),n=a(8587),t=(a(6540),a(5680)),s=["components"],i={},l="Celebrate Middleware Customizado",u={unversionedId:"usage-examples/celebrate-custom",id:"usage-examples/celebrate-custom",isDocsHomePage:!1,title:"Celebrate Middleware Customizado",description:"\xc9 poss\xedvel customizar a resposta do middleware celebrate para termos as mensagens de resposta de acordo com o que queremos. Para isso, precisamos criar uma nova fun\xe7\xe3o errors() que fa\xe7a o papel que a fun\xe7\xe3o errors() original faz. Esse c\xf3digo foi escrito tendo como base o original, dispon\xedvel no GitHub. Uma vers\xe3o pronta/funcional desse exemplo pode ser consultada em examples/celebratecustom.",source:"@site/docs/usage-examples/celebrate-custom.md",sourceDirName:"usage-examples",slug:"/usage-examples/celebrate-custom",permalink:"/joi-translation-pt-br/docs/usage-examples/celebrate-custom",editUrl:"https://github.com/EduardoJM/joi-translation-pt-br/edit/main/website/docs/usage-examples/celebrate-custom.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Celebrate Middleware",permalink:"/joi-translation-pt-br/docs/usage-examples/celebrate"}},m=[{value:"Introdu\xe7\xe3o",id:"introdu\xe7\xe3o",children:[]},{value:"Criando o middleware",id:"criando-o-middleware",children:[]},{value:"Utilizando o middleware",id:"utilizando-o-middleware",children:[]}],p={toc:m};function c(e){var r=e.components,a=(0,n.A)(e,s);return(0,t.yg)("wrapper",(0,o.A)({},p,a,{components:r,mdxType:"MDXLayout"}),(0,t.yg)("h1",{id:"celebrate-middleware-customizado"},"Celebrate Middleware Customizado"),(0,t.yg)("p",null,"\xc9 poss\xedvel customizar a resposta do middleware celebrate para termos as mensagens de resposta de acordo com o que queremos. Para isso, precisamos criar uma nova fun\xe7\xe3o ",(0,t.yg)("inlineCode",{parentName:"p"},"errors()")," que fa\xe7a o papel que a fun\xe7\xe3o ",(0,t.yg)("inlineCode",{parentName:"p"},"errors()")," original faz. Esse c\xf3digo foi escrito tendo como base o original, dispon\xedvel no ",(0,t.yg)("a",{parentName:"p",href:"https://github.com/arb/celebrate/blob/master/lib/celebrate.js#L180"},"GitHub"),". Uma vers\xe3o pronta/funcional desse exemplo pode ser consultada em ",(0,t.yg)("a",{parentName:"p",href:"https://github.com/EduardoJM/joi-translation-pt-br/tree/main/examples/celebrate_custom"},"examples/celebrate_custom"),". "),(0,t.yg)("p",null,"O primeiro ponto que precisamos tratar aqui \xe9 como o retorno ser\xe1 feito: quando fizermos uma chamada ",(0,t.yg)("inlineCode",{parentName:"p"},"POST")," para ",(0,t.yg)("inlineCode",{parentName:"p"},"/test")," com dados incompletos, teremos um retorno estruturado da seguinte forma, onde os erros s\xe3o estruturados de acordo com o path retornado pela biblioteca Joi:"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-json"},'{\n    "email": "\\"E-mail\\" deve ser um e-mail v\xe1lido",\n    "password": "\\"Senha\\" \xe9 obrigat\xf3rio",\n    "items": {\n        "0": {\n            "price": "\\"Pre\xe7o\\" \xe9 obrigat\xf3rio"\n        },\n        "1": {\n            "name": "\\"Nome\\" \xe9 obrigat\xf3rio",\n            "price": "\\"Pre\xe7o\\" \xe9 obrigat\xf3rio"\n        }\n    }\n}\n')),(0,t.yg)("h2",{id:"introdu\xe7\xe3o"},"Introdu\xe7\xe3o"),(0,t.yg)("p",null,"Primeiro, se estiver usando ",(0,t.yg)("strong",{parentName:"p"},"TypeScript")," \xe9 importante adicionar o seguinte item dentro das configura\xe7\xf5es de compila\xe7\xe3o do arquivo ",(0,t.yg)("inlineCode",{parentName:"p"},"tsconfig.json"),":"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-json"},'{\n    //...\n    "compilerOptions": {\n        //...\n        "downlevelIteration": true,\n        //...\n    }\n    //...\n}\n')),(0,t.yg)("p",null,"Isso \xe9 apenas para o formato de itera\xe7\xe3o que utilizamos aqui (o mesmo do c\xf3digo original do celebrate). Voc\xea \xe9 livre para fazer isso de outra forma e, inclusive, caso queira, modificar essa documenta\xe7\xe3o de forma a melhorar essa quest\xe3o."),(0,t.yg)("h2",{id:"criando-o-middleware"},"Criando o middleware"),(0,t.yg)("p",null,"Vamos criar um middleware que processe os dados retornados pela lib Joi e construa objetos com o ",(0,t.yg)("inlineCode",{parentName:"p"},"path")," e a ",(0,t.yg)("inlineCode",{parentName:"p"},"message")," e que, posteriormente, fa\xe7a um ",(0,t.yg)("em",{parentName:"p"},"deep merge")," para isso. Primeiro, algumas fun\xe7\xf5es utilit\xe1rias, como o ",(0,t.yg)("inlineCode",{parentName:"p"},"mergeDeep()"),":"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-typescript"},"import express, { Request, Response, NextFunction } from 'express';\nimport { celebrate, Joi, isCelebrateError } from 'celebrate';\nimport { messages } from '../../src';\n\nfunction customErrors() {\n    const buildObjWithValue = (paths: string[], value = '') => {\n        return paths.reduceRight((acc, item, index) => ({\n            [item]: index === paths.length - 1\n                ? value\n                : acc\n        }), {});\n    }\n\n    const isObject = (item: any) => {\n        return (item && typeof item === 'object' && !Array.isArray(item));\n    }\n      \n    const mergeDeep = (target: any, source: any) => {\n        let output = Object.assign({}, target);\n        if (isObject(target) && isObject(source)) {\n            Object.keys(source).forEach(key => {\n                if (isObject(source[key])) {\n                    if (!(key in target)) {\n                        Object.assign(output, { [key]: source[key] });\n                    } else {\n                        output[key] = mergeDeep(target[key], source[key]);\n                    }\n                } else {\n                    Object.assign(output, { [key]: source[key] });\n                }\n            });\n        }\n        return output;\n    }\n\n    // middleware aqui\n}\n")),(0,t.yg)("p",null,"O middleware, de fato \xe9 bem pequeno e pode ser resumido a:"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-typescript"},"return (error: any, req: Request, res: Response, next: NextFunction) => {\n    if (!isCelebrateError(error)) {\n        return next(error);\n    }\n    // is a celebrate error\n    let data = {};\n    for (const [segment, joiError] of error.details.entries()) {\n        joiError.details.forEach((err) => {\n            const obj = buildObjWithValue(err.path.map((item) => item.toString()), err.message);\n            data = mergeDeep(data, obj);\n        });\n    }\n    return res.status(400).json(data);\n};\n")),(0,t.yg)("p",null,"O c\xf3digo acima deve ser juntado ao anterior:"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-typescript"},"import express, { Request, Response, NextFunction } from 'express';\nimport { celebrate, Joi, isCelebrateError } from 'celebrate';\nimport { messages } from '../../src';\n\nfunction customErrors() {\n    const buildObjWithValue = (paths: string[], value = '') => {\n        return paths.reduceRight((acc, item, index) => ({\n            [item]: index === paths.length - 1\n                ? value\n                : acc\n        }), {});\n    }\n\n    const isObject = (item: any) => {\n        return (item && typeof item === 'object' && !Array.isArray(item));\n    }\n      \n    const mergeDeep = (target: any, source: any) => {\n        let output = Object.assign({}, target);\n        if (isObject(target) && isObject(source)) {\n            Object.keys(source).forEach(key => {\n                if (isObject(source[key])) {\n                    if (!(key in target)) {\n                        Object.assign(output, { [key]: source[key] });\n                    } else {\n                        output[key] = mergeDeep(target[key], source[key]);\n                    }\n                } else {\n                    Object.assign(output, { [key]: source[key] });\n                }\n            });\n        }\n        return output;\n    }\n\n    return (error: any, req: Request, res: Response, next: NextFunction) => {\n        if (!isCelebrateError(error)) {\n            return next(error);\n        }\n        // is a celebrate error\n        let data = {};\n        for (const [segment, joiError] of error.details.entries()) {\n            joiError.details.forEach((err) => {\n                const obj = buildObjWithValue(err.path.map((item) => item.toString()), err.message);\n                data = mergeDeep(data, obj);\n            });\n        }\n        return res.status(400).json(data);\n    };\n}\n")),(0,t.yg)("h2",{id:"utilizando-o-middleware"},"Utilizando o middleware"),(0,t.yg)("p",null,"Agora, basta substituirmos o middleware no app express:"),(0,t.yg)("pre",null,(0,t.yg)("code",{parentName:"pre",className:"language-typescript"},'const ExampleValidation = celebrate({\n    body: Joi.object().keys({\n        email: Joi.string().required().email().label("E-mail"),\n        password: Joi.string().required().label("Senha"),\n        items: Joi.array().items(Joi.object().keys({\n            name: Joi.string().required().label("Nome"),\n            price: Joi.number().min(1).max(50).required().label("Pre\xe7o"),\n        }))\n    }),\n}, {\n    abortEarly: false,\n    messages: messages,\n});\n\nconst app = express();\napp.use(express.json());\n\napp.post(\'/test\', ExampleValidation, (req, res) => {\n    res.json();\n});\n\napp.use(customErrors());\napp.listen(3333);\n')))}c.isMDXComponent=!0}}]);
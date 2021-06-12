const messages = {
    'any.custom': '{{#label}} falhou na validação devido a {{#error.message}}',
    'any.default': '{{#label}} gerou um erro ao executar o método default',
    'any.failover': '{{#label}} gerou um erro ao executar o método failover',
    'any.invalid': '{{#label}} contém um valor inválido',
    'any.only': '{{#label}} deve ser {if(#valids.length == 1, "", "um dos ")}{{#valids}}',
    'any.ref': '{{#label}} {{#arg}} referência {{:#ref}} que {{#reason}}',
    'any.required': '{{#label}} é obrigatório',
    'any.unknown': '{{#label}} não é permitido',
};

export default messages;

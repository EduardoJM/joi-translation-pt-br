const messages = {
    'object.and': '{{#label}} contém {{#presentWithLabels}} sem seus pares necessários {{#missingWithLabels}}',
    'object.assert': '{{#label}} não é válido devido a {if(#subject.key, `"` + #subject.key + `" falhou em ` + (#message || "passar no teste de validação"), #message || "a validação falhou")}',
    'object.base': '{{#label}} deve ser do tipo {{#type}}',
    'object.instance': '{{#label}} deve ser uma instância de {{:#type}}',
    'object.length': '{{#label}} deve ter {{#limit}} entrada{if(#limit == 1, "", "s")}',
    'object.max': '{{#label}} deve ter no máximo {{#limit}} entrada{if(#limit == 1, "", "s")}',
    'object.min': '{{#label}} deve ter pelo menos {{#limit}} entrada{if(#limit == 1, "", "s")}',
    'object.missing': '{{#label}} deve conter pelo menos um de {{#peersWithLabels}}',
    'object.nand': '{{:#mainWithLabel}} não deve existir simultaneamente com {{#peersWithLabels}}',
    'object.oxor': '{{#label}} contem um conflito entre pares opcionais exlusivos {{#peersWithLabels}}',
    'object.pattern.match': '{{#label}} entradas falharam em se adequar aos padrões pedidos',
    'object.refType': '{{#label}} deve ser uma referência do Joi',
    'object.regex': '{{#label}} deve ser um objeto RegExp',
    'object.rename.multiple': '{{#label}} não pode renomear {{:#from}} pois renomear multiplas entradas esta desabilitado e outra chave já foi renomeada para {{:#to}}',
    'object.rename.override': '{{#label}} não pode renomear {{:#from}} pois sobrescrever está desabilitado e o destino {{:#to}} existe',
    'object.schema': '{{#label}} deve ser um schema Joi do tipo {{#type}}',
    'object.unknown': '{{#label}} não é permitido',
    'object.with': '{{:#mainWithLabel}} falta par obrigatório {{:#peerWithLabel}}',
    'object.without': '{{:#mainWithLabel}} conflita com par proibido {{:#peerWithLabel}}',
    'object.xor': '{{#label}} contém um conflito entre pares exclusivos {{#peersWithLabels}}',
};

export default messages;

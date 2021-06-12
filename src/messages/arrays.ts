const messages = {
    'array.base': '{{#label}} deve ser um array',
    'array.excludes': '{{#label}} contém um valor excluído',
    'array.hasKnown': '{{#label}} não contem nenhum padrão necessário para o tipo {:#patternLabel}',
    'array.hasUnknown': '{{#label}} não contem nenhum padrão necessário',
    'array.includes': '{{#label}} não é compatível com nenhum dos tipos permitidos',
    'array.includesRequiredBoth': '{{#label}} não contém {{#knownMisses}} e outro(s) valor(es) {{#unknownMisses}} obrigatórios',
    'array.includesRequiredKnowns': '{{#label}} não contém {{#knownMisses}}',
    'array.includesRequiredUnknowns': '{{#label}} não contém o(s) valor(es) {{#unknownMisses}} obrigatórios',
    'array.length': '{{#label}} deve conter {{#limit}} itens',
    'array.max': '{{#label}} deve conter no máximo {{#limit}} itens',
    'array.min': '{{#label}} deve conter pelo menos {{#limit}} itens',
    'array.orderedLength': '{{#label}} deve conter pelo menos {{#limit}} itens',
    'array.sort': '{{#label}} deve ser ordenado em {#order} por {{#by}}',
    'array.sort.mismatching': '{{#label}} não pode ser ordenado devido a tipos incompatíveis',
    'array.sort.unsupported': '{{#label}} não pode ser ordenado devido ao tipo não suportado: {#type}',
    'array.sparse': '{{#label}} não deve ser um item não definido',
    'array.unique': '{{#label}} contém um item duplicado',
};

export default messages;

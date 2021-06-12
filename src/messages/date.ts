const messages = {
    'date.base': '{{#label}} deve ser uma data válida.',
    'date.format': '{{#label}} deve estar no formato: {msg("date.format." + #format) || #format}',
    'date.greater': '{{#label}} deve ser maior que {{:#limit}}',
    'date.less': '{{#label}} deve ser menor que {{:#limit}}',
    'date.max': '{{#label}} deve ser menor que ou igual a {{:#limit}}',
    'date.min': '{{#label}} deve ser maior que ou igual a {{:#limit}}',

    // Messages used in date.format

    'date.format.iso': 'data ISO 8601',
    'date.format.javascript': 'timestamp ou número de milisegundos',
    'date.format.unix': 'timestamp ou número de segundos',
};

export default messages;

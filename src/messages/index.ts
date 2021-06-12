import alternatives from './alternatives';
import any from './any';
import arrays from './arrays';
import binary from './binary';
import boolean from './boolean';
import date from './date';
import functions from './functions';
import keys from './keys';
import number from './number';
import string from './string';
import symbol from './symbol';

const messages = {
    ...alternatives,
    ...any,
    ...arrays,
    ...binary,
    ...boolean,
    ...date,
    ...functions,
    ...keys,
    ...number,
    ...string,
    ...symbol,
};

export default messages;

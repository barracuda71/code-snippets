export const MAX_NINE_MASK = /^[1-9]:?[0-5]?[0-9]?[AaPp]?M?$/;
const maxNineMaskParts = [
    /[1-9]/,
    /[0-5]/,
    /[0-9]/,
    /[AaPp]/,
    /M/,
];
export const DECIMAL_NINE_MASK = /^1[0-2]:?([0-5][0-9])?[AaPp]?M?$/;
const decimalMaskParts = [
    /1/,
    /[0-2]/,
    /[0-5]/,
    /[0-9]/,
    /[AaPp]/,
    /M/,
];

export enum Time12HoursMask {
    MaxNine = 'MaxNine',
    Decimal = 'Decimal',
}

const maskPartsByType: Record<Time12HoursMask, RegExp[]> = {
    [Time12HoursMask.MaxNine]: maxNineMaskParts,
    [Time12HoursMask.Decimal]: decimalMaskParts,
};

export const getActualMask = (value: string): Time12HoursMask => {
    let cutValue = value;
    while (cutValue.length > 0){
        if (DECIMAL_NINE_MASK.test(cutValue)) {
            return Time12HoursMask.Decimal;
        }
        if (MAX_NINE_MASK.test(cutValue)) {
            return Time12HoursMask.MaxNine;
        }
        cutValue = cutValue.slice(0, cutValue.length - 1);
    }
    return Time12HoursMask.MaxNine;
};

export const cleanValueByMask = (value: string) => {
    let result = tryFillWithZeroes(value);
    let i = 0;
    const maskName = getActualMask(result);
    while (i < result.length) {
        let nextResult = result;
        const mask = maskPartsByType[maskName];
        if (mask[i] && !mask[i].test(result[i])) {
            nextResult = result.slice(0, i) + result.slice(i + 1);
        }
        if (result === nextResult) {
            i += 1;
        }
        result = nextResult;
    }
    return result;
};

export const HOURS_ONLY = /^((1[0-2])|[1-9])[AaPp]M?/;
const tryFillWithZeroes = (value: string) => {
    const valueToUpper = value.toUpperCase();
    if (HOURS_ONLY.test(value)){
        if (valueToUpper.includes('A')){
            return valueToUpper.replace('A', '00A');
        }
        if (valueToUpper.includes('P')){
            return valueToUpper.replace('P', '00P');
        }
    }
    return value;
};

export const timeFormat = (value: string, previousValue: string | null = null) => {
    const maskCharRegexp = /[_]/;
    const refuse = /[^\dAaPpM:]/gi;
    let result = '';
    const minusRefused = value.replace(refuse, '');

    const helpers = /[:PpAa]/;
    const hasHelpers = helpers.test(minusRefused);
    const ambiguous = /^1([0-2]?|([0-2][0-5]))?$/; //not clear 1:05 or 10:5
    if (!hasHelpers && ambiguous.test(minusRefused)){
        return minusRefused; //ambiguous to format;
    }

    const cleaned = cleanValueByMask(minusRefused);
    if (ambiguous.test(cleaned)){
        return cleaned; //10:4__ should be unformated back into 104 after removing 3 from 10:43
    }
    const maskType = getActualMask(cleaned);

    if (cleaned === '') {
        return cleaned;
    }
    const mask = maskType === Time12HoursMask.MaxNine ? '_:____' : '__:____';

    let i = 0;
    let n = 0;
    while (i < mask.length) {
        const maskChar = mask[i];
        if (maskCharRegexp.test(maskChar) && n < cleaned.length) {
            const parsedChar = cleaned[n].toUpperCase();
            if (['A', 'P'].includes(parsedChar)) {
                if (value + 'M' === previousValue) { // M was deleted intentionally
                    // not adding A/P
                    i -= 1;
                } else {
                    result += parsedChar + 'M';
                    // move iterator one symbol next due to automatic adding 'M'
                    i += 1;
                }
            } else {
                result += parsedChar;
            }
            n += 1;
        } else {
            result += maskChar;
        }
        i += 1;
    }
    return result;
};

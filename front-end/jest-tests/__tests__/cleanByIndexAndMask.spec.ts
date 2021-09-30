import { cleanValueByMask, getActualMask, Time12HoursMask, timeFormat } from '../cleanByIndexAndMask';

describe('cleanByIndexAndMask', () => {
    const getMessage = (expected: string, value: string) => `Result value should be ${expected} for input value ${value}`;
    const options = [
        ['000', ''],
        ['020', '20'],
        ['1', '1'],
        ['200', '200'],
        ['600', '600'],
        ['900', '900'],
        ['120', '120'],
        ['1200', '1200'],
        ['1250', '1250'],
        ['127', '127'],
        ['197', '1'],
        ['1279', '127'],
        ['1270', '127'],
        ['1300', '130'],
        ['2100', '210'],
        ['2950', '250'],
        ['2970', '20'],
    ];

    it.each(options)('check cleaning', (value, expected) => {
        expect(cleanValueByMask(value), getMessage(expected, value)).toBe(expected);
    });
});

describe('getActualMask', () => {
    const getMessage = (expected: string, value: string) => `Result value should be ${expected} for input value ${value}`;
    const options = [
        ['0', Time12HoursMask.MaxNine],
        ['1', Time12HoursMask.MaxNine],
        ['2', Time12HoursMask.MaxNine],
        ['6', Time12HoursMask.MaxNine],
        ['9', Time12HoursMask.MaxNine],
        ['A', Time12HoursMask.MaxNine],
        ['P', Time12HoursMask.MaxNine],
        ['a', Time12HoursMask.MaxNine],
        ['p', Time12HoursMask.MaxNine],
        ['c', Time12HoursMask.MaxNine],
        ['Y', Time12HoursMask.MaxNine],
        ['11', Time12HoursMask.Decimal],
        ['12', Time12HoursMask.Decimal],
        ['23', Time12HoursMask.MaxNine],
        ['13', Time12HoursMask.MaxNine],
        ['15', Time12HoursMask.MaxNine],
        ['16', Time12HoursMask.MaxNine],
        ['76', Time12HoursMask.MaxNine],
        ['', Time12HoursMask.MaxNine],
        ['122', Time12HoursMask.MaxNine],
        ['127', Time12HoursMask.MaxNine],
        ['1270', Time12HoursMask.MaxNine],
        ['1222', Time12HoursMask.Decimal],
        ['1239', Time12HoursMask.Decimal],
        ['1282', Time12HoursMask.MaxNine],
        ['122A', Time12HoursMask.MaxNine],
        ['152P', Time12HoursMask.MaxNine],
        ['10373', Time12HoursMask.Decimal],
        ['1234', Time12HoursMask.Decimal],
    ];

    it.each(options)('check getActualMask', (value, expected) => {
        expect(getActualMask(value), getMessage(expected, value)).toBe(expected);
    });
});

describe('timeFormat', () => {
    const getMessage = (expected: string, value: string) => `Result value should be ${expected} for input value ${value}`;
    const options = [
        ['0', ''],
        ['1', '1'], //ambiguous to format
        ['9', '9:____'],
        ['12', '12'], //ambiguous to format
        ['123', '123'], //ambiguous to format
        ['1237', '12:37__'],
        ['1012', '10:12__'],
        ['107', '1:07__'],
        ['1078', '1:07__'],
        ['2072', '2:07__'],
        ['10373', '10:37__'],
        ['10873', '1:08__'],
        ['1234', '12:34__'],
        ['1:234_', '123'],
        ['1:234P', '1:23PM'],
        ['1:23PM', '1:23PM'],
        ['1:227A', '1:22AM'],
        ['1:227B', '122'],
        ['1227P', '12:27PM'],
        ['1227p', '12:27PM'],
        ['1:29A', '1:29AM'],
        ['1:29a', '1:29AM'],
        ['2:15P', '2:15PM'],
        ['21P', '2:1___'],
        ['37A', '3:____'],
    ];

    it.each(options)('check formating by mask', (value, expected) => {
        expect(timeFormat(value), getMessage(expected, value)).toBe(expected);
    });
});

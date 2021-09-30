import React from 'react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import { Time12HoursKeyboardInput } from '../Time12HoursKeyboardInput';

describe('Time12HoursKeyboardInput', () => {
    let input: HTMLInputElement;

    beforeEach(() => {
        const { getByTestId } = render(<Time12HoursKeyboardInput name="time"/>);
        input = getByTestId('time-12-hours-input') as HTMLInputElement;
    });

    const getMessage = (val: string) => `Inputted value ${val}`;

    const inputOptions = [
        ['1', '1'], //ambiguous to format
        ['12', '12'], //ambiguous to format
        ['19', '1'],
        ['123', '123'], //ambiguous to format
        ['1237', '12:37__'],
        ['12379', '12:37__'],
        ['1279', '1:27__'],
        ['1200p', '12:00PM'],
        ['129a', '1:29AM'],
        ['145P', '1:45PM'],
        ['925A', '9:25AM'],
        ['1025A', '10:25AM'],
    ];

    it.each(inputOptions)('Input working correctly', (inputString, result) => {
        fireEvent(
            input,
            createEvent.input(input, {
                target: { value: inputString },
            }),
        );
        expect(input.value, getMessage(inputString)).toBe(result);
    });
});

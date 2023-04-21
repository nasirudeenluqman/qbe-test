import { renderHook } from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';
import { useDateOfBirthForm } from './use-date-of-birth-form';
import { act } from 'react-dom/test-utils';

const setup = () => renderHook(() => useDateOfBirthForm());

describe('useDateOfBirthForm', () => {
    it('should return default values', () => {
        const { result } = setup()
        expect(result.current.dateOfBirth).toEqual('');
        expect(result.current.errorMessage).toEqual('');
        expect(result.current.isValid).toEqual(false);
        expect(result.current.age).toEqual(undefined);
    })

    it('should able to change date of birth', () => {
        const { result } = setup()

        act(() =>
            result.current.handleChange({
                target: { value: '2023-01-01' },
            } as ChangeEvent<HTMLInputElement>),
        );

        expect(result.current.dateOfBirth).toEqual('2023-01-01');
        expect(result.current.errorMessage).toEqual('');
        expect(result.current.isValid).toEqual(true);
    })

    it('should show error message when invalid date is typed', () => {
        const { result } = setup()
        expect(result.current.isValid).toEqual(false);
        act(() =>
            result.current.handleChange({
                target: { value: '20-01-01' },
            } as ChangeEvent<HTMLInputElement>),
        );
        act(() =>
            result.current.handleBlur(),
        );

        expect(result.current.dateOfBirth).toEqual('20-01-01');
        expect(result.current.errorMessage).toEqual('Please enter a valid date');
        expect(result.current.isValid).toEqual(false);
    })

    it('should show error message when future date is typed', () => {
        const { result } = setup()
        expect(result.current.isValid).toEqual(false);
        expect(result.current.errorMessage).toEqual('');

        let todayDate = new Date()
        todayDate.setDate(todayDate.getDate() + 1);
        // Tomorrow's date
        const futureDate = todayDate.toISOString()

        act(() =>
            result.current.handleChange({
                target: { value: futureDate },
            } as ChangeEvent<HTMLInputElement>),
        );
        act(() =>
            result.current.handleBlur(),
        );

        expect(result.current.dateOfBirth).toEqual(futureDate);
        expect(result.current.errorMessage).toEqual('Date cannot be future date');
        expect(result.current.isValid).toEqual(false);
    })

    it('should be able to calculate age', () => {
        const { result } = setup()
        const event = {
            preventDefault() {
                jest.fn();
            },
        } as React.FormEvent<HTMLFormElement>
        expect(result.current.isValid).toEqual(false);
        let days = 10;
        let todayDate = new Date()
        todayDate.setDate(todayDate.getDate() - days);
        //Date of birth 10 days ago
        const dateOfBirth = todayDate.toISOString()

        act(() =>
            result.current.handleChange({
                target: { value: dateOfBirth },
            } as ChangeEvent<HTMLInputElement>),
        );
        act(() =>
            result.current.handleSubmit(event),
        );

        expect(result.current.dateOfBirth).toEqual(dateOfBirth);
        expect(result.current.isValid).toEqual(true);
        expect(result.current.age).toEqual({ years: 0, months: 0, days: days });
    })
})
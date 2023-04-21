import { validateDateOfBirth, calculateAge } from './date-of-birth-utils'

describe('date-of-birth-utils', () => {

    describe('validateDateOfBirth', () => {
        it('should return the right message if date is empty', () => {
            expect(validateDateOfBirth('')).toBe('Please enter a valid date');
        })

        it('should return the right message if date is invalid', () => {
            expect(validateDateOfBirth('2023-444-333')).toBe('Please enter a valid date');
        })

        it('should return the right message if date is a future date', () => {

            expect(validateDateOfBirth('2030-01-01')).toBe('Date cannot be future date');
        })
    })
    describe('calculateAge', () => {
        it('should return 0 years, 0 months and 0 days when today date is passed', () => {
            const todayDate = new Date().toISOString()
            expect(calculateAge(todayDate)).toEqual({ years: 0, months: 0, days: 0 });
        })

        it.each([
            27, 28, 18, 11, 9, 5, 4, 3, 2, 1
        ])('should return correct number of 0 years, 0 months and 0 days', (days) => {
            let todayDate = new Date()

            todayDate.setDate(todayDate.getDate() - days);
            const dateOfBirth = todayDate.toISOString()
            expect(calculateAge(dateOfBirth)).toEqual({ years: 0, months: 0, days: days });
        });
    })
})
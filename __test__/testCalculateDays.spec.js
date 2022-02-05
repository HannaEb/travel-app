import { calcDays } from '../src/client/js/calculateDays'

describe('Testing the calculate functionality', () => {
    test('Testing the calcDays() function', () => {
        expect(calcDays('2022-02-06', '2022-02-10')).toBe(5);
    })
})

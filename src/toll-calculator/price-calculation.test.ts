import { calculateTotalFee, getTimePrice } from './price-calculation'

describe('index-price', () => {
    test('should return max cost for multiple tolls in the same hour', () => {
        expect(
            calculateTotalFee([
                new Date('2021-09-20T06:24:00'),
                new Date('2021-09-20T06:35:00'),
            ]),
        ).toBe(13)
        expect(
            calculateTotalFee([
                new Date('2024-05-02T07:24:00'),
                new Date('2024-05-02T07:25:00'),
                new Date('2024-05-02T07:26:00'),
                // 18
                new Date('2024-05-02T15:27:00'),
                new Date('2024-05-02T15:45:00'),
                // 18
                new Date('2024-05-02T18:03:00'),
                // 13
            ]),
        ).toBe(49)
    })

    test('should not exceed max cost for an entire day', () => {
        expect(
            calculateTotalFee([
                new Date('2024-05-02T06:01:00'),
                new Date('2024-05-02T07:02:00'),
                new Date('2024-05-02T08:03:00'),
                new Date('2024-05-02T09:04:00'),
                new Date('2024-05-02T10:05:00'),
                new Date('2024-05-02T11:06:00'),
                new Date('2024-05-02T12:07:00'),
                new Date('2024-05-02T13:08:00'),
                new Date('2024-05-02T14:09:00'),
                new Date('2024-05-02T15:10:00'),
                new Date('2024-05-02T16:11:00'),
                new Date('2024-05-02T17:12:00'),
            ]),
        ).toBe(60)
    })

    test('should return expected values for all times of day', () => {
        expect(getTimePrice(new Date('2024-02-05T03:00:00'))).toBe(0)
        expect(getTimePrice(new Date('2024-02-05T04:00:00'))).toBe(0)
        expect(getTimePrice(new Date('2024-02-05T05:00:00'))).toBe(0)
        expect(getTimePrice(new Date('2024-02-05T06:00:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T06:29:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T06:30:00'))).toBe(13)
        expect(getTimePrice(new Date('2024-02-05T06:59:00'))).toBe(13)
        expect(getTimePrice(new Date('2024-02-05T07:00:00'))).toBe(18)
        expect(getTimePrice(new Date('2024-02-05T08:00:00'))).toBe(13)
        expect(getTimePrice(new Date('2024-02-05T08:29:00'))).toBe(13)
        expect(getTimePrice(new Date('2024-02-05T08:30:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T08:59:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T09:00:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T10:00:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T11:00:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T12:00:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T13:00:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T14:00:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T15:00:00'))).toBe(13)
        expect(getTimePrice(new Date('2024-02-05T15:29:00'))).toBe(13)
        expect(getTimePrice(new Date('2024-02-05T15:30:00'))).toBe(18)
        expect(getTimePrice(new Date('2024-02-05T15:59:00'))).toBe(18)
        expect(getTimePrice(new Date('2024-02-05T16:00:00'))).toBe(13)
        expect(getTimePrice(new Date('2024-02-05T17:00:00'))).toBe(18)
        expect(getTimePrice(new Date('2024-02-05T18:00:00'))).toBe(13)
        expect(getTimePrice(new Date('2024-02-05T18:29:00'))).toBe(13)
        expect(getTimePrice(new Date('2024-02-05T18:30:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T18:59:00'))).toBe(8)
        expect(getTimePrice(new Date('2024-02-05T19:00:00'))).toBe(0)
        expect(getTimePrice(new Date('2024-02-05T20:00:00'))).toBe(0)
        expect(getTimePrice(new Date('2024-02-05T21:00:00'))).toBe(0)
        expect(getTimePrice(new Date('2024-02-05T22:00:00'))).toBe(0)
        expect(getTimePrice(new Date('2024-02-05T23:00:00'))).toBe(0)
    })
})

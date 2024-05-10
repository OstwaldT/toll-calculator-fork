import { getTollFee } from '.'
import { VehicleType } from '../utils/vehicle'

describe('Toll Calculator', () => {
    const datesWithCost8 = [
        new Date('2022-01-20T06:04:00'),
        new Date('2022-01-20T06:05:00'),
    ]
    const datesWithoutCost = [
        new Date('2023-09-20T02:04:00'),
        new Date('2023-09-20T20:05:00'),
    ]

    test('should return 0 for 0 dates', () => {
        expect(getTollFee(VehicleType.Car, [])).toBe(0)
    })

    test('should return a cost for dates with cost', () => {
        expect(getTollFee(VehicleType.Car, datesWithCost8)).toBeGreaterThan(0)
    })

    test('should return a cost for dates in non chronological order', () => {
        expect(
            getTollFee(VehicleType.Car, [
                new Date('2022-01-20T06:06:00'),
                new Date('2022-01-20T06:05:00'),
                new Date('2022-01-20T06:04:00'),
            ]),
        ).toBeGreaterThan(0)
    })

    test('should return 0 for dates with no cost', () => {
        expect(getTollFee(VehicleType.Car, datesWithoutCost)).toBe(0)
    })

    test('should throw error for invalid dates', () => {
        expect(() =>
            getTollFee(VehicleType.Car, [new Date('invalid')]),
        ).toThrow()
        expect(() =>
            getTollFee(VehicleType.Car, [
                new Date('2022-01-20T06:04:00'),
                new Date('invalid'),
            ]),
        ).toThrow()
        expect(() =>
            getTollFee(VehicleType.Car, [
                new Date('2022-01-20T06:04:00'),
                new Date('2022-01-21T06:04:00'),
            ]),
        ).toThrow()
    })

    test('should differentiate between vehicleTypes', () => {
        expect(getTollFee(VehicleType.Car, datesWithCost8)).toBeGreaterThan(0)
        expect(getTollFee(VehicleType.Motorbike, datesWithCost8)).toBe(0)
    })

    test('should return 8 for 1 early toll', () => {
        expect(
            getTollFee(VehicleType.Car, [new Date('2021-09-20T06:04:00')]),
        ).toBe(8)
    })

    test('should return 0 for holidays', () => {
        expect(
            getTollFee(VehicleType.Car, [new Date('2024-01-01T08:01:01')]),
        ).toBe(0)
    })

    test('should return 0 for weekends', () => {
        expect(
            getTollFee(VehicleType.Car, [new Date('2024-05-04T08:01:01')]),
        ).toBe(0)
    })

    test('should return 0 for toll exempt vehicles', () => {
        expect(getTollFee(VehicleType.Motorbike, datesWithCost8)).toBe(0)
        expect(getTollFee(VehicleType.Tractor, datesWithCost8)).toBe(0)
        expect(getTollFee(VehicleType.Emergency, datesWithCost8)).toBe(0)
        expect(getTollFee(VehicleType.Diplomat, datesWithCost8)).toBe(0)
        expect(getTollFee(VehicleType.Foreign, datesWithCost8)).toBe(0)
    })
})

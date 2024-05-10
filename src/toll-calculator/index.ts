import Holidays from 'date-holidays'
import { TollExemptVehicles, VehicleType } from '../utils/vehicle'
import { calculateTotalFee } from './price-calculation'

export function getTollFee(
    vehicleType: VehicleType,
    raw_dates: Date[],
): number {
    const dates = validateAndSortDates([...raw_dates])

    if (dates.length === 0) {
        return 0
    }
    if (TollExemptVehicles.includes(vehicleType)) {
        return 0
    }
    if (isTollFreeDate(dates[0])) {
        return 0
    }

    return calculateTotalFee(dates)
}

function validateAndSortDates(dates: Date[]): Date[] {
    if (dates.length === 0) {
        return dates
    }
    for (const date of dates) {
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date' + date)
        }
    }
    const dateString = (d: Date) =>
        `${d.getFullYear()},${d.getMonth()},${d.getDate()}`
    const firstDate = dateString(dates[0])
    if (!dates.every(date => dateString(date) === firstDate)) {
        throw new Error('Dates must be on the same day')
    }
    dates.sort((a, b) => a.getTime() - b.getTime())
    return dates
}

const holidays = new Holidays('SE')

function isTollFreeDate(date: Date) {
    // weekends are free
    if (date.getDay() === 0 || date.getDay() === 6) {
        return true
    }

    // I would definitely outsource the calculation of holidays to a more official source, for example https://www.arbetsdag.se/api or similar.
    const isHoliday = holidays.isHoliday(date)
    if (isHoliday && isHoliday.length > 0) {
        return true
    }
}

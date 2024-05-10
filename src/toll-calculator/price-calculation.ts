export function calculateTotalFee(dates: Date[]): number {
    let totalFee = 0
    // calculate
    while (dates.length > 0) {
        const hourDates = [dates.shift() as Date] // safe to cast since we checked length
        while (
            dates.length > 0 &&
            dates[0].getTime() - hourDates[0].getTime() < 60 * 60 * 1000
        ) {
            hourDates.push(dates.shift() as Date)
        }
        totalFee += Math.max(...hourDates.map(getTimePrice))
        if (totalFee >= 60) return 60
    }
    return totalFee
}

export function getTimePrice(date: Date): number {
    const hour = date.getHours()
    const minute = date.getMinutes()
    if (hour === 6) {
        if (minute <= 29) return 8
        return 13
    }
    if (hour === 7) {
        return 18
    }
    if (hour === 8 && minute <= 29) {
        return 13
    }
    if (hour >= 8 && hour <= 14) {
        // Assuming that all hours between 8:30 and 15 are 8 and existing implementation was faulty
        return 8
    }
    if (hour === 15) {
        if (minute <= 29) return 13
        return 18
    }
    if (hour === 16) {
        return 13
    }
    if (hour === 17) {
        return 18
    }
    if (hour === 18) {
        if (minute <= 29) return 13
        return 8
    }
    return 0
}

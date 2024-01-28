
const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/

export function isISOString(isoDateString: string) {
    // Check if a string is in format YYYY-MM-DD
    return dateRegex.test(isoDateString)
}

export function ISOStringToDate(isoDateString: string) {
    // Convert a string in format YYYY-MM-DD to a Date object
    const dateArray = isoDateString.split('-')
    const year = dateArray[0]
    const month = dateArray[1]
    const day = dateArray[2]

    return new Date(Number(year), Number(month) - 1, Number(day))
}

export function ISODateToBrazilianDateString(isoDate: Date) {
    // Convert a string in format YYYY-MM-DD to a string in format DD/MM/YYYY
    return `${isoDate.getDate().toString().padStart(2, '0')}/${(isoDate.getMonth() + 1).toString().padStart(2, '0')}/${isoDate.getFullYear()}`
}

export function ISODateStringToBrazilianDateString(isoDateString: string) {
    // Convert a string in format YYYY-MM-DD to a string in format DD/MM/YYYY
    const isoDate = ISOStringToDate(isoDateString)
    return ISODateToBrazilianDateString(isoDate)
}

export function brazilianStringToDate(brazilianDateString: string) {
    // Convert a string in format DD/MM/YYYY to a Date object
    const dateArray = brazilianDateString.split('/')
    const day = dateArray[0]
    const month = dateArray[1]
    const year = dateArray[2]

    return new Date(Number(year), Number(month) - 1, Number(day))
}
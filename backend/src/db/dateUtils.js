
const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/

export function isISOString(isoDateString) {
    // Check if a string is in format YYYY-MM-DD
    return dateRegex.test(isoDateString)
}

export function ISOStringToDate(isoDateString) {
    // Convert a string in format YYYY-MM-DD to a Date object
    const dateArray = isoDateString.split('-')
    const year = dateArray[0]
    const month = dateArray[1]
    const day = dateArray[2]

    return new Date(year, month - 1, day)
}

export function ISODateToBrazilianDateString(isoDate) {
    // Convert a string in format YYYY-MM-DD to a string in format DD/MM/YYYY
    return `${isoDate.getDate()}/${isoDate.getMonth() + 1}/${isoDate.getFullYear()}`
}

export function ISODateStringToBrazilianDateString(isoDateString) {
    // Convert a string in format YYYY-MM-DD to a string in format DD/MM/YYYY
    const isoDate = ISOStringToDate(isoDateString)
    return ISODateToBrazilianDateString(isoDate)
}

export function brazilianStringToDate(brazilianDateString) {
    // Convert a string in format DD/MM/YYYY to a Date object
    const dateArray = brazilianDateString.split('/')
    const day = dateArray[0]
    const month = dateArray[1]
    const year = dateArray[2]

    return new Date(year, month - 1, day)
}
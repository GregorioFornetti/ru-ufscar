
const weekdays = [
    {
        name: 'domingo',
        abbreviation: 'dom'
    },
    {
        name: 'segunda-feira',
        abbreviation: 'seg'
    },
    {
        name: 'terça-feira',
        abbreviation: 'ter'
    },
    {
        name: 'quarta-feira',
        abbreviation: 'qua'
    },
    {
        name: 'quinta-feira',
        abbreviation: 'qui'
    },
    {
        name: 'sexta-feira',
        abbreviation: 'sex'
    },
    {
        name: 'sábado',
        abbreviation: 'sáb'
    },
]

function findSchedulesStart($) {
    return $('strong').filter((i, elem) => {
        return $(elem).text().toLowerCase() === 'dias e horários de funcionamento'
    }).parent()
}


function findCampusStartElement($, campusName) {
    let currentElement = findSchedulesStart($).next()
    while (currentElement.next().length > 0) {
        if (currentElement.text().toLowerCase().includes(campusName)) {
            return currentElement
        }
        currentElement = $(currentElement).next()
    }
}

function findWeekdayStartElement($, campusStartElement, weekdayName) {
    let currentElement = $(campusStartElement).next()
    while (currentElement.next().length > 0) {
        const match = RegExp('(.*) à (.*)').match(currentElement.text().toLowerCase())
        if (match) {
            const startWeekday = match[1]
            const endWeekday = match[2]
            let started = false
            for (let weekday of weekdays) {
                if (weekday.name === startWeekday) {
                    started = true
                }
                if (started && weekday.name === weekdayName) {
                    return currentElement
                }
                if (weekday.name === endWeekday) {
                    break
                }
            }
        }

        if (currentElement.text().toLowerCase().includes(weekdayName)) {
            return currentElement
        }
        
        currentElement = $(currentElement).next()
    }
}

function createSingleWeekdayScheduleJSON($, singleWeekdayStartElement) {
    const weekdayScheduleJSON = {}
    const weekdayScheduleItensDict = {
        lunch: 'almoço',
        dinner: 'jantar'
    }

    let currentElement = $(singleWeekdayStartElement).next()

    while (currentElement.get(0).tagName !== 'hr' && currentElement.next().length > 0) {
        let found = false
        for (let weekdayScheduleKey in weekdayScheduleItensDict) {
            if ($(currentElement).text().toLowerCase().includes(weekdayScheduleItensDict[weekdayScheduleKey])) {
                const match = RegExp('(.*) às (.*)').match(currentElement.text().toLowerCase())
                if (match) {
                    weekdayScheduleJSON[weekdayScheduleKey] = {
                        start_time: match[1],
                        end_time: match[2]
                    }
                }

                found = true
            }
        }
        currentElement = $(currentElement).next()

        if (!found) {
            break
        }
    }

    return weekdayScheduleJSON
}

function createSingleCampusScheduleJSON($, singleCampusStartElement) {
    const campusScheduleJSON = {}
    let currentElement = $(singleCampusStartElement).next()

    for (let weekday of weekdays) {
    }

    return campusScheduleJSON
}
import { ruInfoUrl } from "./RU.js"

export const campi = [
    {
        name: "São Carlos",
        queryName: "sao-carlos"
    },
    {
        name: "Sorocaba",
        queryName: "sorocaba"
    },
    {
        name: "Araras",
        queryName: "araras"
    },
    {
        name: "Lagoa do Sino",
        queryName: "lagoa-do-sino"
    }
]

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
        if (currentElement.text().toLowerCase().includes(campusName.toLowerCase())) {
            return currentElement
        }
        currentElement = $(currentElement).next()
    }
}

function findWeekdayStartElement($, campusStartElement, weekdayName) {
    let currentElement = $(campusStartElement).next()
    const weekdayRegex = new RegExp('(.*) à (.*)')

    while (currentElement.next().length > 0) {
        const match = $(currentElement).text().toLowerCase().match(weekdayRegex)
        if (match) {
            let startWeekday = match[1]
            if (!startWeekday.includes('-feira')) {
                startWeekday += '-feira'
            }
            let endWeekday = match[2]
            if (!endWeekday.includes('-feira')) {
                endWeekday += '-feira'
            }
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
    const weekdayScheduleJSON = { lunch: null, dinner: null }
    const weekdayScheduleItensDict = {
        lunch: 'almoço',
        dinner: 'jantar'
    }
    const openTimeRegex = /(\d?\d:\d?\d) às (\d?\d:\d?\d)/

    let currentElement = $(singleWeekdayStartElement).next()

    while (currentElement.get(0).tagName !== 'hr' && currentElement.next().length > 0) {
        let found = false
        for (let weekdayScheduleKey in weekdayScheduleItensDict) {
            if ($(currentElement).text().toLowerCase().includes(weekdayScheduleItensDict[weekdayScheduleKey])) {
                const match = openTimeRegex.exec($(currentElement).text().toLowerCase())
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

function creatSingleDayScheduleJSON($, singleCampusStartElement, dayName) {
    const weekdayStartElement = findWeekdayStartElement($, singleCampusStartElement, dayName)
    if (weekdayStartElement) {
        return createSingleWeekdayScheduleJSON($, weekdayStartElement)
    } else {
        return {lunch: null, dinner: null}
    }
}

function createSingleCampusWeekdayScheduleList($, singleCampusStartElement) {
    const campusSchedule = []

    for (let weekday of weekdays) {
        campusSchedule.push({
            name: weekday.name,
            abbreviation: weekday.abbreviation,
            schedule: creatSingleDayScheduleJSON($, singleCampusStartElement, weekday.name)
        })
    }

    return campusSchedule
}


export default function getSchedulesJSON($) {
    const currentDate = new Date()
    const fullScheduleJSON = {
        last_update: {
            date: `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`,
            time: `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`
        },
        info_from: ruInfoUrl,
        info_type: 'automatic',
        campi_schedules: []
    }

    for (let campus of campi) {
        const campusStartElement = findCampusStartElement($, campus.name)
        if (campusStartElement) {
            fullScheduleJSON.campi_schedules.push({
                name: campus.name,
                query_name: campus.queryName,
                weekdays_schedules: createSingleCampusWeekdayScheduleList($, campusStartElement),
                holiday_schedule: creatSingleDayScheduleJSON($, campusStartElement, 'feriado'),
                optional_workday_schedule: creatSingleDayScheduleJSON($, campusStartElement, 'ponto facultativo') 
            })
        }
    }

    return fullScheduleJSON
}

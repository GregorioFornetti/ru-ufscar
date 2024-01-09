
import { ruInfoUrl } from "./RU.js"


function findWeekMenuStart($) {
    return $('strong').filter((i, elem) => {
        return $(elem).text().toLowerCase() === 'cardápio'
    }).parent()
}

function findWeekdayStartElement($, menuStartElement, weekdayName) {
    let currentElement = $(menuStartElement).next()
    while (currentElement.next().length > 0) {
        if (currentElement.text().toLowerCase().includes(weekdayName)) {
            return currentElement
        }
        currentElement = $(currentElement).next()
    }
}

function createSingleMenuJSON($, singleMenuStartElement) {
    const menuJSON = {}
    const menuItensDict = {
        main_dish_unrestricted: 'prato principal – sem restrição', 
        main_dish_vegetarian: 'prato principal – vegetariano',
        garnishes: 'guarnição',
        accompaniment: 'acompanhamentos',
        salad: 'salada',
        dessert: 'sobremesa'
    }
    let currentElement = $(singleMenuStartElement).next()

    while (currentElement.next().length > 0) {
        let found = false
        for (let itemKey in menuItensDict) {
            const menuItemRegex = new RegExp(`${menuItensDict[itemKey]}: (.*)`, 'i')
            const match = $(currentElement).text().match(menuItemRegex)
            if (match) {
                menuJSON[itemKey] = match[1][0].toUpperCase() + match[1].toLowerCase().slice(1)
                found = true
                break
            }
        }

        if (!found) {
            break
        }

        currentElement = $(currentElement).next()
    }
    return menuJSON
}



export default function getWeekMenu($) {
    const menuElement =  findWeekMenuStart($)
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
    const menuTypes = {
        lunch: 'almoço',
        dinner: 'jantar'
    }

    const currentDate = new Date()
    const weekMenuJSON = {
        last_update: {
            date: `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`,
            time: `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`
        },
        info_from: ruInfoUrl,
        info_type: 'automatic',
        menus_inteval: null,
        menus: []
    }

    for (let weekday of weekdays) {
        const weekdayName = weekday.name
        const currentDayMenu = {
            weekday_name: weekdayName,
            weekday_abbreviation: weekday.abbreviation,
            date: null, 
            lunch: null,
            dinner: null
        }
        const weekdayStartElement = findWeekdayStartElement($, menuElement, weekdayName)
        if (!weekdayStartElement) {
            weekMenuJSON['menus'].push(currentDayMenu)
            continue
        }
        currentDayMenu['date'] = $(weekdayStartElement).text().match(/\d{2}\/\d{2}/)[0]

        let currentElement = $(weekdayStartElement)
        while (currentElement.get(0).tagName !== 'hr' && currentElement.next().length > 0) {
            for (let menuKey in menuTypes) {
                if ($(currentElement).text().toLowerCase().includes(menuTypes[menuKey])) {
                    currentDayMenu[menuKey] = createSingleMenuJSON($, currentElement)
                }
            }
            currentElement = $(currentElement).next()
        }

        weekMenuJSON['menus'].push(currentDayMenu)
    }

    // Nem todos os dias possuem um cardápio, e ficam sem data, vamos preencher utilizando as datas posteriores/anteriores
    for (let i = 0; i < weekMenuJSON['menus'].length; i++) {
        if (!weekMenuJSON['menus'][i]['date']) {
            let j = i + 1
            while (j != i) {
                if (j >= weekMenuJSON['menus'].length) {
                    j = 0
                }
                if (weekMenuJSON['menus'][j]['date']) {
                    const date = new Date()
                    date.setMonth(parseInt(weekMenuJSON['menus'][j]['date'].split('/')[1]) - 1)
                    if (i < j) {
                        date.setDate(parseInt(weekMenuJSON['menus'][j]['date'].split('/')[0]) - (j - i))
                    } else {
                        date.setDate(parseInt(weekMenuJSON['menus'][j]['date'].split('/')[0]) + (i - j))
                    }
                    weekMenuJSON['menus'][i]['date'] = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`
                    break
                }
                j++
            }
        }
    }

    weekMenuJSON['menus_inteval'] = {
        start_date: weekMenuJSON['menus'][0]['date'],
        end_date: weekMenuJSON['menus'][weekMenuJSON['menus'].length - 1]['date']
    }

    return weekMenuJSON
}
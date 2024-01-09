import axios from 'axios'

const ruInfoUrl = 'https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario'


async function getRuInfo() {
    return axios.get(ruInfoUrl)
    .then((response) => {
        return response.data
    })
}

// console.log(await getRuInfo())



import * as cheerio from 'cheerio';

const ruHtml = await getRuInfo()
const $ = cheerio.load(ruHtml)

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
                menuJSON[itemKey] = match[1]
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

function createWeekMenuJSON($) {
    const menuElement =  findWeekMenuStart($)
    const weekdaysNames = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
    const menusTypes = ['almoço', 'jantar']
    const weekMenuJSON = {
        'menus': []
    }

    for (let weekdayName of weekdaysNames) {
        const currentDayMenu = {}
        const weekdayStartElement = findWeekdayStartElement($, menuElement, weekdayName)
        if (!weekdayStartElement) {
            console.log(`Não foi encontrado o elemento do dia ${weekdayName}`)
            continue
        }

        let currentElement = $(weekdayStartElement)
        while (currentElement.get(0).tagName !== 'hr' && currentElement.next().length > 0) {
            console.log($(currentElement).text())
            for (let menuType of menusTypes) {
                if ($(currentElement).text().toLowerCase().includes(menuType)) {
                    currentDayMenu[menuType] = createSingleMenuJSON($, currentElement)
                }
            }
            currentElement = $(currentElement).next()
        }

        weekMenuJSON['menus'].push(currentDayMenu)
    }

    return weekMenuJSON
}


console.log(JSON.stringify(createWeekMenuJSON($), null, 4))
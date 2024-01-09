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

function findMenuStartElement($) {
    return $('strong').filter((i, elem) => {
        return $(elem).text().toLowerCase() === 'cardápio'
    }).parent()
}

const menuElement =  findMenuStartElement($)
console.log($(menuElement).text())

function findWeekdayStartElement($, menuStartElement, weekdayName) {
    let currentElement = $(menuStartElement).next()
    while (currentElement.next().length > 0) {
        if (currentElement.text().toLowerCase().includes(weekdayName)) {
            return currentElement
        }
        currentElement = $(currentElement).next()
    }
}

const weekdaysNames = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
for (let weekdayName of weekdaysNames) {
    const weekdayStartElement = findWeekdayStartElement($, menuElement, weekdayName)
    if (!weekdayStartElement) {
        console.log(`Não foi encontrado o elemento do dia ${weekdayName}`)
        continue
    }
    console.log(weekdayStartElement.text())
}
import { ruInfoUrl } from "./RU.js"

function findPricesStart($) {
    return $('b').filter((i, elem) => {
        return $(elem).text().toLowerCase() === 'valor das refeições por categoria'
    }).parent()
}

function createPricesJSON($, pricesStartElement) {
    const prices = []
    const priceRegex = /(.*) – (r\$ )?(gratuito|\d+,\d+)( \((.*)\))?/

    let pricesTexts = $(pricesStartElement).next().text().toLowerCase().split('\n')

    for (let priceText of pricesTexts) {
        const match = priceText.match(priceRegex)
        if (!match) {
            continue
        }
        
        const category = match[1]
        const price = match[3]
        const numberInFull = match[5]
        if (price === 'gratuito') {
            prices.push({
                category: category,
                price: 0,
                number_in_full: 'zero'
            })
        } else {
            prices.push({
                category: category,
                price: parseFloat(price.replace(',', '.')),
                number_in_full: numberInFull
            })
        }
    }

    return prices
}

export default function getPricesJSON($) {
    const currentDate = new Date()
    return {
        last_update: {
            date: `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`,
            time: `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`
        },
        info_from: ruInfoUrl,
        info_type: 'automatic',
        prices: createPricesJSON($, findPricesStart($))
    }
}
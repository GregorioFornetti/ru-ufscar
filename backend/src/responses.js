
import { getRuInfo } from "./webscrapping/RU.js";
import getWeekMenu from "./webscrapping/weekMenu.js";

import * as cheerio from 'cheerio';


export default class Responses {
    constructor() {
        this.weekMenuJSON = {}
    }

    async updateAll() {
        const ruHtml = await getRuInfo()
        const $ = cheerio.load(ruHtml)

        this.weekMenuJSON = getWeekMenu($)
    }
}

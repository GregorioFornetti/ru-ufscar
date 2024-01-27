
import { getRuInfo } from "./RU.js";
import getWeekMenu from "./weekMenu.js";
import getSchedules from "./schedules.js";
import getPrices from "./prices.js";

import * as cheerio from 'cheerio';


export default class Responses {
    constructor() {
        this.weekMenuJSON = {}
        this.schedulesJSON = {}
        this.pricesJSON = {}
    }

    async updateAll() {
        const ruHtml = await getRuInfo()
        const $ = cheerio.load(ruHtml)

        this.weekMenuJSON = getWeekMenu($)
        this.schedulesJSON = getSchedules($)
        this.pricesJSON = getPrices($)
    }

    getWeekMenu() {
        return this.weekMenuJSON
    }

    getSchedules(campusParam) {
        if (!campusParam) {
            return this.schedulesJSON
        } else {
            for (let campusInfo of this.schedulesJSON.campi_schedules) {
                if (campusParam === campusInfo.query_name) {
                    const response = {
                        ...this.schedulesJSON,
                        campus_schedules: campusInfo
                    }
                    delete response.campi_schedules
                    return response
                }
            }

            return null
        }
    }

    getPrices() {
        return this.pricesJSON
    }
}

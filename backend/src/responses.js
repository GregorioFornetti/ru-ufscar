
import { getRuInfo } from "./webscrapping/RU.js";
import getWeekMenu from "./webscrapping/weekMenu.js";
import getSchedules, { campi } from "./webscrapping/schedules.js";

import * as cheerio from 'cheerio';


export default class Responses {
    constructor() {
        this.weekMenuJSON = {}
        this.schedulesJSON = {}
    }

    async updateAll() {
        const ruHtml = await getRuInfo()
        const $ = cheerio.load(ruHtml)

        this.weekMenuJSON = getWeekMenu($)
        this.schedulesJSON = getSchedules($)
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
}


import Responses from "./responses.js";
import { Router } from "express";
import { apiPath } from './configs/index.js'

// Atualiza o conteúdo do menu de tempos em tempos, enquanto estiver executando
const updateIntervalInHours = 1
const responses = new Responses()
await responses.updateAll()
setInterval(() => {
    responses.updateAll()
}, updateIntervalInHours * 60 * 60 * 1000)


const router = Router()


router.get(`${apiPath}/week-menu`, (req, res) => {
    res.json(responses.getWeekMenu())
})

router.get(`${apiPath}/schedules`, (req, res) => {
    const schedulesJSON = responses.getSchedules(req.query.campus)
    if (schedulesJSON) {
        res.json(schedulesJSON)
    } else {
        res.status(404).send('Campus não encontrado')
    }
})

router.get(`${apiPath}/prices`, (req, res) => {
    res.json(responses.getPrices())
})


export default router
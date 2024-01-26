
import Responses from "./responses.js";
import express from "express";
import cors from 'cors'
import { port, publicPath, adminPath, apiPath } from './configs/index.js'

const updateIntervalInHours = 1


// Atualiza o conteúdo do menu de tempos em tempos, enquanto estiver executando
const responses = new Responses()
await responses.updateAll()
setInterval(() => {
    responses.updateAll()
}, updateIntervalInHours * 60 * 60 * 1000)

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use(
        express.json()
    )
} else {
    app.use(
        express.json(),
        cors()
    )
}

const frontendPath = '../frontend'
const frontendPublicPath = `${frontendPath}/public/dist`
const frontendAdminPath = `${frontendPath}/admin/dist`

app.use(publicPath, express.static(frontendPublicPath))
app.use(adminPath, express.static(frontendAdminPath))

app.get(`${apiPath}/week-menu`, (req, res) => {
    res.json(responses.getWeekMenu())
})

app.get(`${apiPath}/schedules`, (req, res) => {
    const schedulesJSON = responses.getSchedules(req.query.campus)
    if (schedulesJSON) {
        res.json(schedulesJSON)
    } else {
        res.status(404).send('Campus não encontrado')
    }
})

app.get(`${apiPath}/prices`, (req, res) => {
    res.json(responses.getPrices())
})

app.listen(port, () => {
    console.log(`RU app listening at port ${port}`)
})
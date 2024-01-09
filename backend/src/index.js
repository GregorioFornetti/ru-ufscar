
import Responses from "./responses.js";
import express from "express";

const updateIntervalInHours = 1


// Atualiza o conteúdo do menu de tempos em tempos, enquanto estiver executando
const responses = new Responses()
await responses.updateAll()
setInterval(() => {
    responses.updateAll()
}, updateIntervalInHours * 60 * 60 * 1000)



const app = express()
const port = 3000

app.get('/week-menu', (req, res) => {
    res.json(responses.weekMenuJSON)
})

app.listen(port, () => {
    console.log(`RU app listening at port ${port}`)
})
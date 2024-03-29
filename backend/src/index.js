

import express from "express";
import session from 'express-session'
import cors from 'cors'
import { port, publicPath, adminPath} from './configs/index.js'
import RuRouter from './webscrapping/RuRouter.js'
import ResiduesRouter from './db/ResiduesRoutes.js'
import AuthenticationRouter from './db/AutenthicationRoutes.js'
import redirectIfNoAuth from './db/redirect.js'

const app = express()

app.use(session({  // Muito oq melhorar aqui, em relação a segurança...
    secret: 'segredo123',
    resave: false,
    saveUninitialized: true
}))

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

app.use(RuRouter)
app.use(ResiduesRouter)
app.use(AuthenticationRouter)

app.use(publicPath, express.static(frontendPublicPath))
app.use(redirectIfNoAuth)
app.use(adminPath, express.static(frontendAdminPath))


app.listen(port, () => {
    console.log(`RU app listening at port ${port}`)
})

import { password } from "../configs/index.js";
import { adminPath } from "../configs/index.js";

export default function redirectIfNotAuth(req, res, next) {
    if (req.originalUrl !== `${adminPath}/` || req.session.password === password) {
        next()
    } else {
        res.redirect(`${adminPath}/auth.html`)
    }
}